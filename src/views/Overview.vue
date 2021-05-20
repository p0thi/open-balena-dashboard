<template>
<div class="overview">
  <vs-navbar shadow square center-collapsed >
    <template #left>
      <vs-button @click="activeSidebar = !activeSidebar" flat icon>
        <i class='bx bx-menu'></i>
      </vs-button>
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


    <vs-sidebar-item id="about" to="/devices">
      <template #icon>
        <i class="bx bx-home"></i>
      </template>
      Devices
    </vs-sidebar-item>

    <div class="sidebar-descriptor">
      Application displays
    </div>

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
import {mapActions, mapMutations} from "vuex";

export default {
  name: "Overview",
  mounted() {
    this.fetchDeviceTypes()
    this.fetchingTimer = setInterval(this.fetchApplications, 5000);
    this.fetchApplications()
  },
  destroyed() {
    clearInterval(this.fetchingTimer)
  },
  methods: {
    ...mapActions({
      fetchApplications: 'fetchApplications',
      fetchDeviceTypes: 'fetchDeviceTypes',
      checkLoginStatus: 'checkLoginStatus'
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
  data () {
    return {
      active: 'home',
      activeSidebar: false,
      fetchingTimer: undefined
    }
  }
}
</script>

<style scoped>
.overview {
  padding-top: 3rem;
}
</style>
