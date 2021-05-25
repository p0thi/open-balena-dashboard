<template>
  <div v-if="!!getSelectedApp" class="grid">
    <vs-navbar :shadow="false" class="behind relative mt-2" v-model="activeNav">
      <vs-navbar-item :active="activeNav === 'devices'" id="devices">
        Devices
      </vs-navbar-item>
      <vs-navbar-item :active="activeNav === 'env'" id="env">
        Environment variables
      </vs-navbar-item>
    </vs-navbar>
    <vs-row v-if="activeNav === 'devices'">
      <vs-col lg="4" sm="6" xs="12" vs-justify="center" vs-align="center" v-for="device in sortedDevices" :key="device.uuid">
        <DeviceTile :details="device"></DeviceTile>
      </vs-col>
    </vs-row>
    <vs-row v-else justify="center" class="mt-2">
      <vs-col w="11">
          <vs-table striped>
            <template #thead>
              <vs-tr>
                <vs-th>
                  Name
                </vs-th>
                <vs-th>
                  Value
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
              <vs-tr v-for="envVar in sortedEnvVars" :key="envVar.id" :data="envVar">
                <vs-td>{{envVar.name}}</vs-td>
                <vs-td edit @click="envEditObject.edit = envVar; envEditObject.editProp = 'value'; envEditObject.editActive = true">
                  <i class="bx bx-edit bx-xs vertical-align-middle"></i>
                  <span class="vertical-align-middle"> {{envVar.value}}</span>
                </vs-td>
                <vs-td>
                  <vs-button @click="removeEnv(envVar)" icon flat><i class="bx bx-trash"></i></vs-button>
                </vs-td>
                <vs-td>
                  {{envVar['created_at'] | moment('DD.MM.YYYY - HH:mm:ss')}}
                </vs-td>
                <vs-td>
                  {{envVar['modified_at'] | moment('DD.MM.YYYY - HH:mm:ss')}}
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td><vs-input v-model="newEnvObject.name" label-placeholder="New variable name"></vs-input></vs-td>
                <vs-td><vs-input v-model="newEnvObject.value" label-placeholder="New variable value"></vs-input></vs-td>
                <vs-td><vs-button @click="saveNewEnv" icon flat><i class="bx bx-save"></i><span>Speichern</span></vs-button></vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-dialog blur v-model="envEditObject.editActive">
            <template #header>
              Edit Prop "{{envEditObject.editProp}}"
            </template>
            <vs-input @keypress.enter="saveEnv" v-if="!!envEditObject.editProp" v-model="envEditObject.edit[envEditObject.editProp]"></vs-input>
            <vs-button @click="saveEnv">Save</vs-button>
          </vs-dialog>

      </vs-col>
    </vs-row>
  </div>
  <div v-else></div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DeviceTile from "@/components/DeviceTile";

export default {
  name: "Devices",
  components: {
    DeviceTile
  },
  watch: {
    activeNav(newVal) {
      if (newVal === 'env') {
        this.fetchEnvVars()
      }
    }
  },
  created() {
    if (!this.getSelectedApp) {
      this.$router.push('home')
    }
    this.interval = setInterval(this.fetchDevicesOfSelectedApp, 20000)
    this.fetchDevicesOfSelectedApp()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      fetchDevicesOfSelectedApp: 'fetchDevicesOfSelectedApp'
    }),
    fetchEnvVars() {
      this.$balena.models.application.envVar.getAllByApplication(this.getSelectedApp.id).then(res => {
        console.log(res)
        this.envVars = res
      })
    },
    removeEnv(env) {
      this.$balena.models.application.envVar.remove(this.getSelectedApp.id, env.name).then(() => {
        this.fetchEnvVars()
      })
    },
    saveNewEnv() {
      this.$balena.models.application.envVar.set(this.getSelectedApp.id, this.newEnvObject.name, this.newEnvObject.value).then(() => {
        this.fetchEnvVars()
        this.newEnvObject.name = undefined
        this.newEnvObject.value = undefined
      })
    },
    saveEnv() {
      this.envEditObject.editActive = false
      this.fetchingEnvVars = true
      this.$balena.models.application.envVar.set(this.getSelectedApp.id, this.envEditObject.edit.name, this.envEditObject.edit.value).then(() => {
        this.fetchEnvVars()
      })
    },
  },
  computed: {
    ...mapGetters({
      getSelectedAppDevices: 'getSelectedAppDevices',
      getSelectedApp: 'getSelectedApp'
    }),
    sortedDevices() {
      if (!this.getSelectedAppDevices) return null
      return [...this.getSelectedAppDevices].sort((a, b) => {
        if (a['device_name'] < b['device_name']) return -1
        if (a['device_name'] > b['device_name']) return 1
        return 0
      })
    },
    sortedEnvVars() {
      if (!this.envVars) return []
      return [...this.envVars].sort((a, b) => {
        return this.$moment(a['created_at']) - this.$moment(b['created_at'])
      })
    },
  },
  data () {
    return {
      interval: undefined,
      activeNav: 'devices',
      envVars: undefined,
      envEditObject: {
        editActive: false,
        edit: null,
        editProp: undefined
      },
      newEnvObject: {
        name: undefined,
        value: undefined
      },
    }
  }
}
</script>

<style scoped>
.behind {
  z-index: 0;
}
.relative {
  position: relative;
}
</style>
