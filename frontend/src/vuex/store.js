import Vue from 'vue'
import Vuex from 'vuex'

import com from './modules/com'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        com,
        user
    }
})
