import {create} from "zustand"

const useSongInfo=create((set)=>({
    songId:null,//歌曲的id
    playListId:null,//歌单的id
    isTrackPlaying:false,//控制歌曲的播放图标
    view:'search',//设置视图，控制组件的切换
    artistId:null,//歌手的id
    albumId:null,//专辑id
    userInfo:null,
    setUserInfo:(info:any)=>set((state:any)=>({userInfo:info})),
    setAlbumId:(id:any)=>set((state:any)=>({albumId:id})),
    setArtistId:(id:any)=>set((state:any)=>({artistId:id})),
    setView:(v:any)=>set((state:any)=>({view:v})),
    setIsTrackPlaying:(bool:boolean)=>set((state:any)=>({isTrackPlaying:bool})),
    setSongId:(id:any)=>set((state:any)=>({songId:id})),
    setPlayListId:(id:any)=>set((state:any)=>({playListId:id}))
}))
export default useSongInfo