import React, { useEffect, useRef, useState } from 'react'
import { EllipsisHorizontalIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PlayIcon } from '@heroicons/react/24/solid'
import useSongInfo from '@/store/useSongInfo';
import usePlayInfo from '@/store/usePlayInfo';

export default function Song({ view, sno, track }: any) {

    const [hover, setHover] = useState(false)
    const [isShowConsole, setIsShowConsole] = useState(false)
    const [isShowBottom, setIsShowBottom] = useState(true)
    const { setIsTrackPlaying, setSongId, setPlayIndex, setSongName,songNo,setSongNo } = useSongInfo()

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000)
        var seconds = ((millis % 60000) / 1000).toFixed(0)
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

    async function playSong(track: any, sno: number) {
        setIsTrackPlaying(true)
        setSongId(track.id)
        setPlayIndex(sno)
        setSongName(track.name)
    }

    function showConsole(e) {
        e.stopPropagation()
        setSongNo(sno)
        const windowHeight = window.innerHeight;
        const distanceToBottom = windowHeight - e.clientY;
        if (distanceToBottom < 406) {
            setIsShowBottom(false)
        } else {
            setIsShowBottom(true)
        }
        setIsShowConsole(!isShowConsole)
    }

    useEffect(()=>{
        if(songNo!=sno){//说明已经点击了另外一首歌，需要将上一首歌的选项卡收起
            setIsShowConsole(false)
        }
    },[songNo])

    return (
        <div
            onClick={() => playSong(track, sno)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className=' relative grid grid-cols-2 select-none text-neutral-400 text-sm py-4 px-5 group hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default'>
            <div className='flex items-center space-x-4'>
                {hover ? <PlayIcon className='w-5 h-5 text-white' /> : <p className='w-5'>{sno + 1}</p>}
                <img src={track.al.picUrl} className="w-10 h-10" alt="" />
                <div>
                    <p className='w-36 lg:w-64 truncate text-white text-base'>{track.name}</p>
                    <p>
                        {track.artists && track.artists.map((artist: any, i: number) => {
                            return (
                                <>
                                    <span className='hover:underline'>{artist.name}</span>
                                    <span>{i != track.artists.length - 1 ? ',' : null}</span>
                                </>
                            )
                        })}
                        {track.ar && track.ar.slice(0, 4).map((artist: any, i: number) => {
                            return (
                                <>
                                    <span className='hover:underline'>{artist.name} </span>
                                    <span>{track.ar.length > 4 && i === 3 ? '...' : ''}</span>
                                </>
                            )
                        })}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='w-40 truncate hidden md:inline'>{track.album ? track.album.name : track.al.name}</p>
                <div className='flex items-center space-x-3 relative'>
                    <EllipsisHorizontalIcon onClick={showConsole} className='w-6 h-6 text-white cursor-pointer group-hover:opacity-100 opacity-0' />
                    <p>{millisToMinutesAndSeconds(track.duration_ms || track.dt)}</p>
                </div>
            </div>
            {isShowConsole && <Console isShowBottom={isShowBottom} />}
        </div>
    )
}
const Console = ({ isShowBottom }: any) => {
    const [mouseMove, setMouseMove] = useState(false)
    const { userPlayList } = useSongInfo()
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const [searchPlayList, setSearchPlayList] = useState([])

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        setSearchPlayList(userPlayList.filter(item=>item.name.includes(inputValue)))
    }, [inputValue])

    useEffect(() => {
        userPlayList && setSearchPlayList(userPlayList)
    }, [])

    return (
        <div className={`absolute z-10 pxr-2`} style={isShowBottom ? { 'top': '58px' } : { 'bottom': '58px' }}>
            <div className='rounded-md bg-neutral-800 p-1 wpx-160 hpx-410 border border-neutral-700'>
                <p onMouseEnter={() => setMouseMove(true)} onMouseLeave={() => setMouseMove(false)} className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white flex items-center justify-between'>
                    <span>加入歌单</span>
                    <PaperAirplaneIcon className='w-4 h-4' />
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>收藏至已点赞的歌曲</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white border-b border-neutral-700'>
                    <span>加入播放队列</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>转至歌曲电台</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>转至艺人</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>转至专辑</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white border-b border-neutral-700'>
                    <span>显示提供者</span>
                </p>
                <p className='flex items-center justify-between w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white border-b border-neutral-700'>
                    <span>分享</span>
                    <PaperAirplaneIcon className='w-4 h-4' />
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>在桌面应用中打开</span>
                </p>
            </div>
            <div onMouseEnter={() => setMouseMove(true)} onMouseLeave={() => setMouseMove(false)} className={`absolute z-20 w-60 p-1 bg-neutral-800 rounded-md top-3 pr-98 shadow-md ${mouseMove? null : 'hidden'}`}>
                <p className='p-3 rounded-sm bg-neutral-700 text-sm text-white cursor-pointer border-b border-neutral-700 flex items-center space-x-2'>
                    <MagnifyingGlassIcon className='w-4 h-4' />
                    <input ref={inputRef} value={inputValue} onChange={handleChange} onClick={e => { e.stopPropagation() }} type="text" placeholder='查找歌单' className=' placeholder:text-white placeholder:text-opacity-50 flex-grow outline-0 bg-neutral-700' />
                </p>
                <p className='p-3 rounded-sm hover:bg-neutral-700 text-sm text-white cursor-pointer border-b border-neutral-700'>创建歌单</p>
                {searchPlayList && searchPlayList.map(item => {
                    return <p className='p-3 rounded-sm hover:bg-neutral-700 text-sm text-white cursor-pointer'>
                        {item.name}
                    </p>
                })}
            </div>
        </div>
    )
}
