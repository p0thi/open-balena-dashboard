<template>
  <div>
    <div class="custom-tile" @click.stop="showDetailsDialog = !showDetailsDialog">
      <h2>{{ details['device_name'] }}</h2>
      <div class="grid">

        <vs-row justify="space-between">
          <vs-col w="6">Online / VPN Connected:</vs-col>
          <vs-col class="right" w="6">
            <span>
              <i class="bx bx-check-circle bx-sm green" v-if="details['is_online']"></i>
              <i class="bx bx-x-circle bx-sm red" v-else></i>
            </span>
            <span>
              <i class="bx bx-check-circle bx-sm green" v-if="details['is_connected_to_vpn']"></i>
              <i class="bx bx-x-circle bx-sm red" v-else></i>
            </span>
          </vs-col>
        </vs-row>

        <vs-row justify="space-between">
          <vs-col w="6">IP Adress:</vs-col>
          <vs-col class="right" w="6">{{ details['ip_address'] }}</vs-col>
        </vs-row>

        <vs-row justify="space-between">
          <vs-col w="6">Status / progress:</vs-col>
          <vs-col class="right" w="6">{{ details['overall_status']}} {{details['overall_progress'] ? '/' : ''}} {{ details['overall_progress'] }}</vs-col>
        </vs-row>

        <vs-row justify="space-between">
          <vs-col w="6">OS variant:</vs-col>
          <vs-col class="right" w="6">{{ details['os_variant'] }}</vs-col>
        </vs-row>

        <vs-row justify="space-between">
          <vs-col w="6">Last connectivity event:</vs-col>
          <vs-col class="right" w="6">{{ details['last_connectivity_event'] | moment("DD.MM.YYYY, HH:mm:ss") }}</vs-col>
        </vs-row>

        <vs-row justify="space-between">
          <vs-col w="6">Created at:</vs-col>
          <vs-col class="right" w="6">{{ details['created_at'] | moment("DD.MM.YYYY, HH:mm:ss") }}</vs-col>
        </vs-row>

      </div>
    </div>
    <vs-dialog overflow-hidden scroll full-screen v-model="showDetailsDialog">
      <template #header>
        <h4>{{ details['device_name'] }}</h4>
        <vs-button @click="showEditNameDialog = !showEditNameDialog" icon flat>
          <i class="bx bx-edit"></i>
        </vs-button>
      </template>
      <vs-navbar id="device-details-navbar" v-model="navbarItem">
        <vs-navbar-item :active="navbarItem === `${details.uuid}settings`" :id="`${details.uuid}settings`">
          Settings
        </vs-navbar-item>
        <vs-navbar-item :active="navbarItem === `${details.uuid}env`" :id="`${details.uuid}env`">
          Environment Variables
        </vs-navbar-item>
      </vs-navbar>
      <div v-if="getSelectedDevice">
        <vs-row v-if="navbarItem === `${details.uuid}settings`">
          <vs-col lg="6" sm="12" style="padding: 1.5%">
            <div class="center">
              <vs-button @click="rebootDevice" :upload="rebooting" border>Reboot Device</vs-button>
              <vs-button @click="restartDevice" :upload="restarting" border>Restart All Services</vs-button>
            </div>
            <hr>
            <div class="detail-list">
              <vs-row justify="space-around">
                <vs-col w="3" class="detail-container">
                  <div>STATUS</div>
                  <div v-if="details['is_online']">
                    <i class="bx bx-check-circle green"></i>&nbsp;Online
                  </div>
                  <div v-else>
                    <i class="bx bx-x-circle red"></i>&nbsp;Offline
                  </div>
                </vs-col>

                <vs-col w="3" class="detail-container">
                  <div>UUID</div>
                  <div>{{ details['uuid'].substring(0, 7) }}</div>
                </vs-col>

                <vs-col w="3" class="detail-container">
                  <div>TYPE</div>
                  <div>
                    <span style="vertical-align: middle"><img class="device-type-image" :src="deviceType.logo" alt=""></span>
                    <span style="vertical-align: middle">&nbsp;{{deviceType.name}}</span>
                  </div>
                </vs-col>
              </vs-row>

              <vs-row justify="space-around">
                <vs-col w="3" class="detail-container" v-if="details['is_online']">
                  <div>ONLINE SINCE</div>
                  <div>{{getSelectedDevice['last_connectivity_event'] | moment('calendar')}}</div>
                </vs-col>
                <vs-col w="3" class="detail-container" v-else>
                  <div>LAST SEEN (VPN)</div>
                  <div>{{getSelectedDevice['last_vpn_event'] | moment('calendar')}}</div>
                </vs-col>

                <vs-col w="3" class="detail-container">
                  <div>HOST OS VERSION</div>
                  <div>
                    <div>{{getSelectedDevice['os_version']}}</div>
                    <div class="chip">{{getSelectedDevice['os_variant']}}</div>
                  </div>
                </vs-col>

                <vs-col w="3" class="detail-container">
                  <div>SUPERVISOR VERSION</div>
                  <div>{{getSelectedDevice['supervisor_version']}}</div>
                </vs-col>
              </vs-row>

              <vs-row justify="space-around">
                <vs-col w="3" class="detail-container" v-if="details['is_online']">
                  <div>CURRENT RELEASE</div>
                  <div>{{currentRelease.commit.substring(0, 7)}}</div>
                </vs-col>
                <vs-col w="3" class="detail-container" v-else>
                  <div>LAST SEEN (VPN)</div>
                  <div>{{getSelectedDevice['last_vpn_event'] | moment('calendar')}}</div>
                </vs-col>

                <vs-col w="3" class="detail-container">
                  <div>LOCAL IP ADDRESS</div>
                  <div>
                    <div>{{getSelectedDevice['ip_address']}}</div>
                  </div>
                </vs-col>

                <vs-col w="3" class="detail-container">
                  <div>MAC ADDRESS</div>
                  <div>{{getSelectedDevice['mac_address']}}</div>
                </vs-col>
              </vs-row>

            </div>
            <hr>
            <vs-table>
              <template #thead>
                <vs-tr>
                  <vs-th>Service</vs-th>
                  <vs-th>Status</vs-th>
                  <vs-th></vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr v-for="(service, name, i) in sortedServices" :key="i" :data="service[0]">
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
          <vs-col lg="6" sm="12" style="padding: 1.5%">
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
            <div class="log-container">
              <h4>Logs</h4>
              <div ref="logContainer">
                <div v-for="(line, index) in logs" :key="`line${index}`">
                  <span class="timestamp">{{ line.timestamp | moment("DD.MM.YY - HH:mm:ss") }}:</span>
                  <span class="service" :style="`background-color: ${colors[line.serviceId]}`">{{ getServiceNameByServiceId(line.serviceId) }}</span>
                  <span class="message" :class="{'is-system': line.isSystem, 'is-error': line.isStdErr}">{{ line.message }}</span>
                </div>
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
              <vs-button @click="saveEnv">Save</vs-button>
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
    rebootDevice () {
      this.rebooting = true
      this.$balena.models.device.reboot(this.details.uuid).finally(() => {
        this.rebooting = false
      })
    },
    restartDevice () {
      const promises = []
      this.restarting = true
      for (const value of Object.values(this.sortedServices)) {
        for (const service of value) {
          promises.push(this.$balena?.models.device.restartService(this.details.uuid, service['image_id']))
        }
      }
      Promise.allSettled(promises).then(() => {
        this.restarting = false
      })
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
    deviceType() {
      return this.getSelectedDevice['is_of__device_type'][0]
    },
    currentRelease() {
      return this.getSelectedDevice['is_running__release'][0]
    },
    sortedEnvVars() {
      if (!this.envVars) return []
      return [...this.envVars].sort((a, b) => {
        return this.$moment(a['created_at']) - this.$moment(b['created_at'])
      })
    },
    sortedServices() {
      return Object.keys(this.getSelectedDevice['current_services']).sort().reduce(
          (obj, key) => {
            obj[key] = this.getSelectedDevice['current_services'][key];
            return obj;
          },
          {}
      )
    }
  },
  props: {
    details: {required: true}
  },
  data () {
    return {
      restarting: false,
      rebooting: false,

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
.chip {
  border-radius: .7em;
  padding: .15em .5em;
  background-color: #8bbeff;
  width: fit-content;
}
#device-details-navbar {
  position: relative;
  margin-bottom: .5rem;
}
.device-type-image {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  object-position: center center;
}
.right {
  text-align: end;
}
.grid {
  > * {
    margin: .5rem 0;
  }
}

i {
  &.green {
    color: green;
  }
  &.red {
    color: red;
  }
}
hr {
  margin: 2rem 7%;
  height: 1px;
  border: none;
  background-color: #566572;
}

.detail-list {
  > * {
    margin: 1.5em 0;
  }
  .detail-container {
    & > *:nth-child(1) {
      font-weight: bolder;
      margin-bottom: .25em;
    }
    & > *:last-child {
      font-size: .8em;
    }
  }
}
</style>
<style lang="scss">
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.vs-dialog--scroll .vs-dialog__content {
  max-height: 80vh !important;
}
.service-list-name {
  color: white;
  font-size: 1.2rem;
  margin: .1rem .5rem;
  text-align: center;
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
  > div {
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
}
</style>
