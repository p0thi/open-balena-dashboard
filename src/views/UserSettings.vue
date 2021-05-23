<template>
<div>
  <div v-for="key in apiKeys" :key="key.id">
    <div>{{key.name}}</div>
    <div>{{key.key}}</div>
    <vs-button @click="deleteKey(key)">Delete</vs-button>
  </div>
  <vs-input @keypress.enter="createKey" v-model="newKeyName"></vs-input>
</div>
</template>

<script>
export default {
  name: "UserSettings",
  created() {
    this.fetchKeys()
  },
  methods: {
    createKey () {
      this.$balena.models.apiKey.create(this.newKeyName).then(res => {
        console.log('key created', res)
        this.fetchKeys()
      })
    },
    fetchKeys() {
      this.$balena.models.apiKey.getAll().then(res => {
        console.log('api keys', res)
        this.apiKeys = res
      })
    },
    deleteKey(key) {
      this.$balena.models.apiKey.revoke(key.id).then(() => {
        this.fetchKeys()
      })
    }
  },
  data() {
    return {
      newKeyName: undefined,
      apiKeys: undefined
    }
  }
}
</script>

<style scoped>

</style>
