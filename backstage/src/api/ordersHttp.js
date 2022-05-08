import api from './api'
// 获取参数
export const getOrdersApi = (params) => {
    return api({
        url: 'orders',
        method: 'GET',
        params
    })
}