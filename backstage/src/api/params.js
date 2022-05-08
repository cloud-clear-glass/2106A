import api from './api'
// 获取表格数据
export const getTableDataApi = (id, sel = 'many') => {
    return api({
        url: `categories/${id}/attributes`,
        method: 'GET',
        params: { sel }
    })
}
// 编辑提交子参数
export const addParamsApi = (id, attrId, attr_name, attr_sel, attr_vals) => {
    return api({
        url: `categories/${id}/attributes/${attrId}`,
        method: 'PUT',
        data: {
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
// 添加动态参数
export const addParamManysApi = (id, attr_name, attr_sel, attr_vals) => {
    return api({
        url: `categories/${id}/attributes`,
        method: 'POST',
        data: {
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
// 编辑动态参数
export const editParamsApi = (id, attrId, attr_name, attr_sel, attr_vals) => {
    return api({
        url: `categories/${id}/attributes/${attrId}`,
        method: 'PUT',
        data: {
            attr_name, attr_sel, attr_vals
        }
    })
}
// 删除参数
export const deleteParamsApi = (id, attrId) => {
    return api({
        url: `categories/${id}/attributes/${attrId}`,
        method: 'DELETE',
    })
}