<template>
  <div v-if="!!getSelectedApp">
    <DeviceTile v-for="device in sortedDevices" :key="device.uuid" :details="device"></DeviceTile>
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
  created() {
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
    }
  },
  data () {
    return {
      interval: undefined
    }
  }
}
</script>

<style scoped>

</style>
