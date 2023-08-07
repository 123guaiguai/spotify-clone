import { searchForAll } from '@/request/api/song'
import React, { useEffect, useState } from 'react'
import SearchAlbum from './SearchAlbum'
import SearchAll from './SearchAll'
import SearchArtist from './SearchArtist'
import SearchPlayList from './SearchPlayList'
import SearchSongs from './SearchSongs'

export default function SearchResults({ inputValue, view, searchData, setWyySongId, setGlobalIsTrackPlaying }: any) {
    const list = ['全部', '歌曲', '艺人', '歌单', '专辑', '博客和MV']
    const [focusIndex, setFocusIndex] = useState(1)
    const [searchView, setSearchView] = useState("歌曲")
    const [song, setSong] = useState(null)
    const [playList, setPlayList] = useState(null)
    const [artist, setArtist] = useState(null)
    const [album, setAlbum] = useState(null)
    const [user, setUser] = useState(null)
    const [allData, setAllData] = useState(null)
    useEffect(() => {
        async function f() {
            const { result } = await searchForAll(inputValue)
            const { song, playList, artist, album, user } = result
            setAllData(result)
            setAlbum(album)
            setArtist(artist)
            setPlayList(playList)
            setSong(song)
            setUser(user)
        }
        if (inputValue) {
            f()
        }
    }, [inputValue])

    function changeSearchView(view, index) {
        setSearchView(view)
        setFocusIndex(index)
    }

    return (
        <div>
            <div className='flex px-8 items-center space-x-3 flex-wrap'>
                {list.map((item, i) => {
                    return <span onClick={() => changeSearchView(item, i)} key={i} className={`mb-3 px-3 rounded-full cursor-pointer text-sm py-1 ${i === focusIndex ? 'bg-white text-black' : 'bg-white bg-opacity-10 text-white transition-all hover:bg-opacity-20'}`}>{item}</span>
                })}
            </div>
            <div className='mt-2'>
                {searchView === '歌曲' && <SearchSongs setGlobalIsTrackPlaying={setGlobalIsTrackPlaying} setWyySongId={setWyySongId} searchData={searchData} view={view} />}
                {searchView === '全部' && <SearchAll allData={allData} />}
                {searchView === '艺人' && <SearchArtist searchData={allData?.artist} />}
                {searchView === '歌单' && <SearchPlayList searchData={allData?.playList} />}
                {searchView==='专辑'&&<SearchAlbum searchData={allData?.album} />}
            </div>
        </div>
    )
}
