import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

export default function Front() {
    const [mouseMove, setMouseMove] = useState(false)
    return (
        <div className=' relative'>
            <div className='rounded-md bg-neutral-900 p-1 wpx-160 hpx-410'>
                <p onMouseEnter={()=>setMouseMove(true)} onMouseLeave={()=>setMouseMove(false)} className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white flex items-center justify-between'>
                    <span>加入歌单</span>
                    <PaperAirplaneIcon className='w-4 h-4' />
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>收藏至已点赞的歌曲</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white border-b border-neutral-700'>
                    <span>加入播放队列</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>转至歌曲电台</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>转至艺人</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>转至专辑</span>
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white border-b border-neutral-700'>
                    <span>显示提供者</span>
                </p>
                <p className='flex items-center justify-between w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white border-b border-neutral-700'>
                    <span>分享</span>
                    <PaperAirplaneIcon className='w-4 h-4' />
                </p>
                <p className='w-full cursor-pointer rounded-sm hover:bg-neutral-700 p-3 text-sm text-white'>
                    <span>在桌面应用中打开</span>
                </p>
            </div>
            <div onMouseEnter={()=>setMouseMove(true)} onMouseLeave={()=>setMouseMove(false)} className={`absolute w-60 h-40 p-1 bg-neutral-800 rounded-md top-3 pr-98 shadow-md ${mouseMove?null:'hidden'}`}>
                <p className='p-3 rounded-sm bg-neutral-700 text-sm text-white cursor-pointer border-b border-neutral-700 flex items-center space-x-2'>
                    <MagnifyingGlassIcon className='w-4 h-4' />
                    <input type="text" placeholder='查找歌单' className='flex-grow outline-0 bg-neutral-700' />
                </p>
                <p className='p-3 rounded-sm hover:bg-neutral-700 text-sm text-white cursor-pointer border-b border-neutral-700'>创建歌单</p>
            </div>
        </div>
    )
}
