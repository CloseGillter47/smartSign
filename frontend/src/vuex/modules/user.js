import * as TYPES from '../types'

const state = {

    user: new Object()

};

const actions = {

    setCurrentPage({ commit }, status) {

        commit(TYPES.SET_USER_INFO, status);
    }
};

const getters = {

    user: state => state.user
};


const mutations = {

    [TYPES.SET_USER_INFO](state, status) {

        state.user = status;
    }

};

export default {
    state,
    actions,
    getters,
    mutations
}