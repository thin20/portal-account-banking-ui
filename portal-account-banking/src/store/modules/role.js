import { GetListRole } from '@/api/Role'

export const state = {
    listRole: []
}

export const getters = {
    GetListRole(state) {
        return state.listRole;
    },
    GetListOptionRole(state) {
        let listRoleId = []
        state.listRole.forEach((r) => {
            listRoleId.push({ value: r.id.trim(), label: r.id.trim() })
        })
        return listRoleId
    }
}

export const mutations = {
    SET_LIST_ROLE(state, newValue) {
        state.listRole = [...newValue]
    }
}

export const actions = {
    async getListRole({ commit }) {
        try {
            const response = await GetListRole()
            if (response?.data?.data) {
                if (response.data.status === 1) {
                    commit('SET_LIST_ROLE', response.data.data)
                    return new Promise((resolve) => resolve(response.data))
                }
                return new Promise((resolve, reject) => reject(response.data))
            }
            return new Promise((resolve, reject) => reject(response.data))
        } catch (e) {
            return new Promise((resolve, reject) => reject(e))
        }
    }
}