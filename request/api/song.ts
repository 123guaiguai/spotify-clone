import service from "..";
export function searchByName(name: string | Array<string>) {//通过歌曲名字搜索
    return service({
        url: "/cloudsearch",
        params: {
            keywords: name
        }
    })
}

export function searchForAll(name) {//搜索与关键词一致的所有结果（包括歌曲，艺术家，专辑等）
    //type取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合,
    // 2000:声音(搜索声音返回字段格式会不一样)
    return service({
        url: "/search",
        params: {
            type: 1018,
            keywords: name
        }
    })

}
export function checkSongValid(id: string | number) {//检查歌曲是否可以播放
    return service({
        url: "/check/music",
        params: {
            id: id
        }
    })
}
export function getSongUrl(id: string | number) {//获取歌曲播放的url
    return service({
        url: "/song/url/v1",
        params: {
            id: id
        }
    })
}

export function getDayPlayList() {//获取每日歌单
    return service({
        url: "/personalized"
    })
}

export function getDayRecommendPlayList() {//获取每日推荐歌单（需要登陆）
    return service({
        url: "/recommend/resource",
        withCredentials: true
    })
}
export function getSongDetail(id) {//根据id获取歌曲详情
    return service({
        url: "/song/detail",
        params: {
            ids: id
        }
    })
}
export function getPlayListTracks(id) {//根据id获取歌单的所有歌曲
    return service({
        url: '/playlist/track/all',
        params: {
            id: id
        }
    })
}
export function getPlayListDetail(id){//获取歌单所有信息和包含歌曲
    return service({
        url:"/playlist/detail",
        params:{
            id:id
        }
    })
}
export function getArtistDetail(id){//获取歌手的详情
    return service({
        url:"/artist/detail",
        params:{
            id
        }
    })
}
export function getArtistTopTracks(id){//获取歌手详情和热门歌曲
    return service({
        url:"/artists",
        params:{
            id
        }
    })
}
export function getRelatedArtist(id){//获取相似歌手
    return service({
        url:"/simi/artist",
        params:{
            id
        }
    })
}
export function getUserInfo(){//获取登陆用户的详细信息
    return service({
        url:"/user/account"
    })
}
export function getAlbumDetail(id){//获取专辑信息
    return service({
        url:"/album",
        params:{
            id
        }
    })
}
export function getUserPlayList(uid){//获取用户的歌单
    return service({
        url:"/user/playlist",
        params:{
            uid
        }
    })
}