import api from './index'
import { axios } from '@/utils/request'
const queryString = require('query-string')

export async function GetAllUserAccount() {
    return axios({
        url: api.GetAllUserAccount,
        method: 'get',
    })
}

export async function GetListUserAccount(parameter) {
    let paramString = queryString.stringify(parameter)
    console.log("Param String: ", paramString)
    return axios({
        url: api.GetListUserAccount + '?' + paramString,
        method: 'get',
    })
}
