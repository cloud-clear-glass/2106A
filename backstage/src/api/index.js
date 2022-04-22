import axios from 'axios'
const api=axios.create({
    baseURL:'https://www.liulongbin.top:8888/api/private/v1/',
    timeout:5000
})
api.interceptors.request.use((config)=>{
    return config
},error=>{
    Promise.reject(error)
})
api.interceptors.response.use((res)=>{
    return Promise.resolve(res)
},error=>{
    Promise.reject(error)
})
export default api