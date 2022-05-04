import api from './api'
// 登录
export const gologin = (data) => {
    return api({
        url: 'login',
        method: 'POST',
        data
    })
}
// 获取左侧菜单栏
export const getLeftMenuApi = () => {
    return api({
        url: 'menus',
        method: 'GET',
    })
}
// 获取角色数据
export const getUserData = (params) => {
    return api({
        url: 'users',
        method: 'GET',
        params
    })
}
// 修改用户状态
export const editUsersState = (id, state) => {
    return api({
        url: `users/${id}/state/${state}`,
        method: 'PUT',
    })
}
// 添加用户
export const addUsers = (data) => {
    return api({
        url: 'users',
        method: 'POST',
        data
    })
}
// 修改用户资料
export const editUsersApi = (id, data) => {
    return api({
        url: `users/${id}`,
        method: 'PUT',
        data
    })
}
// 删除用户
export const deleteUsersApi = (id) => {
    return api({
        url: `users/${id}`,
        method: "DELETE"
    })
}
// 分配角色
export const rolesApi = (id, rid) => {
    return api({
        url: `users/${id}/role`,
        method: 'PUT',
        data: { rid }
    })
}