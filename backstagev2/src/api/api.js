import axios from 'axios'
import env from './env'
import { Message } from 'element-ui'
const api = axios.create({
    baseURL: env.prod.baseURL,
    timeout: 5000
})
// 请求拦截
api.interceptors.request.use((config) => {
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截
api.interceptors.response.use((res) => {
    const code = [200, 201, 204]
    const { data: result, meta: { msg, status } } = res.data
    console.log(res)
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
