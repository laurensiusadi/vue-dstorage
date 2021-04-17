import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueIpfs from './plugins/vue-ipfs'

Vue.use(VueIpfs, { host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
