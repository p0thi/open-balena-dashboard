import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import store from './store'
import router from './router'

import 'boxicons/css/boxicons.min.css'
import axios from 'axios'
import VueAxios from "vue-axios";
import VueMoment from 'vue-moment'

import { getSdk } from "balena-sdk"



Vue.config.productionTip = false
// Vue.prototype.$balena = undefined

Vue.use(Vuesax, {

})

Vue.use(VueAxios, axios)
Vue.use(VueMoment)

const app = new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    console.log(this)
    this.$store.commit('initializeStore')
    const balena = getSdk({
      apiUrl: this.$store.getters.getApiUrl,
      isBrowser: true,
      debug: true
    })
    balena.interceptors.push({
      responseError (error) {
        console.log('response error', error)
        balena.auth.whoami().then(res => {
          console.log('res', res)
        })
        throw error
      }
    })
    Vue.prototype.$balena = balena
    console.log(this)
  },
  store
})
store.$app = app
app.$mount('#app')
