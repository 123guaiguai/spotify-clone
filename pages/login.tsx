import { signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function login() {
    const [base64URL, setBase64URL] = useState()
    const [key, setKey] = useState('')
    const baseURL = "https://netease-cloud-music-api-iota-fawn.vercel.app"

    async function scanForLogin() {//扫码登陆网易云音乐账号
        const response = await fetch(`${baseURL}/login/qr/key?timestamp=${Math.floor(Date.now() / 1000)}`, {
            method: 'GET'
        })
        const { data } = await response.json()
        const responseNext = await fetch(`${baseURL}/login/qr/create?key=${data.unikey}&qrimg=true`)
        const { data: dataNext } = await responseNext.json()
        setBase64URL(dataNext.qrimg)
        setKey(data.unikey)//生成二维码需要的key
        
    }
    useEffect(()=>{
        let count=6
        let check = setInterval(async () => {
            if(!key){
                return 
            }
            if(count<0){
                alert("连接超时")
                clearInterval(check);
            }else{
                count--
            }
            let res = await (await fetch(`${baseURL}/login/qr/check?key=${key}&timestamp=${Math.floor(Date.now() / 1000)}`)).json()
            if (res) {
                console.log(res.message, '---')
                if (res.code == 800) {
                    alert(res.message)
                    clearInterval(check)
                }
                if (res.code == 803) {
                    localStorage.setItem('cookie',res.cookie)
                    alert(res.message)
                    clearInterval(check)
                }
            }
        }, 3000)
    },[key])

    return (
        <div className='flex justify-center items-center flex-col'>
            <button onClick={() => signIn('spotify', { callbackUrl: '/' })}>Login with spotify</button>
            <div className='flex justify-center items-center mt-5 flex-col cursor-pointer'>
                <p onClick={() => scanForLogin()}>点击网易云扫码登陆</p>
                <img className='w-20 h-20 mt-3' src={base64URL} alt="等待扫码" />
            </div>
        </div>
    )
}
