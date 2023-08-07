import useSongInfo from '@/store/useSongInfo'
import { PlayIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

export default function SearchArtist({searchData}:any) {
    const [relatedArtists, setRelatedArtists] = useState([])
    const {setArtistId,setView}=useSongInfo()

    return (
        <div className='flex flex-wrap gap-4 px-8 pb-28'>
            {searchData && searchData.artists.slice(0, 4).map((artist) => {
                return <div onClick={() => {setArtistId(artist?.id);setView('artist')}} key={artist?.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                    <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                        <PlayIcon className='h-6 w-6 text-black' />
                    </div>
                    <img className='w-48 h-48 mb-4 rounded-full' src={artist?.picUrl} />
                    <p className='text-base text-white mb-1 w-48 truncate'>{artist?.name}</p>
                    <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>Artist</p>
                </div>
            })}
        </div>
    )
}
