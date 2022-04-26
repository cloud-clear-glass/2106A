import api from './api'
// 添加角色
export const addRolesApi = (data) => {
    return api({
        url: 'roles',
        method: 'POST',
        data
    })
}
// 编辑角色
export const editRolesApi = (data) => {
    return api({
        url: `roles/${data.id}`,
        method: 'PUT',
        data: {
            roleName: data.roleName,
            roleDesc: data.roleDesc
        }
    })
}
// 删除角色
export const deleteRolesApi = (data) => {
    return api({
        url: `roles/${data}`,
        method: 'DELETE',
    })
}
// 获取所有权限
export const getRightsApi = () => {
    return api({
        url: 'rights/tree',
        method: 'GET',
    })
}
// 角色授权
export const ADDRolesApi = (id, arr1, arr2) => {
    return api({
        url: `roles/${id}/rights`,
        method: 'POST',
        data: {
            rids: [...arr1, ...arr2].join(',')
        }
    })
}
// 所有权限，list版
export const getrightData = () => {
    return api({
        url: 'rights/list',
        method: 'GET',
    })
}
