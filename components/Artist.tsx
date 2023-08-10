import React, { useEffect, useState } from 'react';
import Song from './Song';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { PlayIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import { getArtistTopTracks, getRelatedArtist } from '@/request/api/song';
import useSongInfo from '@/store/useSongInfo';

export default function Artist() {
    const colors = [
        'from-indigo-500',
        'from-blue-500',
        'from-green-500',
        'from-red-500',
        'from-yellow-500',
        'from-pink-500',
        'from-purple-500'
    ]

    const { data: session } = useSession()
    const [color, setColor] = useState(colors[0])
    const [opacity, setOpacity] = useState(0)
    const [textOpacity, setTextOpacity] = useState(0)
    const [artistData, setArtistData] = useState(null)
    const [topTracks, setTopTracks] = useState([])
    const [relatedArtists, setRelatedArtists] = useState([])
    const { artistId, setArtistId,userInfo } = useSongInfo()



    function changeOpacity(scrollPos) {
        // scrollPos = 0 -> opacity = 0 
        // scrollPos = 300 -> opacity = 1, textOpacity = 0
        // scrollPos = 310 -> opacity = 1, textOpacity = 1
        const offset = 300
        const textOffset = 10
        if (scrollPos < offset) {
            const newOpacity = 1 - ((offset - scrollPos) / offset)
            setOpacity(newOpacity)
            setTextOpacity(0)
        } else {
            setOpacity(1)
            const delta = scrollPos - offset
            const newTextOpacity = 1 - ((textOffset - delta) / textOffset)
            setTextOpacity(newTextOpacity)
        }
    }
    async function getArtistData(id) {
        const data = await getArtistTopTracks(id)
        return data
    }

    async function getRelatedArtists(id) {
        const { artists } = await getRelatedArtist(id)
        return artists
    }

    useEffect(() => {
        async function f() {
            if (artistId) {
                const data = await getArtistData(artistId)
                const res = await getRelatedArtists(artistId)
                setArtistData(data.artist)
                setTopTracks(data.hotSongs)
                setRelatedArtists(res)
            }
        }
        f()
    }, [artistId])

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [artistId])

    return (
        <div className='flex-grow h-screen text-white'>
            <header style={{ opacity: opacity }} className='text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold'>
                <div style={{ opacity: textOpacity }} className='flex items-center'>
                    {artistData && <img className='h-8 w-8 mr-6' src={artistData.picUrl} />}
                    <p>{artistData?.name}</p>
                </div>
            </header>
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={userInfo?.profile.avatarUrl} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
            <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`}>
                    {artistData && <img className='h-44 w-44 rounded-full' src={artistData.picUrl} />}
                    <div>
                        <p className='text-sm font-bold'>Artist</p>
                        <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold'>{artistData?.name}</h1>
                    </div>
                </section>
                <div className='space-y-4'>
                    <h2 className='text-xl font-bold px-8'>Top tracks</h2>
                    <div className='text-white px-8 flex flex-col space-y-1 pb-6'>
                        {topTracks&&topTracks.slice(0, 10).map((track, i) => {
                            // song component
                            return <Song
                                key={track.id}
                                sno={i}
                                track={track}
                            />
                        })}
                    </div>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-bold px-8'>Related artists</h2>
                    <div className='flex flex-wrap gap-4 px-8 pb-28'>
                        {relatedArtists&&relatedArtists.slice(0, 4).map((artist) => {
                            return <div onClick={() => setArtistId(artist?.id)} key={artist?.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                                <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                                    <PlayIcon className='h-6 w-6 text-black' />
                                </div>
                                <img className='w-48 h-48 mb-4 rounded-full' src={artist?.picUrl} />
                                <p className='text-base text-white mb-1 w-48 truncate'>{artist?.name}</p>
                                <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>Artist</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
