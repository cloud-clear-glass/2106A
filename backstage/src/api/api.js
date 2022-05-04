import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import env from './env'

const api = axios.create({
    baseURL: env.http.baseURL,
    timeout: 5000
})
// 请求拦截
api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
}, error => {
    Promise.reject(error)
})
// 响应拦截
api.interceptors.response.use((res) => {

    const code = [200, 201, 204]
    const { data: result, meta: { msg, status } } = res.data
    if (msg === '无效token') {

        router.replace('/login')
    }
    if (code.includes(status)) {
        ElMessage({
            message: msg,
            type: 'success',
        })
        if (res.config.url === 'login') {
            localStorage.setItem('token', result.token)
        }
        return result
    }
    ElMessage.error(msg)
    return result
}, error => {
    Promise.reject(error)
})
export default api