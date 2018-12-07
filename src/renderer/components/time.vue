<template>
  <div class="counter" @touchstart.prevent="drag($event)" @touchmove="dragmove($event)" id="timeCounter">
    <div class="leftSide">
      <div class="up">
        <button class="up-button" @touchend.stop="upNum('minuteTen')"> + </button>
        <button class="up-button" @touchend.stop="upNum('minuteOne')"> + </button>
        <button class="up-button" @touchend.stop="upNum('secondTen')"> + </button>
        <button class="up-button" @touchend.stop="upNum('secondOne')"> + </button>
      </div>
      <div class="number">
        <span class="num"> {{ this.timeArr.minuteTen }}</span>
        <span class="num"> {{ this.timeArr.minuteOne }}</span>
        <span class="num" style="width:20px; margin: -8px 5px 0; ">:</span>
        <span class="num"> {{ this.timeArr.secondTen }}</span>
        <span class="num">{{ this.timeArr.secondOne }} </span>
      </div>
        <div class="down">
        <button class="down-button" @touchend.stop="downNum('minuteTen')"> - </button>
        <button class="down-button" @touchend.stop="downNum('minuteOne')"> - </button>
        <button class="down-button" @touchend.stop="downNum('secondTen')"> - </button>
        <button class="down-button" @touchend.stop="downNum('secondOne')"> - </button>
      </div>
    </div>
    <div class="rightSide">
      <button class="startButton" @touchend.stop="startTime">Stasrt</button>
      <button class="downTime" @touchend.stop="downTime">Down</button>
      <button class="reset" @touchend.stop="resetTime">Reset</button>
    </div>
    <div class="time">
      <span> {{ this.minuteNum }} </span>
      <span> {{ this.secondNum }} </span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.time {
  position: absolute;
  bottom: 10px;
  span {
    width: 40px;
    display: inline-block;
    font-size: 28px;
  }
}
.counter {
  position: fixed;
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  display: flex;
}
.leftSide{
  width: 80%;
}
.rightSide {
  width: 20%;
  position: relative;
  .startButton {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid #ccc;
    position: absolute;
    right: 0px;
    top: 50px;
    outline: none;
  }
  .downTime {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid #ccc;
    position: absolute;
    right: 0px;
    top: 110px;
    outline: none;
  }
  .reset {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid #ccc;
    position: absolute;
    right: 0px;
    top: 170px;
    outline: none;
  }
}
.up-button, .down-button {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin:10px;
  font-size: 28px;
  outline: none;
}
button:nth-of-type(3) {
    margin-left: 30px;
  }
.number {
  font-size: 80px;
  color: #333;
  display: flex;
  .num {
    width: 40px;
    display: inline-block;
    margin: 0 10px;
  }
}

</style>
<script>
export default {
  name: 'Time',
  data () {
    return {
      timeArr: {
        minuteTen: 0,
        minuteOne: 0,
        secondTen: 0,
        secondOne: 0
      },
      counter: {
        minutes: 0,
        seconds: 0
      },
      countTimer: null,
      dragState: false,
      dist: { x: 0, y: 0, offsetLeft: 0, offsetTop: 0 }
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log('mounted22')
      // this.startTime()
    })
    console.log('mounted')
  },
  computed: {
    minuteNum: function () {
      return this.counter.minutes < 10 ? '0' + this.counter.minutes : this.counter.minutes
    },
    secondNum: function () {
      return this.counter.seconds < 10 ? '0' + this.counter.seconds : this.counter.seconds
    }
  },
  methods: {
    drag (e) {
      if (e.touches) {
        let touchCount = e.touches.length
        if (touchCount === 1) {
          this.dragState = true
        } else {
          this.dragState = false
          return
        }
      }
      this.dist.x = e.touches[0].clientX
      this.dist.y = e.touches[0].clientY
    },
    dragmove (e) {
      // if (!this.dragState) return
      console.log('move')
      let l = e.touches[0].clientX - this.dist.x
      let t = e.touches[0].clientY - this.dist.y
      this.dist.offsetLeft = this.dist.offsetLeft + l
      this.dist.offsetTop = this.dist.offsetTop + t
      this.dist.x = e.touches[0].clientX
      this.dist.y = e.touches[0].clientY
      document.getElementById('timeCounter').style.left = this.dist.offsetLeft + 'px'
      document.getElementById('timeCounter').style.top = this.dist.offsetTop + 'px'
    },
    startTime () {
      //
      console.log(88)
      this.timeUp(0, this.utcSecond())
    },
    timeUp (time, utcSecond) {
      let total = this.utcSecond() - utcSecond + time
      // this.timeArr.minuteTen = Math.floor(total / 60 % 60)
      this.counter.minutes = Math.floor(total / 60 % 60)
      this.counter.seconds = Math.floor(total % 60)
      this.countTimer = window.setTimeout(() => {
        this.timeUp(time, utcSecond)
      }, 1000)
    },
    downTime () {
      this.timeDown(100, this.utcSecond())
    },
    timeDown (time, utcSecond) {
      let left = time - (this.utcSecond() - utcSecond)
      this.counter.minutes = Math.floor(left / 60 % 100)
      this.counter.seconds = Math.floor(left % 60)
      setTimeout(() => {
        this.timeDown(time, utcSecond)
      }, 1000)
    },
    // timeUp (time, utcSecondBegin) {
    //   let
    // },
    utcSecond () {
      return Math.round(Date.now() / 1000)
    },
    resetTime () {
      this.timeArr.minuteTen = 0
      this.timeArr.minuteOne = 2
      this.timeArr.secondTen = 0
      this.timeArr.secondOne = 0
      console.log(this.utcSecond(), 9999)
      console.log(this.utcSecond(), 8888)
    },
    upNum (type) {
      if (type === 'minuteTen') {
        if (this.timeArr.minuteTen < 9) {
          this.timeArr.minuteTen++
        } else {
          this.timeArr.minuteTen = 0
        }
      }
      if (type === 'minuteOne') {
        if (this.timeArr.minuteOne < 9) {
          this.timeArr.minuteOne++
        } else {
          this.timeArr.minuteOne = 0
        }
      }
      if (type === 'secondTen') {
        if (this.timeArr.secondTen < 5) {
          this.timeArr.secondTen++
        } else {
          this.timeArr.secondTen = 0
        }
      }
      if (type === 'secondOne') {
        if (this.timeArr.secondOne < 5) {
          this.timeArr.secondOne++
        } else {
          this.timeArr.secondOne = 0
        }
      }
      console.log(999)
    },
    downNum (type) {
      if (type === 'minuteTen') {
        if (this.timeArr.minuteTen > 0) {
          this.timeArr.minuteTen--
        } else {
          this.timeArr.minuteTen = 9
        }
      }
      if (type === 'minuteOne') {
        if (this.timeArr.minuteOne > 0) {
          this.timeArr.minuteOne--
        } else {
          this.timeArr.minuteOne = 9
        }
      }
      if (type === 'secondTen') {
        if (this.timeArr.secondTen > 0) {
          this.timeArr.secondTen--
        } else {
          this.timeArr.secondTen = 5
        }
      }
      if (type === 'secondOne') {
        if (this.timeArr.secondOne > 0) {
          this.timeArr.secondOne--
        } else {
          this.timeArr.secondOne = 9
        }
      }
      console.log(888)
    }
  }
}
</script>


