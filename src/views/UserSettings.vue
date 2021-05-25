<template>
<div>
  <vs-row class="mt-2" justify="center">
    <vs-col w="11">
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th>
              Name
            </vs-th>
            <vs-th>
              Description
            </vs-th>
            <vs-th>
              Key
            </vs-th>
            <vs-th>
              Actions
            </vs-th>
            <vs-th>
              Created At
            </vs-th>
            <vs-th>
              Last Modified At
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="apiKey in apiKeys" :key="apiKey.id" :data="apiKey">
            <vs-td edit @click="keyEditObject.edit = apiKey; keyEditObject.editProp = 'name'; keyEditObject.editActive = true">
              <i class="bx bx-edit bx-xs vertical-align-middle"></i>
              <span class="vertical-align-middle"> {{apiKey.name}}</span>
            </vs-td>
            <vs-td edit @click="keyEditObject.edit = apiKey; keyEditObject.editProp = 'description'; keyEditObject.editActive = true">
              <i class="bx bx-edit bx-xs vertical-align-middle"></i>
              <span class="vertical-align-middle"> {{apiKey.description}}</span>
            </vs-td>
            <vs-td>{{apiKey.key}}</vs-td>
            <vs-td>
              <vs-button @click="deleteKey(apiKey)" icon flat><i class="bx bx-trash"></i></vs-button>
            </vs-td>
            <vs-td>
              {{apiKey['created_at'] | moment('DD.MM.YYYY - HH:mm:ss')}}
            </vs-td>
            <vs-td>
              {{apiKey['modified_at'] | moment('DD.MM.YYYY - HH:mm:ss')}}
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td><vs-input v-model="newKeyObject.name" label-placeholder="New variable name"></vs-input></vs-td>
            <vs-td><vs-input v-model="newKeyObject.value" label-placeholder="New variable value"></vs-input></vs-td>
            <vs-td><vs-button @click="createKey" icon flat><i class="bx bx-save"></i><span>Speichern</span></vs-button></vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-col>
  </vs-row>

  <vs-dialog blur v-model="keyEditObject.editActive">
    <template #header>
      Edit Prop "{{keyEditObject.editProp}}"
    </template>
    <vs-input @keypress.enter="updateKey" v-if="!!keyEditObject.editProp" v-model="keyEditObject.edit[keyEditObject.editProp]"></vs-input>
    <vs-button @click="updateKey">Save</vs-button>
  </vs-dialog>
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
    },
    updateKey() {
      console.log(this.keyEditObject.edit.id, this.keyEditObject.edit)
      this.$balena.models.apiKey.update(this.keyEditObject.edit.id, this.keyEditObject.edit).finally(() => {
        this.fetchKeys()
        this.keyEditObject.editActive = false
      })
    }
  },
  data() {
    return {
      apiKeys: undefined,
      keyEditObject: {
        editActive: false,
        edit: null,
        editProp: undefined
      },
      newKeyObject: {
        name: undefined,
        description: undefined
      },
    }
  }
}
</script>

<style scoped>

</style>
