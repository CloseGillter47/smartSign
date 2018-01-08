// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
import './assets/material-design-icons/iconfont/material-icons.css'

import '../static/flexible'

import * as _ from "lodash";

import Dialog from './components/Dialog'
import Toast from './components/Toast'

Vue.use(MuseUI)

Vue.config.productionTip = false

Vue.use(Dialog)
Vue.use(Toast)


router.beforeEach((to, from, next) => {

  let href = to.path;

  let admin = ['/admin/home', '/admin/set/password', '/admin/set/reset', '/admin/main/file', '/admin/main/lession'];

  let idx = 0;

  admin.forEach((v, i) => {

    idx = v === href ? i + 1 : idx;

  });

  if (idx) {

    if (sessionStorage.getItem('accessToken')) {

      next();

    } else {

      next({ path: '/admin/login' });
    }

  } else {

    next();
  }

});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 全局事件总线
export default new Vue();