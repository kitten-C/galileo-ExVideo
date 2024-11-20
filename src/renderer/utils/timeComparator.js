class TimeComparator {
  constructor(config) {
    if (!Array.isArray(config) || config.some((item) => typeof item.time === 'undefined')) {
      throw new Error(`数据必须是一个包含time字段的对象数组 ${config}`)
    }
    this.config = config.sort((a, b) => a.time - b.time) // 按时间排序，确保比较顺序正确
    this.index = 0 // 当前索引
  }

  compare(time) {
    if (this.index >= this.config.length) {
      return { success: false, code: 404, message: '没有更多对象可比较' }
    }

    const currentItem = this.config[this.index]
    if (time >= currentItem.time) {
      this.index++
      return { success: true, code: 200, data: currentItem }
    } else {
      return {
        success: false,
        code: 400,
        message: `时间小于当前对象的time: time: ${time}, currentItem.time: ${currentItem.time}`
      }
    }
  }

  reset() {
    this.index = 0 // 重置索引
  }
}

export default TimeComparator
