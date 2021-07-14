import { GetListUserAccount, GetListSearchUserAccount, GetAllUserAccount, CreateUserAccount, UpdateUserAccount } from '@/api/UserAccount'

export const state = {
    listUserAccount: [],
    page: 0,
    total: 0
}

export const getters = {
    GetListUserAccount: (state) => {
        return state.listUserAccount
    },
    GetNumberOfPage: (state) => {
        return state.page;
    },
    GetTotalUserAccount: (state) => {
        return state.total;
    }
}

export const mutations = {
    SET_LIST_USER_ACCOUNT(state, newValue) {
        state.listUserAccount = [...newValue]
    },
    SET_NUMBER_OF_PAGE(state, newValue) {
        state.page = newValue;
    },
    SET_TOTAL_USER_ACCOUNT(state, newValue) {
        state.total = newValue
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
            // console.log("Response list user account: ", response)
            if (response?.data?.status && response?.data?.data) {
                if (response.data.status === 1) {
                    commit('SET_LIST_USER_ACCOUNT', response.data.data)
                    commit('SET_NUMBER_OF_PAGE', response.data.numberOfPage)
                    commit('SET_TOTAL_USER_ACCOUNT', response.data.total)
                    return new Promise((resolve) => resolve(response.data.data))
                }
            }
            return new Promise((resolve, reject) => reject(response))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    },
    async getListSearchUserAccount({ commit }, { page, limit, search } = {}) {
        const params = {
            page: Number.parseInt(page),
            limit: Number.parseInt(limit),
            search: search
        }
        try {
            const response = await GetListSearchUserAccount(params)
            // console.log("Response list user account: ", response)
            if (response?.data?.status && response?.data?.data) {
                if (response.data.status === 1) {
                    console.log("response.data.data: ", response.data.data)
                    commit('SET_LIST_USER_ACCOUNT', response.data.data)
                    commit('SET_NUMBER_OF_PAGE', response.data.numberOfPage)
                    commit('SET_TOTAL_USER_ACCOUNT', response.data.total)
                    return new Promise((resolve) => resolve(response.data.data))
                }
            }
            return new Promise((resolve) => resolve(false))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    },
    async getAllUserAccount({ commit }) {
        try {
            const response = await GetAllUserAccount()
            // console.log("Response list user account: ", response)
            if (response?.data?.status && response?.data?.data) {
                if (response.data.status === 1) {
                    commit('SET_LIST_USER_ACCOUNT', response.data.data)
                    commit('SET_NUMBER_OF_PAGE', response.data.numberOfPage)
                    commit('SET_TOTAL_USER_ACCOUNT', response.data.total)
                    return new Promise((resolve) => resolve(response.data.data))
                }
            }
            return new Promise((resolve, reject) => reject(response))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    },
    async createUserAccount({ getters }, { userInfo, currentUserId }) {
        try {
            getters['GetListUserAccount']
            const response = await CreateUserAccount(userInfo, currentUserId)
            console.log("Response create User: ", response)
            if (response?.data?.status === 1) {
                return new Promise((resolve) => resolve(true))
            }
            return new Promise((resolve) => resolve(false))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    },
    async updateUserAccount({ getters }, { userInfo, currentUserId }) {
        try {
            getters['GetListUserAccount']
            const response = await UpdateUserAccount(userInfo, currentUserId)
            console.log("Response update User: ", response)
            if (response?.data?.status === 1) {
                return new Promise((resolve) => resolve(true))
            }
            return new Promise((resolve) => resolve(false))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    }
}