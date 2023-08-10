import { checkSongValid, getSongDetail, getSongUrl } from '@/request/api/song'
import { PauseCircleIcon } from '@heroicons/react/24/outline'
import { ArrowPathRoundedSquareIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { HeartIcon, BackwardIcon, ForwardIcon ,DocumentChartBarIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import useSongInfo from '@/store/useSongInfo'
import usePlayInfo from '@/store/usePlayInfo'

function Player({ wyySongId, globalCurrentSongId, setGlobalCurrentSongId,audio }: any) {
    const { data: session } = useSession();
    const [songInfo, setSongInfo] = useState(null)
    const [audioSrc, setAudioSrc] = useState("")//audoio播放的音频的url
    const [currentProcess, setCurrentProcess] = useState(0)//记录当前播放秒数占总时长的百分比（如80.23-->代表80.23%）
    const { songId, isTrackPlaying, setIsTrackPlaying, playIndex, playTracks, setPlayIndex, setSongId,setSongName } = useSongInfo()
    const {repeatPlay,setRepeatPlay,showLyric,setShowLyric,setLyricIndex,lyricStamps}=usePlayInfo()

    async function fetchSongInfo(trackId) {
        if (trackId) {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            })
            const data = await response.json()
            setSongInfo(data)
        }
    }

    async function getCurrentlyPlaying() {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        if (response.status == 204) {
            console.log("204 response from currently playing")
            return
        }
        const data = await response.json()
        return data
    }

    async function handleAudioPlay() {//控制音乐播放器行为
        if (isTrackPlaying) {//音乐正在播放，此时需要暂停音乐
            setIsTrackPlaying(false)
            audio.current.pause()
        } else {
            setIsTrackPlaying(true)
            audio.current.play()
        }
    }

    async function getAudioUrl(id: any) {
        if (!id) {
            return
        }
        const { data } = await getSongUrl(id)
        if (!data[0]?.url) {
            setAudioSrc(`https://music.163.com/song/media/outer/url?id=${wyySongId}.mp3`)
        }
        else {
            setAudioSrc(data[0].url)
        }
    }

    const handleTimeUpdate = () => {
        const audioElement = audio.current
        const currentTime = audioElement?.currentTime;
        const duration = audioElement?.duration;

        const activeIndex=lyricStamps.findLastIndex((item:number)=>{
            return audio.current?.currentTime*1000>item
        })
        setLyricIndex(activeIndex)

        // 计算进度
        if (currentTime === duration) {
            setCurrentProcess(0)
        } else {
            setCurrentProcess((currentTime / duration) * 100)
        }
    }

    function playNextSong() {
        if (playTracks.length) {
            const nextIndex = (playIndex + 1) >= playTracks.length ? 0 : playIndex + 1
            setPlayIndex(nextIndex)
            setSongId(playTracks[nextIndex].id)
            setSongName(playTracks[nextIndex].name)
        }
    }
    function playPreviousSong() {
        if (playTracks) {
            const previousIndex = playIndex<= 0 ? playTracks.length - 1 : playIndex - 1
            setPlayIndex(previousIndex)
            console.log('tracks',playTracks)
            setSongId(playTracks[previousIndex].id)
            setSongName(playTracks[previousIndex].name)
        }
    }
    function playEnded(){
        setIsTrackPlaying(false)
        if(!repeatPlay){
            playNextSong()
        }else{
            audio.current.play()
            setIsTrackPlaying(true)
        }
    }

    useEffect(() => {
        // fetch song details and play song
        async function f() {
            if (session && session.accessToken) {
                if (!globalCurrentSongId) {
                    // get the currently playing song from spotify
                    const data = await getCurrentlyPlaying()
                    setGlobalCurrentSongId(data?.item?.id)
                    if (data.is_playing) {
                        setGlobalIsTrackPlaying(true)
                    }
                    await fetchSongInfo(data?.item?.id)
                } else {
                    // get song info
                    await fetchSongInfo(globalCurrentSongId)
                }
            }
        }

        if (globalCurrentSongId && wyySongId) {
            f()
            getAudioUrl(wyySongId)
        }

    }, [globalCurrentSongId])

    useEffect(() => {
        async function f() {
            const { songs } = await getSongDetail(wyySongId)
            setSongInfo({
                name: songs[0].name,
                artist: songs[0].ar[0].name,
                picUrl: songs[0].al.picUrl,
                dt: songs[0].dt,//歌曲的时长
            })
        }
        if (wyySongId) {
            f()
            getAudioUrl(wyySongId)
        }
    }, [wyySongId])

    useEffect(() => {
        async function f() {
            const { songs } = await getSongDetail(songId)
            setSongInfo({
                name: songs[0].name,
                artist: songs[0].ar[0].name,
                picUrl: songs[0].al.picUrl,
                dt: songs[0].dt,//歌曲的时长
            })
        }
        if (songId) {
            f()
            getAudioUrl(songId)
            setIsTrackPlaying(true)
        }
    }, [songId])

    useEffect(()=>{},[])

    return (
        <div className='h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            <div className='flex items-center space-x-4'>
                {songInfo && <img className='hidden md:inline h-10 w-10' src={songInfo.picUrl || songInfo.album.images[0].url} />}
                <div className=' cursor-default'>
                    <p className='text-white text-sm'>{songInfo?.name}</p>
                    <p className='text-neutral-400 text-xs hover:underline'>{songInfo?.artist || songInfo?.artists[0]?.name}</p>
                </div>
                {songInfo && <HeartIcon className='w-6 h-6 cursor-pointer' />}
            </div>
            <div className='flex flex-col items-center space-y-2 justify-around pt-2 pb-5'>
                <div className='flex items-center justify-center space-x-4 cursor-pointer'>
                    <ArrowPathRoundedSquareIcon className={`h-6 w-6 opacity-50 ${repeatPlay?'text-green-400 opacity-100':null}`} onClick={()=>{setRepeatPlay(!repeatPlay)}} />
                    <BackwardIcon className='h-6 w-6 opacity-50' onClick={playPreviousSong} />
                    {isTrackPlaying ? <PauseCircleIcon onClick={handleAudioPlay} className='h-10 w-10' /> : <PlayCircleIcon onClick={handleAudioPlay} className='h-10 w-10' />}
                    <ForwardIcon className='h-6 w-6 opacity-50' onClick={playNextSong} />
                    <DocumentChartBarIcon className={`h-6 w-6 opacity-50 ${showLyric?'text-green-400 opacity-100':null}`} onClick={()=>{setShowLyric(!showLyric)}} />
                </div>
                <Range currentProcess={currentProcess} songInfo={songInfo} audio={audio} isTrackPlaying={isTrackPlaying} />
            </div>
            <div></div>
            <audio ref={audio} onTimeUpdate={handleTimeUpdate} onEnded={playEnded} autoPlay src={audioSrc} ></audio>
        </div>
    )
}
export default Player
const Range = ({ songInfo, audio, isTrackPlaying, currentProcess }: any) => {//进度条
    const [sliderBarOffset, setSliderBarOffset] = useState(0)
    const [isMoving, setIsMoving] = useState(false)
    const [process, setProcess] = useState('0')
    const [startTime, setStartTime] = useState('0:00')
    const range = useRef()
    let globalPercent = 0

    function handleMouseDown(e: MouseEvent) {//鼠标按下时事件
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        // 鼠标点击时也要计算一下位置
        calcValue(e.clientX);
    }

    function handleMouseMove(e: MouseEvent) {//鼠标移动时事件
        setIsMoving(true)
        calcValue(e.clientX)
    }

    function handleMouseUp(e: MouseEvent) {//鼠标松开时事件
        audio.current.currentTime = (songInfo.dt * globalPercent) / 1000
        window.removeEventListener('mousemove', handleMouseMove);//解绑事件
        window.removeEventListener('mouseup', handleMouseUp);
        setIsMoving(false)
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000)
        var seconds = ((millis % 60000) / 1000).toFixed(0)
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

    const calcValue = (clientX: number) => {
        // 限制进度条的范围在 0 和 1 之间
        const percent = Math.max(
            0,
            Math.min(1, (clientX - sliderBarOffset.x) / sliderBarOffset.width)
        );
        globalPercent = Number(percent.toFixed(2))
        setProcess((percent * 100).toFixed(0))
        setStartTime(millisToMinutesAndSeconds(globalPercent * songInfo.dt))
    };

    useEffect(() => {
        setSliderBarOffset(range.current?.getBoundingClientRect())//获得进度条左边到边界的距离
    }, [])

    useEffect(() => {
        setProcess('0')
        setStartTime('0:00')
    }, [songInfo])

    useEffect(() => {
        if (!isMoving) {
            currentProcess && setProcess(currentProcess.toFixed(0))
            currentProcess && setStartTime(millisToMinutesAndSeconds((currentProcess / 100) * songInfo.dt))
        }
    }, [currentProcess])

    return (
        <div className='flex items-center space-x-3 text-neutral-400 text-sm select-none'>
            {songInfo && <span>{startTime}</span>}
            <div ref={range} className=' relative w-80 h-1 bg-neutral-700 rounded-full group'>
                <div className={`top-0 h-full bg-white rounded-full group-hover:bg-green-300`} style={{ width: `${process}%` }}></div>
                <div style={{ left: `${process}%` }} className={`w-3 h-3 hidden group-hover:inline-block group-active:inline-block absolute bg-white -pt-4 cursor-pointer rounded-full`} onMouseDown={handleMouseDown}></div>
            </div>
            {songInfo && <span>{millisToMinutesAndSeconds(songInfo.dt)}</span>}
        </div>
    )
}




