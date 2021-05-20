<template>
  <vs-card type="3">
    <template #title>
      <h3>{{ details['app_name'] }}</h3>
      <h4>{{ details['owns__device'].length}}</h4>
    </template>
    <template #img>
      <img :src="details['is_for__device_type'][0].logo" alt="">
    </template>
    <template #text>
        <p>{{details['is_for__device_type'][0]['is_of__cpu_architecture'][0]['slug']}}</p>
    </template>
  </vs-card>
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

</style>
