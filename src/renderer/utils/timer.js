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
    this.loopStartTime = null // 当前循环的起始时间
    this.loopElapsedPaused = 0 // 暂停时保存当前循环已用时间
    this.isPaused = false // 是否处于暂停状态
  }

  start() {
    if (this.timerId) return // 如果已经在计时，直接返回

    const now = Date.now()
    this.startTime = now
    if (this.isPaused) {
      this.loopStartTime = now - this.loopElapsedPaused // 恢复循环起始时间
    } else if (!this.loopStartTime) {
      this.loopStartTime = now // 初始化循环起始时间
    }

    this.isPaused = false
    this.loopElapsedPaused = 0 // 清除暂停累计时间

    this.timerId = setTimeout(() => {
      this.onComplete()
    }, this.remainingTime)

    this.startUpdates()
  }

  pause() {
    if (!this.timerId) return // 如果没有在计时，直接返回

    clearTimeout(this.timerId)
    this.timerId = null

    const now = Date.now()
    this.remainingTime -= now - this.startTime
    if (this.loopStartTime) {
      this.loopElapsedPaused += now - this.loopStartTime // 累加暂停前的循环时间
    }

    this.loopStartTime = null // 暂停后清除循环起始时间
    this.isPaused = true // 标记为暂停状态
    this.stopUpdates()
  }

  startUpdates() {
    this.stopUpdates() // 防止重复设置
    const fnT = () => {
      const now = Date.now()
      const elapsed = now - this.startTime
      const currentRemaining = Math.max(this.remainingTime - elapsed, 0)
      const loopElapsed = this.loopStartTime ? now - this.loopStartTime : this.loopElapsedPaused // 当前循环已用时间
      this.onUpdate(currentRemaining, this.duration - currentRemaining, loopElapsed)
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

  resetLoopTime() {
    this.loopStartTime = Date.now() // 重置循环起始时间
    this.loopElapsedPaused = 0 // 清除暂停累计时间
    this.isPaused = false // 重置暂停状态
  }

  reset(newDuration = this.duration) {
    this.pause()
    // this.remainingTime = newDuration
    // this.startTime = null
    this.resetLoopTime() // 重置循环时间
  }
}

export default Timer
