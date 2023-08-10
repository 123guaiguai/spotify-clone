import axios from 'axios'
const service = axios.create({
    baseURL: 'https://netease-cloud-music-api-iota-fawn.vercel.app',
    //baseURL:'http://localhost:4000',
    //baseURL:"http://iwenwiki.com:3000",
    timeout: 5000,
    withCredentials: true
})

// service.interceptors.request.use(
//     (config) => {
//         //所有请求都携带cookie
//         if (localStorage.getItem('cookie')) {
//             config.headers.cookie = localStorage.getItem('cookie');
//         }
//         //发送之前操作config
//         return config;
//     },
// );

service.interceptors.response.use(
	(response) => {
		// 对拿到的数据做一些额外操作操作 (如无权限,直接跳转首页)
		return response.data;
	},
);


export default service

