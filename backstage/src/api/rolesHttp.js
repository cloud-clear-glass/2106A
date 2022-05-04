import api from './api'
// 获取角色数据
export const getDataApi = () => {
    return api({
        url: 'roles',
        method: 'GET',
    })
}
// 添加角色
export const handleAddRolesApi = (data) => {
    return api({
        url: 'roles',
        method: 'POST',
        data
    })
}
// 编辑角色
export const handleEditApi = (data) => {
    return api({
        url: `roles/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除角色
export const handleDeleteApi = (id) => {
    return api({
        url: `roles/${id}`,
        method: 'DELETE'
    })
}
// 请求所有权限
export const getRightsApi = (type) => {
    return api({
        url: `rights/${type}`,
        method: 'GET',
    })
}
// 角色授权
export const handleCheckApi = (id, rids) => {
    return api({
        url: `roles/${id}/rights`,
        method: 'POST',
        data: {
            rids: rids.join(','),
        }
    })
}
// 删除单个权限
export const deleteOneApi = (id, rightId) => {
    return api({
        url: `roles/${id}/rights/${rightId}`,
        method: 'DELETE',
    })
}