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

<style lang="scss">
.vertical-align-middle {
  vertical-align: middle;
}
.mt-2 {
  margin-top: 2em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: $dark;
}
.custom-tile {
  margin: 2rem;
  padding: 1rem;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
  transition: 400ms, ease;
  transition-property: transform, box-shadow;
  border-radius: 20px;

  &:hover {
   box-shadow: none;
   transform: translate(0, 5px);
 }
}
</style>
