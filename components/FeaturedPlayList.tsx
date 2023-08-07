import { getDayPlayList, getDayRecommendPlayList } from '@/request/api/song'
import { PlayIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import useSongInfo from '@/store/useSongInfo'

export default function FeaturedPlayList() {
    const { data: session } = useSession()
    const [playlistsDaily, setPlaylistsDaily] = useState([])//精选歌单
    const [playlistsRecommend, setPlaylistsRecommend] = useState([])//每日推荐歌单
    const [playlistsShow, setPlaylistsShow] = useState([])
    const togglePosition=[
        '-translate-x-4',
        'translate-x-4'
    ]
    const [toggleIndex, setToggleIndex] = useState(0)

    const {setView,setPlayListId}=useSongInfo()

    function toggleData(): void {
        if(toggleIndex===0){
            setToggleIndex(1)
        }else{
            setToggleIndex(0)
        }
    }

    function selectPlaylist(playlist) {
        setView("playlist")
        setPlayListId(playlist.id)
    }

    useEffect(()=>{
        async function f(){
            const {result}=await getDayPlayList()
            setPlaylistsDaily(result)
            setPlaylistsShow(result)
            const {recommend}=await getDayRecommendPlayList()
            setPlaylistsRecommend(recommend)
        }
        f()
    },[])

    useEffect(()=>{
        if(toggleIndex===1){
            setPlaylistsShow(playlistsRecommend)
        }else{
            setPlaylistsShow(playlistsDaily)
        }
    },[toggleIndex])


    return (
        <div className='flex flex-col gap-4 px-8 h-screen overflow-y-auto'>
            <div className='flex items-center justify-between text-white mb-5'>
                <h2 className='text-xl font-bold'>Featured Playlists</h2>
                <div className='flex items-center space-x-2 text-white text-base'>
                    <span className=' text-sm'>精选歌单</span>
                    <div className='bg-neutral-500 rounded-full py-1 px-6 cursor-pointer' onClick={()=>toggleData()}>
                        <div className={`bg-green-500 rounded-full w-5 h-5 border-2 border-slate-300 ${togglePosition[toggleIndex]} transition-all ease-in-out`}></div>
                    </div>
                    <span className='text-sm'>每日推荐</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-6 mb-48'>
                {playlistsShow && playlistsShow.map((playlist) => {
                    return <div onClick={()=>selectPlaylist(playlist)} key={playlist.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                        <div className='absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                            <PlayIcon className='h-6 w-6 text-black' />
                        </div>
                        <img className='w-48 h-48 mb-4' src={playlist.picUrl} />
                        <p className='text-base text-white mb-1 w-48 truncate'>{playlist.name}</p>
                        <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>播放数:{playlist.playCount||playlist.playcount}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
