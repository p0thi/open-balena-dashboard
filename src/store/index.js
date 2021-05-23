import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedInStatus: 'loading',
    api_url: null,
    applications: null,
    deviceTypes: null,
    selectedApp: null,
    selectedAppDevices: null,
    selectedDevice: null
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
      Vue.set(state, 'selectedApp', app)
    },
    setSelectedAppDevices(state, devices) {
      Vue.set(state, 'selectedAppDevices', devices)
    },
    setSelectedDevice(state, device) {
      Vue.set(state, 'selectedDevice', device)
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
      if (!state.applications || !state.selectedApp) return null
      return state.applications?.find(item => item.uuid === state.selectedApp.uuid)
    },
    getSelectedAppDevices: state => {
      return state .selectedAppDevices
    },
    getApiUrl: state => {
      return state.api_url
    },
    getSelectedDevice: state => {
      return state.selectedDevice
    }
  },
  actions: {
    checkLoginStatus({commit}) {
      this.$app.$balena?.auth.isLoggedIn().then(val => {
        commit('setLoggedInStatus', val)
      })
    },
    fetchApplications({commit}) {
      this.$app.$balena?.models.application.getAll({
        $expand: {
          is_for__device_type: {
            $expand: ['is_of__cpu_architecture']
          },
          owns__device: {
            $select: ['overall_status', 'device_name']
          }
        }
      }).then(resp => {
        commit('setApplications', resp)
      })
    },
    fetchDevicesOfSelectedApp({state, commit}) {
      if (!state.selectedApp) return
      this.$app.$balena?.models.device.getAllByApplication(state.selectedApp.id, {
        $expand: 'is_running__release'
      }).then(res => {
        commit('setSelectedAppDevices', res)
      })
    },
    fetchDevice({commit}, uuid) {
      this.$app.$balena?.models.device.getWithServiceDetails(uuid, {
        $expand: ['is_of__device_type', 'is_running__release']
      }).then(res => {
        console.log('fetching device...')
        commit('setSelectedDevice', res)
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
