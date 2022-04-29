import api from './api'
// 获取商品列表
export const getGoodsData = (params) => {
    return api({
        url: 'goods',
        method: 'GET',
        params
    })
}
// 获取商品分类数据列表
export const getParamsApi = () => {
    return api({
        url: 'categories',
        method: 'GET',
    })
}
// 获取商品动态参数
export const getmanyData = (id, many = 'many') => {
    return api({
        url: `categories/${id}/attributes`,
        method: 'GET',
        params: { sel: many }
    })
}