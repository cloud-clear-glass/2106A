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