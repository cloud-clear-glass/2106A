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
export const getParamsApi = (params) => {
    return api({
        url: 'categories',
        method: 'GET',
        params
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
// 添加商品
export const addGoodsCateApi = (data) => {
    return api({
        url: 'goods',
        method: 'POST',
        data
    })
}
// 修改商品
export const eiditGoodsApi = (id, data) => {
    return api({
        url: `goods/${id}`,
        method: 'PUT',
        data
    })
}
export const deleteGoodsApi = (data) => {
    return api({
        url: `goods/${data}`,
        method: 'DELETE',
    })
}
// 添加动态参数子参数
export const editcategoriesApi = (id, attrId, name, type, vals) => {
    return api({
        url: `categories/${id}/attributes/${attrId}`,
        method: 'PUT',
        data: {
            attr_name: name,
            attr_sel: type,
            attr_vals: vals
        }
    })
}
// 添加动态参数
export const addcategoriesApi = (id, data) => {
    return api({
        url: `categories/${id}/attributes`,
        method: 'POST',
        data
    })
}
// 删除动态参数
export const handleDeleteApi = (id, attrid) => {
    return api({
        url: `categories/${id}/attributes/${attrid}`,
        method: 'DELETE'
    })
}
