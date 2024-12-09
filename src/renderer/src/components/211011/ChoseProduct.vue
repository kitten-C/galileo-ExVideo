<template>
  <div class="chose_product">
    <canvas id="canvas"></canvas>
    <img class="bgc" :src="bgc1" alt="" />
    <div class="bgs"></div>
    <img class="bgc1" :src="bgc1" alt="" />
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import bgc1 from '../../assets/ui/cabinet/oil.png'
onMounted(() => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // 设置 Canvas 大小
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  /**
   * 渲染一个矩形区域，同时从四周向矩形内延伸黑色遮罩
   * @param {Object} rect 矩形信息 {x, y, width, height}
   * @param {number} duration 动画完成的时间（毫秒）
   */
  function revealRectangle(rect, duration = 2000) {
    // 初始化遮罩扩展的进度（0 到 1）
    let progress = 0

    // 动画开始时间
    const startTime = performance.now()

    // 遮罩初始边界
    const maxTopHeight = rect.y
    const maxBottomHeight = canvas.height - (rect.y + rect.height)
    const maxLeftWidth = rect.x
    const maxRightWidth = canvas.width - (rect.x + rect.width)

    // 动画函数
    function animate(currentTime) {
      // 计算进度比例
      progress = Math.min((currentTime - startTime) / duration, 1)

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制动态遮罩
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'

      // 计算当前扩展尺寸
      const topHeight = progress * maxTopHeight
      const bottomHeight = progress * maxBottomHeight
      const leftWidth = progress * maxLeftWidth
      const rightWidth = progress * maxRightWidth
      let temp = 0.3
      if (progress === 1) temp = 0
      // 绘制黑色遮罩（带透明度）
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      // 上方
      ctx.fillRect(leftWidth, 0, canvas.width - leftWidth - rightWidth, topHeight)
      // 下方
      ctx.fillRect(
        leftWidth,
        canvas.height - bottomHeight,
        canvas.width - leftWidth - rightWidth,
        bottomHeight
      )
      // 左侧
      ctx.fillRect(0, 0, leftWidth + temp, canvas.height)
      // 右侧
      ctx.fillRect(canvas.width - rightWidth - temp, 0, rightWidth, canvas.height)

      // 停止条件：进度完成
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    // 开始动画
    animate(startTime)
  }

  // 调用方法，传入矩形的位置和大小
  const rectangle = {
    x: canvas.width / 4, // 自定义位置：距左侧 1/4
    y: canvas.height / 4, // 自定义位置：距顶部 1/4
    width: 800, // 宽度为画布的 1/2
    height: 120 // 高度为画布的 1/2
  }

  revealRectangle(rectangle, 1000) // 动画持续 3 秒
})
</script>
<style lang="scss">
.chose_product {
  position: relative;
  z-index: 888;
  canvas {
    display: block;
    margin: 0 auto;
    // background: white;
  }
  .bgc,
  .bgc1,
  .bgs {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .bgs {
    width: 100%;
    height: 100%;
    background-color: #000000cc;
  }
  .bgc1 {
    z-index: 3;
    // clip-path: inset(100px 50px);
    // clip-path: circle(40%);
    // clip-path: circle(4%);
    // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    // clip-path: polygon(239px 892px, 1012px 892px, 1012px 1818px, 239px 1818px);
    // clip-path: inset(100px 0px);
    // clip-path: inset(239px 892px);
    clip-path: xywh(0 0 100% 100%);
    clip-path: xywh(239px 892px 773px 926px round 40px);
    transition: 1s;
    // height: 100px;
  }
}
</style>
