<template>
  <div class="grid">
    <vs-row align="center" justify="center" style="height: 100vh">
      <vs-col lg="2" sm="6" xs="12">

        <vs-card>
          <template #title>
            <h3>Login</h3>
          </template>
          <template #img>
            <img id="logo" src="../assets/full_logo.png" alt="">
          </template>
          <template #text>
            <div class="content-inputs">
              <div v-if="useToken">
                <vs-input v-model="token" type="password" label-placeholder="API Token" />
              </div>
              <div v-else>
                <vs-input v-model="email" label-placeholder="E-Mail" />
                <vs-input @keypress.enter="login" v-model="password" type="password" label-placeholder="Password" />
              </div>
              <vs-input v-model="api" type="url" label-placeholder="API Url" />
            </div>
            <vs-checkbox v-model="useToken">Use token to login</vs-checkbox>
            <vs-checkbox v-model="rememberEmail">remember E-Mail</vs-checkbox>
            <vs-button @click="login" primary>Login</vs-button>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {getSdk} from 'balena-sdk'

export default {
  name: "Login",
  created() {
    this.api = this.apiUrl
    this.email = localStorage.getItem('user_email')
    if (this.email) {
      this.rememberEmail = true
    }
    this.useToken = !!localStorage.getItem('use_token_login')
  },
  methods: {
    ...mapMutations({
      setApiUrl: 'setApiUrl',
      setLoggedInStatus: 'setLoggedInStatus'
    }),
    ...mapActions({
      checkLoginStatus: 'checkLoginStatus'
    }),
    login() {
      const balena = getSdk({
        apiUrl: this.api,
        isBrowser: true,
        debug: true
      })
      this.$balena = balena

      if (this.rememberEmail) {
        localStorage.setItem('user_email', this.email)
      }
      else {
        localStorage.removeItem('user_email')
      }

      if (this.useToken) {
        localStorage.setItem('use_token_login', this.useToken)
      }
      else {
        localStorage.removeItem('user_email')
      }

      const loginPromise = this.useToken ?
          this.$balena?.auth.loginWithToken(this.token) :
          this.$balena?.auth.login({email: this.email, password: this.password})

      loginPromise.then(() => {
        this.setApiUrl(this.api)
        this.setLoggedInStatus(true)
        this.$balena?.models.application.getAllWithDeviceServiceDetails().then(resp => {
          console.log("apps", resp)
        })
      }).catch(e => console.error(e))
    }
  },
  computed: {
    ...mapGetters({
      apiUrl: 'getApiUrl'
    })
  },
  data () {
    return {
      email: undefined,
      rememberEmail: false,
      password: undefined,
      token: undefined,
      api: undefined,
      useToken: false
    }
  }
}
</script>

<style scoped lang="scss">
#logo {
  width: 80%;
  padding: 1em 0;
}
</style>

<style>
.vs-input-content {
  margin: .7rem;
}
</style>
