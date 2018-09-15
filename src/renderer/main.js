import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import './index.css'
import 'iview/dist/styles/iview.css'
import app from './api/app'
import { Message } from 'iview'
import VueResource from 'vue-resource'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.use(iView)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$Message = Message;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
