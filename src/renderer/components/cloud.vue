<template>
  <div class="wrap">
  <button class="btn" @touchend.stop="switchTohub">切换到hub</button>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  width: 1000px;
  height: 1000px;
  overflow: hidden;
  background: #bbe;
  .btn {
    width: 50px;
    height: 40px;
    border-radius: 20px;
    outline: none;
  }
}
</style>
<script>
export default {
  name: 'Cloud',
  data () {
    return {
    }
  },
  methods: {
    switchTohub () {
      this.$parent.change(false)
    }
  }
}
</script>


