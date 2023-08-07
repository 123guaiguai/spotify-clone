import { checkSongValid, getSongDetail, getSongUrl } from '@/request/api/song';
import { PauseCircleIcon } from '@heroicons/react/24/outline';
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import useSongInfo from '@/store/useSongInfo';
function Player({ wyySongId, globalCurrentSongs, globalCurrentSongId, setGlobalCurrentSongId }: any) {
    const { data: session } = useSession();
    const [songInfo, setSongInfo] = useState(null)
    const [audioSrc, setAudioSrc] = useState("")//audoio播放的音频的url
    const audio = useRef(null)
    const { songId, isTrackPlaying,setIsTrackPlaying } = useSongInfo()

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
                picUrl: songs[0].al.picUrl
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
                picUrl: songs[0].al.picUrl
            })
        }
        if (songId) {
            f()
            getAudioUrl(songId)
        }
    }, [songId])

    return (
        <div className='h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            <div className='flex items-center space-x-4'>
                {songInfo && <img className='hidden md:inline h-10 w-10' src={songInfo.picUrl || songInfo.album.images[0].url} />}
                <div className=' cursor-default'>
                    <p className='text-white text-sm'>{songInfo?.name}</p>
                    <p className='text-neutral-400 text-xs hover:underline'>{songInfo?.artist || songInfo?.artists[0]?.name}</p>
                </div>
            </div>
            <div className='flex items-center justify-center' onClick={handleAudioPlay}>
                {isTrackPlaying ? <PauseCircleIcon className='h-10 w-10' /> : <PlayCircleIcon className='h-10 w-10' />}
            </div>
            <div></div>
            <audio ref={audio} onEnded={() => { setIsTrackPlaying(false) }} autoPlay src={audioSrc} ></audio>
        </div>
    )
}
export default Player