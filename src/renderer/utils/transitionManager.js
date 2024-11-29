import { createApp } from 'vue'
import EndTransition from '../src/components/EndTransition.vue'
import StartTransition from '../src/components/StartTransition.vue'
import PauseTransition from '../src/components/PauseTransition.vue'

class TransitionManager {
  constructor({ start, end, pause }) {
    this.components = { start, end, pause }
    this.currentApp = null // 当前渲染的 Vue 实例
    this.currentContainer = null // 当前的 DOM 容器
    this.time = 4000
  }

  // 插入 Vue 组件到 DOM 中
  insertComponent(component) {
    if (this.currentApp) {
      this.removeCurrentComponent()
    }

    const container = document.createElement('div')
    document.body.appendChild(container)

    this.currentApp = createApp(component)
    this.currentApp.mount(container)
    this.currentContainer = container
  }

  // 移除当前组件
  removeCurrentComponent() {
    if (this.currentApp && this.currentContainer) {
      this.currentApp.unmount()
      document.body.removeChild(this.currentContainer)
      this.currentApp = null
      this.currentContainer = null
    }
  }

  // 显示开始组件
  start() {
    this.insertComponent(this.components.start)
    return new Promise((resolve) => {
      setTimeout(() => {
        this.removeCurrentComponent()
        resolve()
      }, this.time) // 自动移除的时间
    })
  }
  // 移除暂停组件
  continue() {
    this.removePauseComponent()
  }

  // 显示结束组件
  end() {
    this.insertComponent(this.components.end)
    return new Promise((resolve) => {
      setTimeout(() => {
        this.removeCurrentComponent()
        resolve()
      }, this.time) // 自动移除的时间
    })
  }

  // 显示暂停组件
  pause() {
    this.insertComponent(this.components.pause)
  }

  // 开始并移除暂停组件
  startWithPauseRemoval() {
    this.removePauseComponent()
    return this.start()
  }

  // 移除暂停组件
  removePauseComponent() {
    if (this.currentApp && this.currentContainer === this.components.pause) {
      this.removeCurrentComponent()
    }
  }
}

const transitionManager = new TransitionManager({
  start: StartTransition,
  end: EndTransition,
  pause: PauseTransition
})

export default transitionManager
