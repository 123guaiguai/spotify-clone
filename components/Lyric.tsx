import { getLyric } from '@/request/api/song'
import usePlayInfo from '@/store/usePlayInfo'
import useSongInfo from '@/store/useSongInfo'
import React, { useEffect, useRef, useState } from 'react'

export default function Lyric({ audio }: any) {
    const { showLyric, setLyricStamps, lyricIndex, copyAudio, lyricStamps } = usePlayInfo()
    const { songName, songId } = useSongInfo()
    const [lyricData, setLyricData] = useState([])
    const scrollable = useRef(null)

    function extractLyricsInfo(inputString: string) {//格式化字符串"[xxx]xxxx",返回数组[xxx,xxxx]
        const regex = /\[(.*?)\](.*)/;
        const match = inputString.match(regex);

        if (match) {
            const contentInsideBrackets = match[1];
            const contentOutsideBrackets = match[2];
            return [contentInsideBrackets, contentOutsideBrackets];
        } else {
            return [null, null]; // 如果格式不匹配，返回 null
        }
    }

    function timeStringToMilliseconds(timeString: string) {
        const [minutesStr, secondsAndMillisecondsStr] = timeString.split(':');
        const [secondsStr, millisecondsStr] = secondsAndMillisecondsStr.split('.');

        const minutes = parseInt(minutesStr, 10);
        const seconds = parseInt(secondsStr, 10);
        const milliseconds = parseInt(millisecondsStr, 10);

        const totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds;
        return totalMilliseconds;
    }

    useEffect(() => {
        async function f() {
            const { lrc } = await getLyric(songId)
            let arr = lrc.lyric.split('\n')
            let sliceArr = arr.map((item: string) => {
                return extractLyricsInfo(item)
            })
            setLyricStamps(sliceArr.map((item: string) => {
                if (item[0]) {
                    return timeStringToMilliseconds(item[0])
                }
            }))
            setLyricData(sliceArr.map((item: string) => item[1]))
            scrollable.current?.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
        if (songId) {
            f()
        }
    }, [songId])

    useEffect(() => {
        if (lyricIndex === 0) {
            scrollable.current?.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
        if (lyricIndex >= 5) {
            scrollable.current?.scrollTo({
                top: 40 * (lyricIndex - 4),
                behavior: 'smooth'
            })
        }
    }, [lyricIndex])

    return (
        <div ref={scrollable} className={`${showLyric ? ' w-5/12 px-8' : 'w-0 px-0'} relative bg-neutral-800 border-l py-14 border-neutral-600 text-white transition-all ease-in-out duration-200 h-screen overflow-y-auto grow-0 shrink-0`}>
            <div className='flex flex-col items-center space-y-5 pb-20'>
                <span className='text-white text-2xl w-80 text-center truncate inline-block'>{songName}</span>
                {lyricData && lyricData.map((p, i) => {
                    return <p onClick={() => { audio.current.currentTime = (lyricStamps[i]+10) / 1000 }} className={` cursor-pointer ${i === lyricIndex ? ' scale-110' : 'opacity-50'} transition-all ease-in-out duration-200`}>{p}</p>
                })}
            </div>
        </div >
    )
}
