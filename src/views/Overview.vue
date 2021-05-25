<template>
<div class="overview">
  <vs-navbar shadow square center-collapsed >
    <template #left>
      <vs-button @click="activeSidebar = !activeSidebar" flat icon>
        <i class='bx bx-menu'></i>
      </vs-button>
    </template>
    <template #right>
      <img id="navbar-logo" src="../assets/full_logo.svg" alt="">
    </template>
  </vs-navbar>
  <vs-sidebar
      absolute
      v-model="active"
      :open.sync="activeSidebar"
  >
    <div class="sidebar-descriptor">
      Main Links
    </div>
    <vs-sidebar-item id="home" to="/">
      <template #icon>
        <i class="bx bx-home"></i>
      </template>
      Home
    </vs-sidebar-item>

    <div v-if="!!selectedApp">
      <div class="sidebar-descriptor">
        Application {{selectedApp['app_name']}}
      </div>

      <vs-sidebar-item id="about" to="/devices">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Devices
      </vs-sidebar-item>
    </div>

    <div class="sidebar-descriptor">
      User
    </div>

    <vs-sidebar-item id="user" to="/user">
      <template #icon>
        <i class="bx bx-user"></i>
      </template>
      User
    </vs-sidebar-item>

    <template #footer>
      <vs-row justify="space-between">
        <vs-button @click="logout" flat icon>
          <i class="bx bx-log-out"></i>
        </vs-button>
      </vs-row>
    </template>
  </vs-sidebar>
  <router-view/>
</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "Overview",
  mounted() {
    this.fetchDeviceTypes()
    this.fetchingTimer = setInterval(this.fetchApplications, 45000);
    this.fetchApplications()
  },
  destroyed() {
    clearInterval(this.fetchingTimer)
  },
  methods: {
    ...mapActions({
      fetchApplications: 'fetchApplications',
      fetchDeviceTypes: 'fetchDeviceTypes',
      checkLoginStatus: 'checkLoginStatus',
      fetchDevicesOfSelectedApp: 'fetchDevicesOfSelectedApp'
    }),
    ...mapMutations({
      setLoggedInStatus: 'setLoggedInStatus'
    }),
    logout() {
      this.$balena.auth.logout()
      this.setLoggedInStatus(false)
      this.checkLoginStatus()
    }
  },
  computed: {
    ...mapGetters({
      selectedApp: 'getSelectedApp'
    })
  },
  data () {
    return {
      active: 'home',
      activeSidebar: false,
      fetchingTimer: undefined
    }
  }
}
</script>

<style scoped lang="scss">
#navbar-logo {
  margin: .4em;
  max-height: 2.3em;
}
.overview {
  padding-top: 3rem;
}
.sidebar-descriptor {
  margin-left: 1.3rem;
  margin-top: .9rem;
  font-weight: bold;
}
</style>
