import api from './api'
// 获取分类数据
export const getDataApi = (type = '3') => {
    return api({
        url: 'categories',
        method: 'GET',
        params: {
            type
        }
    })
}
// 获取分类参数
export const getListApi = (id, sel = 'many') => {
    return api({
        url: `categories/${id}/attributes`,
        method: 'GET',
        params: {
            sel
        }
    })
}
// 获取分类数据
export const getOptionsApi = (type = '2') => {
    return api({
        url: 'categories',
        method: 'GET',
        params: {
            type
        }
    })
}
// 添加分类
export const addCateApi = (cat_pid, cat_name, cat_level) => {
    return api({
        url: 'categories',
        method: 'POST',
        data: {
            cat_pid,
            cat_name,
            cat_level
        }
    })
}
// 编辑分类
export const handleEditApi = (id, data) => {
    return api({
        url: `categories/${id}`,
        method: 'PUT',
        data: {
            cat_name: data
        }
    })
}
// 删除分类
export const deleteCateApi = (id) => {
    return api({
        url: `categories/${id}`,
        method: 'DELETE',
    })
}