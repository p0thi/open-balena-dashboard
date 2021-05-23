<template>
  <div class="custom-tile">
    <vs-row justify="space-around">
      <vs-col w="4">
        <img :src="details['is_for__device_type'][0].logo" alt="">
      </vs-col>
      <vs-col w="6">
        <h2>Name: {{ details['app_name'] }}</h2>
        <h3>Devices: {{ details['owns__device'].length}}</h3>
        <p>Arch: {{details['is_for__device_type'][0]['is_of__cpu_architecture'][0]['slug']}}</p>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ApplicationTile",
  created() {
  },
  computed: {
    ...mapGetters({
    }),
  },
  props: {
    details: {type: Object, required: true}
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>
