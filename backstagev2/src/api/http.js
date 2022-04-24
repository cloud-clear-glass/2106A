import api from './api'
export const getToken = (data) => {
    return api({
        url: 'login',
        method: 'POST',
        data
    })
}
