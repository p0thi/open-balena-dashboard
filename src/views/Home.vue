<template>
<div>
  <div v-if="!!getApplications">
    <vs-row>
      <vs-col lg="4" sm="6" xs="12" v-for="application in getApplications" :key="application['uuid']">
        <ApplicationTile @click.native="selectApp(application)" :details="application"></ApplicationTile>
      </vs-col>
    </vs-row>
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import {mapGetters, mapMutations} from "vuex";
import ApplicationTile from "@/components/ApplicationTile";

export default {
  name: 'Home',
  components: {
    ApplicationTile
  },
  methods: {
    ...mapMutations({
      setSelectedApp: 'setSelectedApp'
    }),
    selectApp(application) {
      console.log('app selected', application)
      this.setSelectedApp(application)
      this.$router.push('/devices')
    }
  },
  computed: {
    ...mapGetters({
      getApplications: 'getApplications',
    })
  }
}
</script>
