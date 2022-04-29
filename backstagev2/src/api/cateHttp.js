import api from './api'
// 获取cate权限数据
export const getCateListApi = (params) => {
    return api({
        url: 'categories',
        method: 'GET',
        params
    })
}
// 添加分类
export const addCateGoriesApi = (data) => {
    return api({
        url: 'categories',
        method: 'POST',
        data
    })
}
// 修改分类数据
export const editCateApi = (data) => {
    return api({
        url: `categories/${data.id}`,
        method: 'PUT',
        data: {
            cat_name: data.cat_name
        }
    })
}
// 删除分类数据
export const deleteCategoryApi = (data) => {
    return api({
        url: `categories/${data}`,
        method: 'DELETE'
    })
}
