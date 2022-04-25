import api from './api'
// 获取token
export const getToken = (data) => {
    return api({
        url: 'login',
        method: 'POST',
        data
    })
}
// 获取左侧菜单
export const getMenus = () => {
    return api({
        url: 'menus',
        method: 'GET',
    })
}
// 获取用户数据
export const getusers = (params) => {
    return api({
        url: 'users',
        method: 'GET',
        params
    })
}
// 添加用户
export const submitUser = (data) => {
    return api({
        url: 'users',
        method: 'POST',
        data
    })
}
// 修改用户状态
export const handleStatusApi = (data) => {
    return api({
        url: `users/${data.id}/state/${data.mg_state}`,
        method: 'PUT'
    })
}
// 编辑用户信息
export const handleEditApi = (data) => {
    return api({
        url: `users/${data.id}`,
        method: 'PUT',
        data: { email: data.email, mobile: data.mobile }
    })
}
// 删除用户
export const handleDeleteApi = (data) => {
    return api({
        url: `users/${data}`,
        method: 'DELETE'
    })
}
// 请求角色列表
export const getroles = () => {
    return api({
        url: 'roles',
        method: 'GET'
    })
}
// 分配用户角色
export const handlesubmitToolsApi = (data) => {
    return api({
        url: `users/${data.id}/role`,
        method: 'PUT',
        data: {
            rid: data.rid
        }
    })
}
