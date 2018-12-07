<template>
  <div class="wrap">
    <component :is="currentView" />
  </div>
</template>
<style scoped lang="scss">

</style>
<script>
import cloud from './cloud'
import hub from './hub'
import Canvas from './canvas'
export default {
  name: 'MainFrame',
  components: {
    cloud,
    hub,
    Canvas
  },
  data () {
    return {
      cloudStatus: true
    }
  },
  computed: {
    currentView () {
      // if (this.cloudStatus) {
      //   return 'cloud'
      // } else {
      //   return 'canvas'
      // }
      return 'Canvas'
    }
  },
  methods: {
    change (status) {
      this.cloudStatus = status
    }
  }
}
</script>


