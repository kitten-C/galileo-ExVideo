<template>
  <div class="century_park">
    <ProgressBar :time="props.time" :list="progressBarList" />
    <mapMark :showList="showList" />
    <routeSelect :showList="showList" />
  </div>
</template>
<script setup>
import { nextTick, provide, ref, watchEffect } from 'vue'
import ProgressBar from '../ProgressBar.vue'
import TimeComparator from '../../../utils/timeComparator'
import mapMark from './mapMark.vue'
import routeSelect from './routeSelect.vue'

const props = defineProps(['time'])
const resetFunList = []
const showList = ref(Array(7).fill(true))

const setShowList = (index) => {
  if (showList.value[index]) {
    const flag = showList.value.every((v, i) => {
      if (i === index) {
        return true
      } else {
        return !v
      }
    })
    if (flag) {
      return
    }
  }

  showList.value[index] = !showList.value[index]
  progressBarList.value[index].status = !showList.value[index] ? 1 : 0
}

const progressBarList = ref([
  { option: 'place1', text: '镜天湖', status: 0 },
  { option: 'place2', text: '云帆桥', status: 0 },
  { option: 'place3', text: '‌闻莺桥', status: 0 },
  { option: 'place4', text: '世纪小道', status: 0 },
  { option: 'place5', text: '蒙特利尔园', status: 0 },
  { option: 'place6', text: '湖畔小道', status: 0 },
  { option: 'place7', text: '公园出口', status: 0 }
])

const progressBarConfigList = [
  { time: 135, type: 'down', option: 'place1' },
  { time: 360, type: 'down', option: 'place2' },
  { time: 428, type: 'down', option: 'place3' },
  { time: 520, type: 'down', option: 'place4' },
  { time: 685, type: 'down', option: 'place5' },
  { time: 784, type: 'down', option: 'place6' },
  { time: 1053, type: 'down', option: 'place7' }
]
const timeCoparator = new TimeComparator(progressBarConfigList)
const reset = () => {
  try {
    resetFunList.forEach((v) => {
      v()
    })
    nextTick(() => {
      progressBarList.value.forEach((v) => {
        v.status = 0
      })
    })
    timeCoparator.reset()
  } catch (error) {
    console.error('reset >>', error)
  }
}
watchEffect(() => {
  const res = timeCoparator.compare(props.time)
  if (res.success) {
    nextTick(() => {
      const option = res.data.option
      progressBarList.value.forEach((item) => {
        if (item.option === option) {
          item.status = 1
        }
      })
      if (res.data.option === 'place7') {
        console.log('century_park reset')

        reset()
      }
    })
  }
})

provide('century_park', {
  setShowList
})
</script>
<style lang="scss" scoped>
.century_park {
}
</style>
