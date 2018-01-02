import * as TYPES from '../types'

const state = {

    current: sessionStorage.getItem('currentPage') || 'home'

};

const actions = {

    setCurrentPage({ commit }, status) {

        sessionStorage.setItem('currentPage', status);

        commit(TYPES.SET_MIAN_PAGE, status);
    }
};

const getters = {

    current: state => state.current
};


const mutations = {

    [TYPES.SET_MIAN_PAGE](state, status) {

        sessionStorage.setItem('currentPage', status);
        
        state.current = status;
    }

};

export default {
    state,
    actions,
    getters,
    mutations
}