<template>
  <div class="grid">
    <vs-row justify="center">
      <vs-col w="2">

        <vs-card type="1">
          <template #title>
            <h3>Login</h3>
          </template>
          <template #text>
            <div class="center content-inputs">
              <vs-input v-model="email" label-placeholder="E-Mail" />
              <vs-input v-model="password" type="password" label-placeholder="Password" />
              <vs-input v-model="api" type="url" label-placeholder="API Url" />
            </div>
          </template>
          <template #buttons>
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
  },
  methods: {
    ...mapMutations({
      setApiUrl: 'setApiUrl'
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

      this.$balena?.auth.login({email: this.email, password: this.password}).then(() => {
        this.setApiUrl(this.api)
        this.checkLoginStatus()
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
      api: undefined
    }
  }
}
</script>

<style>
.vs-input-content {
  margin: .7rem;
}
</style>
