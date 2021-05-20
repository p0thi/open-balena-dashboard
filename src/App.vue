<template>
  <div id="app">
    <Login v-if="getLoggedInStatus !== 'logged_in'"></Login>
    <Overview v-else></Overview>
  </div>
</template>
<script>
import Login from "@/views/Login";
import {mapActions, mapGetters} from "vuex";
import Overview from "@/views/Overview";

export default {
  components: {
    Login,
    Overview
  },
  created() {
    this.checkLoginStatus()
  },
  methods: {
    ...mapActions({
      checkLoginStatus: 'checkLoginStatus'
    })
  },
  computed: {
    ...mapGetters({
      authToken: 'authToken',
      getLoggedInStatus: 'getLoggedInStatus'
    })
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.sidebar-descriptor {
  padding: 1rem;
  font-weight: bold;
  color: rgba(var(--vs-text), 1);
}
</style>
