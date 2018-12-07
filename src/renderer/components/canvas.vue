<template>
  <div class="wrap">
    <canvas id="canvas" width="550" height="400">
    </canvas>
    <div class="control">
      <div class="penWrap">
        <h5>画笔颜色</h5>
        <ul>
          <li v-for="item in penWrap" :key="item" :style="{ background: item}">
          </li>
        </ul>
      </div>
       <div class="penWrap">
        <h5>画笔大小</h5>
        <ul>
          <li v-for="item in penWeight" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
       <div class="penWrap">
        <h5>画笔操作</h5>
        <ul>
          <li v-for="item in penOperate" :key="item">
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
      penWrap: [
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
      ]
    }
  }
}
</script>

