import { ClockIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Song from './Song'

export default function SearchSongs({searchData,view,setWyySongId,setGlobalIsTrackPlaying}:any) {
    return (
        <div className='w-full'>
            <header className='px-12 grid grid-cols-2 bg-neutral-800 border-b border-neutral-700 py-2 text-neutral-300 text-sm'>
                <span className='whitespace-break-spaces'>#       标题</span>
                <div className='flex md:justify-between justify-end'>
                    <span className='hidden md:inline-block'>专辑</span>
                    <ClockIcon className='w-5 h-5 mr-6' />
                </div>
            </header>
            <div className='text-white px-8 flex flex-col space-y-1 pb-72 overflow-y-auto h-screen'>
                {searchData?.map((track, i) => {
                    return <Song view={view} key={track.id} sno={i} track={track}></Song>
                })}

            </div>
        </div>
    )
}
