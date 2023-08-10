import {create} from "zustand"

const useSongInfo=create((set)=>({
    songId:null,//歌曲的id
    songName:'',//歌曲名称
    playListId:null,//歌单的id
    isTrackPlaying:false,//控制歌曲的播放图标
    view:'search',//设置视图，控制组件的切换
    artistId:null,//歌手的id
    albumId:null,//专辑id
    userInfo:null,//记录用户信息
    userPlayList:[],//记录用户的歌单
    songNo:0,//记录用户当前点击的歌曲的索引号
    setSongNo:(no:number)=>set((state)=>({songNo:no})),
    setUserPlayList:(playlist)=>set((state)=>({userPlayList:playlist})),
    playIndex:0,//记录播放歌曲在专辑/歌单中的次序
    playTracks:[],//记录歌单/专辑/搜索结果
    setSongName:(name)=>set((state)=>({songName:name})),
    setPlayTracks:(playlist)=>set((state)=>({playTracks:playlist})),
    setPlayIndex:(index)=>set((state)=>({playIndex:index})),
    setUserInfo:(info:any)=>set((state:any)=>({userInfo:info})),
    setAlbumId:(id:any)=>set((state:any)=>({albumId:id})),
    setArtistId:(id:any)=>set((state:any)=>({artistId:id})),
    setView:(v:any)=>set((state:any)=>({view:v})),
    setIsTrackPlaying:(bool:boolean)=>set((state:any)=>({isTrackPlaying:bool})),
    setSongId:(id:any)=>set((state:any)=>({songId:id})),
    setPlayListId:(id:any)=>set((state:any)=>({playListId:id}))
}))
export default useSongInfo