<template>
  <div class="center">
    <vs-card @click="showDialog = !showDialog">
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
    <vs-dialog overflow-hidden scroll full-screen v-model="showDialog">
      <template #header>
        <h4>{{ details['device_name'] }}</h4>
        <vs-button @click="showEditNameDialog = !showEditNameDialog" icon flat>
          <i class="bx bx-edit"></i>
        </vs-button>
      </template>
      <div>
        <vs-row>
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
                <vs-tr v-for="(service, name, i) in details['current_services']" :key="i" :data="service[0]">
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
            <div v-for="(name, service, i) in details['current_services']" :key="i" >{{service[0].status}}</div>
          </vs-col>
          <vs-col lg="6" sm="12">
            <div class="hardware-stats">
              <vs-row class="spacing-row">

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>CPU</span>
                    <span>{{details['cpu_usage']}}%</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${details['cpu_usage']}%`"></div>
                  </div>
                </vs-col>

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>Temperature</span>
                    <span>~{{details['cpu_temp']}}°C</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${details['cpu_temp']}%`"></div>
                  </div>
                </vs-col>

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>Memory</span>
                    <span>{{details['memory_usage']}} MB / {{(details['memory_total'] / 1000).toFixed(1)}} GB</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${details['memory_usage'] / details['memory_total'] * 100}%`"></div>
                  </div>
                </vs-col>

                <vs-col lg="3" sm="6" xs="12">
                  <div class="hardware-stats-text">
                    <span>Storage</span>
                    <span>{{(details['storage_usage'] / 1000).toFixed(1)}} GB/{{(details['storage_total'] / 1000).toFixed(1)}} GB</span>
                  </div>
                  <div class="progress-background">
                    <div class="progress-status" :style="`width: ${details['storage_usage'] / details['storage_total'] * 100}%`"></div>
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
      </div>
    </vs-dialog>
    <vs-dialog blur v-model="showEditNameDialog">
      <vs-input v-model="details['device_name']"></vs-input>
      <vs-button @click="saveName">Save</vs-button>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "DeviceTile",
  mounted() {
    console.log('services', )
    this.$balena?.logs.subscribe(this.details.uuid, {count: 150}).then(logger => {
      this.logger = logger
      console.log('logger created')
      logger.on('line', line => {
        if (this.$refs.logContainer)
          this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight
        this.logs.push(line)
      })
    })
  },
  updated() {
    if (this.$refs.logContainer)
      this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight
  },
  destroyed() {
    this.logger?.unsubscribe()
  },
  methods: {
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
      for (const [key, value] of Object.entries(this.details['current_services'])) {
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
    }
  },
  props: {
    details: {required: true}
  },
  data () {
    return {
      showDialog: false,
      showEditNameDialog: false,
      logs: [],
      logger: undefined,
      colors: ['#0C059A', '#B36E2E', '#C0BC0D', '#9F4081', '#2363CC', '#EB5E7E', '#AAA723', '#D286A8', '#318747']
    }
  }
}
</script>

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
