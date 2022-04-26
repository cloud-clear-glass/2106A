import api from './api'
export const getGoodsData = (params) => {
    return api({
        url: 'goods',
        method: 'GET',
        params
    })
}
