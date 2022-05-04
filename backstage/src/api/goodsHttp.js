import api from './api'
// 获取商品列表
export const getDataApi = (params) => {
    return api({
        url: 'goods',
        method: 'GET',
        params
    })
}
// 添加商品
export const addGoodsCateApi = (data) => {
    return api({
        url: 'goods',
        method: 'POST',
        data
    })
}
// 修改商品
export const EditCateApi = (id, data) => {
    return api({
        url: `goods/${id}`,
        method: 'PUT',
        data
    })
}
// 删除商品
export const deleteGoodsApi = (id) => {
    return api({
        url: `goods/${id}`,
        method: 'DELETE'
    })
}
