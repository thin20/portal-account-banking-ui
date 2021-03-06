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

export async function GetListSearchUserAccount(parameter) {
    let paramString = queryString.stringify(parameter)
    console.log("Param String: ", paramString)
    return axios({
        url: api.GetListSearchUserAccount + '?' + paramString,
        method: 'get',
    })
}

export async function GetUserAccountByID(parameter) {
    let paramString = queryString.stringify(parameter)
    return axios({
        url: api.GetUserAccountByID + '?' + paramString,
        method: 'get',
    })
}

export async function CreateUserAccount(parameter, currentUserId) {
    let paramString = queryString.stringify(parameter)
    console.log("Param String: ", paramString)
    return axios({
        url: api.CreateUserAccount + '?' + paramString,
        method: 'post',
        headers: {
            "idUser": currentUserId
        }
    })
}

export async function UpdateUserAccount(parameter, currentUserId) {
    let paramString = queryString.stringify(parameter)
    return axios({
        url: api.UpdateUserAccount + '?' + paramString,
        method: 'put',
        headers: {
            "idUser": currentUserId
        }
    })
}

export async function DeleteUserAccount(parameter, currentUserId) {
    let paramString = queryString.stringify(parameter)
    return axios({
        url: api.DeleteUserAccount + '?' + paramString,
        method: 'delete',
        headers: {
            "idUser": currentUserId
        }
    })
}
