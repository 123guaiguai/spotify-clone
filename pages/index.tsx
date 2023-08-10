import Artist from "@/components/Artist";
import Front from "@/components/Front";
import Library from "@/components/Library";
import Lyric from "@/components/Lyric";
import Player from "@/components/Player";
import PlayListView from "@/components/PlayListView";
import Search from "@/components/Search";
import SideBar from "@/components/SideBar";
import { getUserInfo } from "@/request/api/song";
import usePlayInfo from "@/store/usePlayInfo";
import useSongInfo from "@/store/useSongInfo";
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // const [view, setView] = useState("search") // ["search", "library", "playlist", "artist"]//判断用户选择哪个视图
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null)//获取当前歌单的id
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null)//获取当前播放歌曲的id
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false)//记录歌曲是否在播放
  const [globalCurrentSongs, setGlobalCurrentSongs] = useState([])
  const [wyySongId, setWyySongId] = useState(null)//获取当前播放的音乐在网易云的id

  const { view, setView, setUserInfo, userInfo } = useSongInfo()
  const { showLyric } = usePlayInfo()
  const audio = useRef(null)

  useEffect(() => {
    async function f() {
      const data = await getUserInfo()
      setUserInfo(data)
    }
    !userInfo && f()
  }, [])

  return (

    <>
      <main className="flex w-full h-screen overflow-hidden bg-black">
        <SideBar view={view}
          setView={setView}
          setGlobalPlaylistId={setGlobalPlaylistId} />
        {view === 'home' && <Front />}
        {view === 'playlist' && <PlayListView setWyySongId={setWyySongId} setGlobalCurrentSongs={setGlobalCurrentSongs} globalPlaylistId={globalPlaylistId} setGlobalIsTrackPlaying={setGlobalIsTrackPlaying} setGlobalCurrentSongId={setGlobalCurrentSongId} />}
        {view === 'search' && <Search setGlobalIsTrackPlaying={setGlobalIsTrackPlaying} setWyySongId={setWyySongId} view={view} setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />}
        {view === 'library' && <Library setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />}
        {view === 'artist' && <Artist />}
        <Lyric audio={audio} />
        <div className="fixed bottom-0 bg-red-300 w-full">
          <Player audio={audio} wyySongId={wyySongId} globalCurrentSongs={globalCurrentSongs} globalCurrentSongId={globalCurrentSongId} setGlobalCurrentSongId={setGlobalCurrentSongId} />
        </div>
      </main>

    </>

  )
}
