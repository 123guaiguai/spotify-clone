import useSongInfo from '@/store/useSongInfo'
import { PlayIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

export default function SearchPlayList({ searchData }: any) {
    const [playList, setPlayList] = useState([])
    const { setView, setAlbumId,setPlayTracks } = useSongInfo()

    function handle(album){
        setPlayTracks(album)
        setAlbumId(album?.id)
        setView('playlist')
    }

    return (
        <div className='flex flex-wrap gap-4 px-8 pb-28'>
            {searchData && searchData.albums.slice(0, 4).map((album) => {
                return <div onClick={() => { handle(album) }} key={album?.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                    <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                        <PlayIcon className='h-6 w-6 text-black' />
                    </div>
                    <img className='w-48 h-48 mb-4 rounded-full' src={album?.blurPicUrl} />
                    <p className='text-base text-white mb-1 w-48 truncate'>{album?.name}</p>
                    <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>Album</p>
                </div>
            })}
        </div>
    )
}