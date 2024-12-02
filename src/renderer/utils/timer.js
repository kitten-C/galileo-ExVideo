class Timer {
  constructor(duration, frequency = 1000, onUpdate = () => {}, onComplete = () => {}) {
    this.duration = duration // 计时时长（毫秒）
    this.frequency = frequency // 实时返回时间的频率（毫秒）
    this.onUpdate = onUpdate // 实时更新回调函数
    this.onComplete = onComplete // 计时完成回调函数

    this.remainingTime = duration // 剩余时间
    this.timerId = null // 定时器 ID
    this.updateId = null // 实时更新 ID
    this.startTime = null // 开始时间
  }

  start() {
    if (this.timerId) return // 如果已经在计时，直接返回

    this.startTime = Date.now()
    this.timerId = setTimeout(() => {
      // this.remainingTime = 0
      // this.stopUpdates()
      this.onComplete()
    }, this.remainingTime - 5700)

    this.startUpdates()
  }

  pause() {
    if (!this.timerId) return // 如果没有在计时，直接返回

    clearTimeout(this.timerId)
    this.timerId = null
    this.remainingTime -= Date.now() - this.startTime
    this.stopUpdates()
  }

  startUpdates() {
    this.stopUpdates() // 防止重复设置
    const fnT = () => {
      const elapsed = Date.now() - this.startTime
      const currentRemaining = Math.max(this.remainingTime - elapsed, 0)
      this.onUpdate(currentRemaining, this.duration - currentRemaining)
    }
    fnT()
    this.updateId = setInterval(fnT, this.frequency)
  }

  stopUpdates() {
    if (this.updateId) {
      clearInterval(this.updateId)
      this.updateId = null
    }
  }

  reset(newDuration = this.duration) {
    this.pause()
    this.remainingTime = newDuration
    this.startTime = null
  }
}

export default Timer
