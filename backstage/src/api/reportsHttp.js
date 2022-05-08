import api from './api'
// 获取图表
export const getDataApi = () => {
    return api({
        url: 'reports/type/1',
        method: 'GET',
    })
}