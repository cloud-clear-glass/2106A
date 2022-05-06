import api from './api'
// 获取数据列表
export const getOdersDataApi = (params) => {
    return api({
        url: 'orders',
        method: 'GET',
        params
    })
}
// 图表
export const getReportsApi = () => {
    return api({
        url: 'reports/type/1',
        method: 'GET',
    })
}
