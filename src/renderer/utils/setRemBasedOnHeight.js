function setRemBasedOnHeight() {
  const designHeight = 2408.72 // 设计稿的高度
  const baseFontSize = 16 // 基准字体大小

  const screenHeight = window.innerHeight // 获取当前屏幕的高度
  const scale = screenHeight / designHeight // 根据屏幕高度与设计稿高度的比例来计算缩放因子

  // 设置根元素的 font-size，缩放因子 * 基准字体大小
  document.documentElement.style.fontSize = `${baseFontSize * scale}px`
}

// 初始化时设置 font-size
setRemBasedOnHeight()

// 在窗口尺寸变化时重新计算
window.addEventListener('resize', setRemBasedOnHeight)
