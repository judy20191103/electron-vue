<template>
  <div class="wrap">
    <canvas id="can" width=800 height=600 
    @touchstart.stop="startPen($event)" 
    @touchmove.stop="movePen($event)" 
    @touchend.stop="endPen($event)">
    </canvas>
  <button class="btn" @touchend.stop="switchToCloud">切换到cloud</button>
  </div>
</template>
<style scoped lang="scss">
#can {
border:1px solid #000;
}
.wrap {
  width: 1000px;
  height: 1000px;
  overflow: hidden;
  background: #abc;
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
  name: 'Hub',
  data () {
    return {
      penWeight: 1,
      penColor: '#f00',
      dist: { x: 0, y: 0 },
      canvas: null,
      ctx: null
    }
  },
  methods: {
    switchToCloud () {
      this.$parent.change(true)
    },
    startPen (e) {
      console.log(777)
      this.canvas = document.getElementById('can')
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = 800
      this.cnavas.height = 800
      this.dist.x = e.clientX
      this.dist.y = e.clientY
      this.ctx.beginPath()
      this.ctx.moveTo(this.dist.x, this.dist.y)
      this.ctx.lineCap = 'round'
      this.ctx.lineJoin = 'round'
      this.ctx.strokeStyle = this.penColor
      this.ctx.lineWidth = this.penWeight
      this.ctx.strokeRect(50, 50, 200, 200)
    },
    movePen (e) {
      console.log(999)
      let moveX = e.clientX
      let moveY = e.clientY
      this.ctx.lineTo(moveX, moveY)
      this.ctx.stroke()
    },
    endPen (e) {
      this.ctx.closePath()
      this.canvas.startPen = null
      this.canvas.movePen = null
    }
  }
}
</script>


