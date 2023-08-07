import React, { useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react';
import { searchByName } from '@/request/api/song';
import useSongInfo from '@/store/useSongInfo';


export default function Song({ view, sno, track }: any) {

    const [hover, setHover] = useState(false)
    const { data: session } = useSession()
    const { setIsTrackPlaying,setSongId } = useSongInfo()

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000)
        var seconds = ((millis % 60000) / 1000).toFixed(0)
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

    async function playSong(track: any) {
        setIsTrackPlaying(true)
        setSongId(track.id)
    }

    return (
        <div
            onClick={() => playSong(track)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default'>
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
                <p>{millisToMinutesAndSeconds(track.duration_ms || track.dt)}</p>
            </div>
        </div>
    )
}
