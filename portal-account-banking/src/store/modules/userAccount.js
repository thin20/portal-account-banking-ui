import { GetListUserAccount } from '@/api/UserAccount'

export const state = {
    listUserAccount: []
}

export const getters = {
    GetListUserAccount: (state) => {
        return state.listUserAccount
    }
}

export const mutations = {
    SET_LIST_USER_ACCOUNT(state, newValue) {
        state.listUserAccount = [...newValue]
    }
}

export const actions = {
    async getListUserAccount({ commit }, { page, limit } = {}) {
        const params = {
            page: Number.parseInt(page),
            limit: Number.parseInt(limit)
        }
        try {
            const response = await GetListUserAccount(params)
            console.log("Response list user account: ", response)
            if (response?.data?.status && response?.data?.data) {
                if (response.data.status === 1) {
                    commit('SET_LIST_USER_ACCOUNT', response.data.data)
                    return new Promise((resolve) => resolve(response.data.data))
                }
            }
            return new Promise((resolve, reject) => reject(response))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    }
}