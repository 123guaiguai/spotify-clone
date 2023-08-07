import { searchByName } from '@/request/api/song'
import useSongInfo from '@/store/useSongInfo'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import FeaturedPlayList from './FeaturedPlayList'
import SearchResults from './SearchResults'


export default function Search({setGlobalPlaylistId,setView,view,setWyySongId,setGlobalIsTrackPlaying}:any) {
    const { data: session } = useSession()
    const [searchData, setSearchData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const {userInfo}=useSongInfo()

    function handleChange(e) {
        setInputValue(e.target.value)
    }
    async function fetchSongs(){
        if(!inputValue){
            return setSearchData(null)
        }
        const {result}=await searchByName(inputValue)
        result&&setSearchData(result.songs)
    } 

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // 在这里执行网络请求逻辑
            // 例如，调用获取歌曲资源的函数 fetchSongs()
            fetchSongs();
        }, 1000); // 在用户输入停止 1 秒后执行网络请求

        return () => clearTimeout(delayDebounceFn);
    }, [inputValue])

    return (
        <div className='flex-grow h-screen'>
            <header className='text-white sticky top-0 h-20 z-10 text-4xl flex items-center px-8'>
                <MagnifyingGlassIcon className='absolute top-7 left-10 h-6 w-6 text-neutral-800' />
                <input ref={inputRef} value={inputValue} onChange={handleChange} type="text" className=' rounded-full bg-white w-96 pl-12 text-neutral-900 text-base py-2 font-normal outline-0' />
            </header>
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={userInfo?.profile.avatarUrl} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
            <div>
                {searchData===null?<FeaturedPlayList setGlobalPlaylistId={setGlobalPlaylistId} setView={setView}/>:<SearchResults inputValue={inputValue} setGlobalIsTrackPlaying={setGlobalIsTrackPlaying} setWyySongId={setWyySongId} searchData={searchData} view={view} />}
            </div>
        </div>
    )
}
