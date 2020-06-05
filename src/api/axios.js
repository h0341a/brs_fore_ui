import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'http://localhost:8090/'; // 请求的默认域名
axios.defaults.withCredentials = true;
// 添加一个请求拦截器
axios.interceptors.request.use(config => {
    if (config.method === 'post' && config.data.constructor !== FormData) {
        config.data = Qs.stringify(config.data);
    } else {
        console.log('12')
    }
    return config;
},
    err => {
        return Promise.reject(err);
    });
export default axios