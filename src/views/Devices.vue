<template>
  <div v-if="!!getSelectedApp">
    <DeviceTile v-for="device in devices" :key="device.uuid" :details="device"></DeviceTile>
  </div>
  <div v-else></div>
</template>

<script>
import {mapGetters} from "vuex";
import DeviceTile from "@/components/DeviceTile";

export default {
  name: "Devices",
  components: {
    DeviceTile
  },
  computed: {
    ...mapGetters({
      getSelectedApp: 'getSelectedApp'
    }),
    devices () {
      return this.getSelectedApp['owns__device']
    }
  }
}
</script>

<style scoped>

</style>
