import axios from 'axios'
import env from './env'
import { Message } from 'element-ui'
import router from '../router/index'
import NProgress from 'nprogress'

const api = axios.create({
    baseURL: env.http.baseURL,
    timeout: 5000
})
// 请求拦截
api.interceptors.request.use((config) => {
    config.headers.Authorization = sessionStorage.getItem('token')
    NProgress.start()
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截
api.interceptors.response.use((res) => {
    NProgress.done()
    const code = [200, 201, 204]
    const { data: result, meta: { msg, status } } = res.data
    if (msg === '无效token') {
        router.replace('/login')
    }
    // 判断状态
    if (code.includes(status)) {
        Message({
            message: msg,
            type: 'success'
        })
        // 判断是否存储 token
        if (res.config.url === 'login') {
            sessionStorage.setItem('token', result.token)
        }

        return result
    }
    Message({
        message: msg,
        type: 'error'
    })

    return res
}, error => {
    return Promise.reject(error)
})
export default api
