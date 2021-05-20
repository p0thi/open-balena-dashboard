import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedInStatus: 'loading',
    api_url: null,
    applications: null,
    deviceTypes: null,
    selectedApp: null
  },
  mutations: {
    setLoggedInStatus(state, value) {
      Vue.set(state, 'loggedInStatus', value ? 'logged_in' : 'logged_out')
      // state.loggedInStatus = value ? 'logged_in' : 'logged_out'
    },
    setApiUrl(state, value) {
      localStorage.setItem('api_url', value)
      state.api_url = value
    },
    setApplications(state, value) {
      Vue.set(state, 'applications', value)
    },
    initializeStore(state) {
      state.auth_token = localStorage.getItem('auth_token')
      state.api_url = localStorage.getItem('api_url')
    },
    setDeviceTypes(state, types) {
      state.deviceTypes = types
    },
    setSelectedApp(state, app) {
      Vue.set(state, 'selectedApp', app.uuid)
      // state.selectedApp = app.uuid
    }
  },
  getters: {
    getLoggedInStatus: state => {
      return state.loggedInStatus
    },
    getApplications: state => {
      return state.applications
    },
    getDeviceTypes: state => {
      return state.deviceTypes
    },
    getSelectedApp: state => {
      // return state.selectedApp
      return state.applications?.find(item => item.uuid === state.selectedApp)
    },
    getApiUrl: state => {
      return state.api_url
    }
  },
  actions: {
    checkLoginStatus({commit}) {
      console.log('test 1', this.$app.$balena)
      this.$app.$balena?.auth.isLoggedIn().then(val => {
        console.log('test 2')
        commit('setLoggedInStatus', val)
      })
    },
    fetchApplications({commit}) {
      console.log(this.$app.$balena)
      this.$app.$balena?.models.application.getAllWithDeviceServiceDetails({
            $expand: {
              is_for__device_type: {
                $expand: ['is_of__cpu_architecture']
              }
            }
          }).then(resp => {
        commit('setApplications', resp)
            // resp.forEach(item => {
            //   dispatch('fetchApplicationDetails', item)
            // })
        console.log("apps2", resp)
      })
    },
    fetchDeviceTypes({commit, state}) {
      Vue.axios.get(
          `${state.api_url}/device-types/v1`,
          {headers: {'authorization': `Bearer ${state.auth_token}`}}
      ).then(resp => {
        console.log('types', resp.data)
        commit('setDeviceTypes', resp.data)
      })
    },
  },
  modules: {
  }
})
