import api from './index'
import { axios } from '@/utils/request'

export async function GetListRole() {
    return axios({
        url: api.GetListRole,
        method: 'get',
    })
}