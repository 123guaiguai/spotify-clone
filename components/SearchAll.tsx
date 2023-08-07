import { PlayIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import useSongInfo from '@/store/useSongInfo';
export default function SearchAll({ allData }: any) {
    const { setSongId, setPlayListId, setIsTrackPlaying, setView, setArtistId } = useSongInfo()

    function selectPlaylist(playList) {
        setPlayListId(playList.id)
        setView('playlist')
    }
    function playSong(song) {
        setSongId(song.id)
        setIsTrackPlaying(true)
    }
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }
    function selectArtist(artist) {
        setArtistId(artist.id)
        setView('artist')
    }


    return (
        <div className='flex flex-col gap-8 px-8 h-screen overflow-y-scroll text-white'>
            <div className='grid grid-cols-2'>
                <div className='space-y-4'>
                    <h2 className='text-xl font-extrabold'>热门结果</h2>
                    <div className='h-64 pr-8'>
                        <div onClick={() => selectPlaylist(allData.playList.playLists[0])} className='cursor-pointer relative group h-64 w-full bg-neutral-800 hover:bg-neutral-700 p-4 flex flex-col gap-6 rounded-md transition duration-500'>
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 bottom-6 group-hover:bottom-8 right-8'>
                                <PlayIcon className='h-6 w-6 text-black' />
                            </div>
                            {allData && <>
                                <img className='h-28 w-28 rounded' src={allData.playList.playLists[0].coverImgUrl} />
                                <p className='text-3xl font-bold truncate'>{allData.playList.playLists[0].name}</p>
                                <p className='text-sm text-neutral-400'>By {allData.playList.playLists[0].creator.nickname} <span className='rounded-full bg-neutral-900 text-white font-bold ml-4 py-1 px-4'>歌单</span></p>
                            </>}
                        </div>
                    </div>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-extrabold'>热门歌曲</h2>
                    <div className='flex flex-col'>
                        {allData && allData.song.songs.slice(0, 4).map((song) => {
                            return <div onClick={() => playSong(song)} key={song.id} className='cursor-default w-full h-16 px-4 rounded-md flex items-center gap-4 hover:bg-neutral-700'>
                                <img className='h-10 w-10' src={song.al.picUrl} />
                                <div>
                                    <p>{song.name}</p>
                                    <p className='text-sm text-neutral-400'>{song.ar[0].name}</p>
                                </div>
                                <div className='flex-grow flex items-center justify-end'>
                                    <p className='text-sm text-neutral-400'>{millisToMinutesAndSeconds(song.dt)}</p>
                                </div>

                            </div>
                        })}
                    </div>

                </div>
            </div>
            <div className='space-y-4'>
                <h2 className='text-xl font-bold'>艺术家</h2>
                <div className='flex flex-wrap gap-4'>
                    {allData && allData.artist.artists.slice(0, 4).map((artist) => {
                        return <div onClick={() => selectArtist(artist)} key={artist.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                                <PlayIcon className='h-6 w-6 text-black' />
                            </div>
                            <img className='w-48 h-48 mb-4 rounded-full' src={artist.picUrl} />
                            <p className='text-base text-white mb-1 w-48 truncate'>{artist.name}</p>
                            <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>Artist</p>
                        </div>
                    })}
                </div>
            </div>
            <div className='space-y-4'>
                <h2 className='text-xl font-bold'>歌单</h2>
                <div className='flex flex-wrap gap-4'>
                    {allData && allData.playList.playLists.slice(0, 4).map((playlist) => {
                        return <div onClick={() => selectPlaylist(playlist)} key={playlist.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                                <PlayIcon className='h-6 w-6 text-black' />
                            </div>
                            <img className='w-48 h-48 mb-4' src={playlist.coverImgUrl} />
                            <p className='text-base text-white mb-1 w-48 truncate'>{playlist.name}</p>
                            <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {playlist.creator.nickname}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className='space-y-4'>
                <h2 className='text-xl font-bold'>专辑</h2>
                <div className='flex flex-wrap gap-4'>
                    {allData && allData.album.albums.slice(0, 4).map((album) => {
                        return <div key={album.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                                <PlayIcon className='h-6 w-6 text-black' />
                            </div>
                            <img className='w-48 h-48 mb-4' src={album.picUrl} />
                            <p className='text-base text-white mb-1 w-48 truncate'>{album.name}</p>
                            <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {album.artist.name}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className='space-y-4 mb-72'>
                <h2 className='text-xl font-bold'>个人资料</h2>
                <div className='flex flex-wrap gap-4'>
                    {allData && allData.user.users.slice(0, 4).map((user) => {
                        return <div key={user.userId} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-40 group-hover:top-36 right-6'>
                                <PlayIcon className='h-6 w-6 text-black' />
                            </div>
                            <img className='w-48 h-48 mb-4' src={user.avatarUrl} />
                            <p className='text-base text-white mb-1 w-48 truncate'>{user.nickname}</p>
                            <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>留言：{user.signature}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}
