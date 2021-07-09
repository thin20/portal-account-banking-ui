import api from './index'
import { axios } from '../utils/request'
const queryString = require('query-string')

export async function Login(parameter) {
    let paramString = queryString.stringify(parameter)
    return axios({
        url: api.Login + '?' + paramString,
        method: 'get',
    })
}

export async function Register(parameter) {
    let paramString = queryString.stringify(parameter)
    return axios({
        url: api.Register + '?' + paramString,
        method: 'post',
    })
}