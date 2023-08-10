import {create} from "zustand"

const usePlayInfo=create((set)=>({
    repeatPlay:false,//歌曲是否循环播放
    showLyric:false,//是否展示歌词
    lyricIndex:0,//当前播放到的歌词的索引号
    lyricStamps:[],//记录歌词每句的时间
    setLyricStamps:(stamps:Array<number>)=>set((state)=>({lyricStamps:stamps})),
    setLyricIndex:(sno:number)=>set((state)=>({lyricIndex:sno})),
    setShowLyric:(bool:boolean)=>set((state)=>({showLyric:bool})),
    setRepeatPlay:(bool:boolean)=>set((state)=>({repeatPlay:bool})),
}))
export default usePlayInfo