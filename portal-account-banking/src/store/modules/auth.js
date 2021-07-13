import { Login, Register } from '../../api/Login'

export const state = {
    currentUser: null
}

export const getters = {
    loggedIn: (state) => {
        return !!state.currentUser
    },
    currentUserId: (state) => {
        if (state?.currentUser) {
            if (state?.currentUser?.id) {
                return state.currentUser.id
            }
            return null;
        }
        return null;
    },
    currentUserName: (state) => {
        if (state.currentUser) {
            if (state.currentUser?.userName) {
                return state.currentUser.userName
            }
            return null
        }
        return null
    }
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
    }
}

export const actions = {
    async logIn({ commit }, { userName, password } = {}) {
        const params = {
            userName: userName,
            password: password
        }
        try {
            const response = await Login(params)
            console.log("Response login: ", response)
            if (response?.data?.status && response?.data?.data) {
                if (response.data.status === 1) {
                    commit('SET_CURRENT_USER', response.data.data[0])
                    return new Promise((resolve) => resolve(true))
                }
            }
            return new Promise((resolve) => resolve(false))
        } catch (error) {
            console.log(error)
            return new Promise((resolve, reject) => reject(error))
        }
    },
    async logOut({ commit, state }) {
        if (!getters.loggedIn(state)) return false
        commit('SET_CURRENT_USER', null)
        return true
    },
    async register({ commit }, params) {
        try {
            commit('SET_CURRENT_USER', null)
            const response = await Register(params)
            console.log("Response register: ", response)
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