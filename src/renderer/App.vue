<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <div id="index">
     <main-fram />
    </div>
  </div>
</template>

<script>
import mainFram from './components/mainFrame'
export default {
  name: 'electron-vue',
  components: {
    mainFram
  },
  data () {
    return {
      cloudStatus: true
    }
  }
}
</script>

<style scope lang="scss">
  /* CSS */

</style>
