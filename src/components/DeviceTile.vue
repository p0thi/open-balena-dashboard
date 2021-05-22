<template>
  <div>
    <vs-card @click="showDetailsDialog = !showDetailsDialog">
      <template #title>
        <h2>{{ details['device_name'] }}</h2>
      </template>
      <template #text>
        <p>Online/VPN Connected: {{ details['is_online'] }}, {{ details['is_connected_to_vpn'] }}</p>
        <p>IP Adress: {{ details['ip_address'] }}</p>
        <p>Status / progress: {{ details['overall_status']}} / {{ details['overall_progress'] }}</p>
        <p>UUID: {{ details['uuid'] }}</p>
        <p>Last connectivity event: {{ details['last_connectivity_event'] | moment("DD.MM.YYYY, HH:mm:ss") }}</p>
        <p>Created at: {{ details['created_at'] | moment("DD.MM.YYYY, HH:mm:ss") }}</p>
        <vs-button @click="restartDevice">Restart</vs-button>
      </template>
    </vs-card>
    <vs-dialog overflow-hidden scroll full-screen v-model="showDetailsDialog">
      <template #header>
        <h4>{{ details['device_name'] }}</h4>
        <vs-button @click="showEditNameDialog = !showEditNameDialog" icon flat>
          <i class="bx bx-edit"></i>
        </vs-button>
      </template>
      <div v-if="getSelectedDevice">
        <vs-navbar id="device-details-navbar" v-model="navbarItem">
          <vs-navbar-item :active="navbarItem === `${details.uuid}settings`" :id="`${details.uuid}settings`">
            Settings
          </vs-navbar-item>
          <vs-navbar-item :active="navbarItem === `${details.uuid}env`" :id="`${details.uuid}env`">
            Environment Variables
          </vs-navbar-item>
        </vs-navbar>
        <vs-row v-if="navbarItem === `${details.uuid}settings`">
          <vs-col lg="6" sm="12">
            <vs-table>
              <template #thead>
                <vs-tr>
                  <vs-th>Service</vs-th>
                  <vs-th>Status</vs-th>
                  <vs-th></vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr v-for="(service, name, i) in getSelectedDevice['current_services']" :key="i" :data="service[0]">
                  <vs-td>
                    <div class="service-list-name" :style="`background-color: ${colors[service[0]['service_id']]}`">
                      {{name}}
                    </div></vs-td>
                  <vs-td>
                    <span>
                      <i v-if="service[0].status === 'Running'" class="bx bx-check-circle" style="color: green"></i>
                      <i v-else class="bx bx-error-circle" style="color: red"></i>
                    </span>
                    <span>&nbsp;{{service[0].status}}</span>
                  </vs-td>
                  <vs-td>
                    <vs-row>
                      <vs-button @click="startService(service[0].service_id)" icon flat :disabled="service[0].status === 'Running'"><i class="bx bx-play"></i></vs-button>
                      <vs-button @click="stopService(service[0].service_id)" icon flat :disabled="service[0].status !== 'Running'"><i class="bx bx-stop"></i></vs-button>
                      <vs-button @click="restartService(service[0].service_id)" icon flat :disabled="service[0].status !== 'Running'"><i class="bx bx-refresh"></i></vs-button>
                    </vs-row>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vs-col>
          <vs-col lg="6" sm="12">
            <div class="hardware-stats">
              <vs-row class="spacing-row">

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>CPU</span>
                    <span>{{getSelectedDevice['cpu_usage']}}%</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${getSelectedDevice['cpu_usage']}%`"></div>
                  </div>
                </vs-col>

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>Temperature</span>
                    <span>~{{getSelectedDevice['cpu_temp']}}°C</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${getSelectedDevice['cpu_temp']}%`"></div>
                  </div>
                </vs-col>

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>Memory</span>
                    <span>{{getSelectedDevice['memory_usage']}} MB / {{(getSelectedDevice['memory_total'] / 1000).toFixed(1)}} GB</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${getSelectedDevice['memory_usage'] / getSelectedDevice['memory_total'] * 100}%`"></div>
                  </div>
                </vs-col>

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>Storage</span>
                    <span>{{(getSelectedDevice['storage_usage'] / 1000).toFixed(1)}} GB/{{(getSelectedDevice['storage_total'] / 1000).toFixed(1)}} GB</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${getSelectedDevice['storage_usage'] / getSelectedDevice['storage_total'] * 100}%`"></div>
                  </div>
                </vs-col>


              </vs-row>
            </div>
            <div class="log-container" ref="logContainer">
              <div v-for="(line, index) in logs" :key="`line${index}`">
                <span class="timestamp">{{ line.timestamp | moment("DD.MM.YY - HH:mm:ss") }}:</span>
                <span class="service" :style="`background-color: ${colors[line.serviceId]}`">{{ getServiceNameByServiceId(line.serviceId) }}</span>
                <span class="message" :class="{'is-system': line.isSystem, 'is-error': line.isStdErr}">{{ line.message }}</span>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <vs-row v-else-if="navbarItem === `${details.uuid}env`">
          <vs-col>
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
                    {{envVar.value}}
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
            </vs-dialog>
          </vs-col>
        </vs-row>
      </div>
    </vs-dialog>
    <vs-dialog blur v-model="showEditNameDialog">
      <vs-input v-model="details['device_name']"></vs-input>
      <vs-button @click="saveName">Save</vs-button>
    </vs-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "DeviceTile",
  watch: {
    showDetailsDialog (newVal) {
      if (newVal) {
        this.startShowingDetails()
      }
      else {
        this.stopShowingDetails()
      }
    },
    navbarItem (newVal) {
      if (newVal?.endsWith('env')) {
        this.fetchEnvVars()
      }
    }
  },
  created() {
    this.navbarItem = `${this.details.uuid}settings`
  },
  updated() {
    if (this.$refs.logContainer)
      this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight
  },
  destroyed() {
    this.logger?.unsubscribe()
  },
  methods: {
    ...mapActions({
      fetchDevice: 'fetchDevice',
    }),
    ...mapMutations({
      setSelectedDevice: 'setSelectedDevice'
    }),
    startShowingDetails() {
      this.setSelectedDevice(null)
      this.interval = setInterval(() => {
        this.fetchDevice(this.details.uuid)
      }, 5000)
      this.fetchDevice(this.details.uuid)
      this.logs = []
      this.$balena?.logs.subscribe(this.details.uuid, {count: 150}).then(logger => {
        this.logger = logger
        logger.on('line', line => {
          if (this.$refs.logContainer)
            this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight
          this.logs.push(line)
        })
      })
    },
    stopShowingDetails() {
      this.logger?.unsubscribe()
      clearInterval(this.interval)
    },
    restartDevice () {
      for (const value of Object.values(this.details['current_services'])) {
        for (const service of value) {
          this.$balena?.models.device.restartService(this.details.uuid, service['image_id'])
        }
      }
    },
    startService(imageId) {
      this.$balena.models.device.startService(this.details.uuid, imageId)
    },
    stopService(imageId){
      this.$balena.models.device.stopService(this.details.uuid, imageId)
    },
    restartService(imageId){
      this.$balena.models.device.restartService(this.details.uuid, imageId)
    },
    getServiceNameByServiceId(id) {
      for (const [key, value] of Object.entries(this.getSelectedDevice['current_services'])) {
        for (const service of value) {
          if (service['service_id'] === id) {
            return key
          }
        }
      }
      return null
    },
    saveName() {
      this.$balena.models.device.rename(this.details.uuid, this.details['device_name']).then(() => {
        this.showEditNameDialog = false
      })
    },
    fetchEnvVars() {
      this.fetchingEnvVars = true
      this.$balena.models.device.envVar.getAllByDevice(this.details.uuid, {}).then(res => {
        this.envVars = res
      })
    },
    saveEnv() {
      this.envEditObject.editActive = false
      this.fetchingEnvVars = true
      this.$balena.models.device.envVar.set(this.details.uuid, this.envEditObject.edit.name, this.envEditObject.edit.value).then(() => {
        this.fetchEnvVars()
      })
    },
    removeEnv(env) {
      this.$balena.models.device.envVar.remove(this.details.uuid, env.name).then(() => {
        this.fetchEnvVars()
      })
    },
    saveNewEnv() {
      this.$balena.models.device.envVar.set(this.details.uuid, this.newEnvObject.name, this.newEnvObject.value).then(() => {
        this.fetchEnvVars()
        this.newEnvObject.name = undefined
        this.newEnvObject.value = undefined
      })
    }
  },
  computed: {
    ...mapGetters({
      getSelectedDevice: 'getSelectedDevice'
    }),
    sortedEnvVars() {
      if (!this.envVars) return []
      return [...this.envVars].sort((a, b) => {
        return this.$moment(a['created_at']) - this.$moment(b['created_at'])
      })
    }
  },
  props: {
    details: {required: true}
  },
  data () {
    return {
      interval: undefined,
      showDetailsDialog: false,
      showEditNameDialog: false,
      envVars: undefined,
      fetchingEnvVars: false,
      logs: [],
      envEditObject: {
        editActive: false,
        edit: null,
        editProp: undefined
      },
      newEnvObject: {
        name: undefined,
        value: undefined
      },
      navbarItem: undefined,
      logger: undefined,
      colors: ['#0C059A', '#B36E2E', '#C0BC0D', '#9F4081', '#2363CC', '#EB5E7E', '#AAA723', '#D286A8', '#318747']
    }
  }
}
</script>

<style lang="scss" scoped>
#device-details-navbar {
  position: relative;
  margin-bottom: .5rem;
}
</style>
<style lang="scss">
.vs-dialog--scroll .vs-dialog__content {
  max-height: 80vh !important;
}
.service-list-name {
  color: white;
  font-size: 1.2rem;
}

.spacing-row {
  >* {
    padding: .5rem;
  }
}
.hardware-stats {
  .hardware-stats-text {
    display: flex;
    justify-content: space-between;
  }

  .progress-background {
    width: 100%;
    height: 1rem;
    background-color: lightgrey;
    border-radius: .4rem;
    margin: .7rem 0;

    .progress-status {
      height: 100%;
      background-color: #00ba00;
      border-radius: .4rem;
    }
  }
}

.log-container {
  text-align: start;
  background-color: #2c3e50;
  height: 30vh;
  overflow: auto;
  line-height: 1.3rem;

  .timestamp {
    color: grey;
    letter-spacing: .05rem;
  }
  .service {
    color: white;
    padding: .3rem;
    margin: 0 .5rem;
  }
  .message {
    color: #6ead21;
  }
  .is-system {
    color: #cd9020;
  }
  is-error {
    color: #de1f1f;
  }
}
</style>
