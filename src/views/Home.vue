<template>
<div>
  <div v-if="!!getApplications">
    <ApplicationTile @click.native="selectApp(application)" v-for="application in getApplications" :key="application['uuid']" :details="application"></ApplicationTile>
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
