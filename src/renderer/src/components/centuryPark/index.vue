<template>
  <div class="century_park">
    <ProgressBar :time="props.time" :list="progressBarList" :configList="progressBarConfigList" />
  </div>
</template>
<script setup>
import { nextTick, provide, ref, watchEffect } from 'vue'
import ProgressBar from '../ProgressBar.vue'
import TimeComparator from '../../../utils/timeComparator'
const props = defineProps(['time'])
const resetFunList = []

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
  } catch (error) {
    console.error('reset >>', error)
  }
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
watchEffect(() => {
  const res = timeCoparator.compare(props.time)
  if (res.success) {
    nextTick(() => {
      if (res.data.option === 'place7') {
        console.log('century_park reset')

        reset()
      }
    })
  }
})
</script>
<style lang="scss" scoped>
.century_park {
}
</style>
