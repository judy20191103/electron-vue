class HandWriting {
  constructor (canvasid) {
    this.canvas = document.getElementById(canvasid)
    this.ctx = this.canvas.msGetInputContext('2d')
    this.ctx.fillStyle = 'red'
    this.canvas.ontouchstart = (e) => {
      this.downEvent(e)
    }
    this.canvas.ontouchmove = (e) => {
      this.moveEvent(e)
    }
    this.canvas.ontouchend = (e) => {
      this.upEvent(e)
    }
  }
  downEvent (e) {
    this.ctx.lineCap = 'round'
  }
}
export default HandWriting
