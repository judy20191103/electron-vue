<template>
  <div class="wrap">
    <canvas id="canvas" width="550" height="400"
    @mousedown="canvasDown"
    @mousemove="canvasMove"
    @mouseup="canvasUp"
    @touchstart.prevent="canvasDown"
    @touchmove.prevent="canvasMove"
    @touchend.prevent="canvasUp"
    >
    </canvas>
    <div class="control">
      <div class="penWrap">
        <h5>画笔颜色</h5>
        <ul>
          <li v-for="item in penColor" :key="item" 
          :style="{ background: item}"
          @click="setColor(item)">
          </li>
        </ul>
      </div>
       <div class="penWrap">
        <h5>画笔大小</h5>
        <ul>
          <li v-for="item in penWeight" :key="item"
          @click="setBrush(item)">
            {{ item }}
          </li>
        </ul>
      </div>
       <div class="penWrap">
        <h5>画笔操作</h5>
        <ul>
          <li v-for="item in penOperate" :key="item"
          @click="setUp(item)">
            {{ item }}
          </li>
        </ul>
      </div>
       <div class="penWrap">
        <h5>生成图像</h5>
        <span class="preview">预览</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: row;
  width: 750px;
  border: 1px solid #585858;
}
#canvas {
  border-right: 1px solid #585858;
  box-sizing: border-box;
  background:cadetblue;
}
.control {
  width: 200px;
  background: #bbb;
  .penWrap {
    width: 180px;
    margin: 0 auto;
    text-align: center;
    .preview {
      width: 100px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      border: 1px solid #585858;
      border-radius: 10px;
      text-align: center;
    }
  }
  h5 {
    font-size: 24px;
    margin: 10px 0;
    text-align: center;
  }
  ul {
    list-style: none;
    width: 180px;
    padding: 0 14px;
  }
  li {
    width: 50px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
  }
}
</style>
<script>
export default {
  name: 'Canvas',
  data () {
    return {
      penColor: [
        'red',
        'green',
        'blue',
        'black',
        'white',
        'orange',
        'purple',
        'aqua',
        'yellow'
      ],
      penWeight: [
        '1',
        '5',
        '10'
      ],
      penOperate: [
        '撤销',
        '恢复',
        '清空'
      ],
      context: { },
      config: {
        lineWidth: 1,
        lineColor: '#000',
        shadowBlur: 2
      },
      // // 存储当前表面状态数组-上一步
      // preDrawAry: [],
      // // 存储当前表面状态数组下一步
      // nextDrawAry: [],
      // middleAry: [],
      lines: [],
      removeLines: [],
      canvas: null,
      originData: { },
      dbTimer: null,
      dblClick: 0, // 双击缩放判断
      canvasMoveUse: false // ?
    }
  },
  mounted () {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    this.originData = this.context.getImageData(0, 0, 550, 400)
  },
  computed: {
    isPcStatus () {
      this.isPc() // 通过computed进行数据绑定，就不用每次mousemove都要执行一次判断函数
    }
  },
  methods: {
    // 是否是PC端
    isPc () {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    beginPath (e) {
      // const canvas = document.getElementById('canvas')
      this.context.beginPath()
      // if (e.target !== this.canvas) {
      //   this.context.beginPath()
      // }
    },
    // 设置绘画配置
    setCanvasStyle () {
      this.context.lineWidth = this.config.lineWidth
      this.context.shadowBlur = this.config.shadowBlur // 给画笔添加阴影，效果更佳逼真，但是粗一点的笔锋还是没有不像，需要改进，细一点的笔锋效果好一些
      this.context.shadowColor = this.config.lineColor
      this.context.strokeStyle = this.config.lineColor
    },
    // 设置颜色
    setColor (color) {
      this.config.lineColor = color
      console.log(color)
    },
    // 设置笔刷大小
    setBrush (type) {
      this.config.lineWidth = type
      console.log(type)
    },
    // mouseDwon
    canvasDown (e) {
      // offset 是canvas距离顶部及左部得距离
      // client 是基于整个页面得坐标
      const canvasX = e.clientX - e.target.parentNode.offsetLeft
      const canvasY = e.clientY - e.target.parentNode.offsetTop
      // const canvasX = e.clientX - this.canvas.offsetLeft
      // const canvasY = e.clientY - this.canvas.offsetTop
      this.setCanvasStyle()
      this.beginPath() // 清除字路径
      this.context.moveTo(canvasX, canvasY)
      console.log('moveTo', canvasX, canvasY)
      // 当前绘图表面状态
      // const preData = this.context.getImageData(0, 0, 550, 400)
      // this.preDrawAry.push(preData)
      this.canvasMoveUse = true
    },
    canvasMove (e) {
      if (this.canvasMoveUse) {
        console.log('canvasMove')
        const t = e.target
        let canvasX
        let canvasY
        if (this.isPc()) {
          console.log('pc端')
          canvasX = e.clientX - t.parentNode.offsetLeft
          canvasY = e.clientY - t.parentNode.offsetTop
        } else {
          console.log('移动端')
          canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft // 以第一个触指为准
          canvasY = e.changedTouches[0].clientY - t.parentNode.offsetTop
        }
        this.context.lineTo(canvasX, canvasY)
        this.context.stroke()
      }
    },
    canvasUp (e) {
      console.log('canvasup')
      // const preData = this.context.getImageData(0, 0, 550, 400)
      // if (!this.nextDrawAry.length) {
      //   this.middleAry.push(preData) // 如果前一步数组保存的数据为空，则将数据添加到中间数组
      // } else {
      //   this.middleAry = []
      //   this.middleAry = this.middleAry.concat(this.preDrawAry)
      //   this.middleAry.push(preData)
      //   this.nextDrawAry = []
      // }
      const currentData = this.context.getImageData(0, 0, 550, 400)
      this.lines.push(currentData)
      this.context.closePath()
      this.canvasMoveUse = false
    },
    setUp (type) {
      switch (type) {
        case '撤销': console.log('撤销', this.lines.length)
          if (this.lines.length) {
            console.log(this.lines.length, '7777')
            let popData = this.lines.pop()
            let currentData
            if (this.lines.length > 0) {
              currentData = this.lines[this.lines.length - 1]
            } else {
              currentData = this.originData
            }
            this.removeLines.push(popData)
            this.context.putImageData(currentData, 0, 0)
          }
          // if (this.preDrawAry.length) {
          //   const popData = this.preDrawAry.pop() // 按下的瞬间，笔触应该为空，屏幕上是空的吧
          //   const midData = this.middleAry[this.preDrawAry.length + 1]
          //   this.nextDrawAry.push(midData)
          //   this.context.putImageData(popData, 0, 0) // 不然此步就没法理解
          // }
          break
        case '恢复': console.log('恢复')
          if (this.removeLines.length) {
            console.log(this.removeLines.length, 888)
            let popData = this.removeLines.pop()
            this.lines.push(popData)
            this.context.putImageData(popData, 0, 0)
          }
          // if (this.nextDrawAry.length) {
          //   const popData = this.nextDrawAry.pop()
          //   const midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2]
          //   this.preDrawAry.push(midData)
          //   this.context.putImageData(popData, 0, 0)
          // }
          break
        case '清空': console.log('清空')
          this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
          this.lines = []
          this.removeLines = []
          // this.preDrawAry = []
          // this.nextDrawAry = []
          // this.middleAry = [this.middleAry[0]]
          break
      }
    }
  }
}
</script>

