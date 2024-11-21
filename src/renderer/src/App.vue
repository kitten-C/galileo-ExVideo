<script setup>
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import Timer from '../utils/timer'
import { TreadmillDLLControl, SixAxisDLLControl } from '../utils/dLLControl'

const videoSrc = ref()
const audioSrc = ref()
const videoRef = ref()
const audioRef = ref()
const showTimeText = ref(0)
let timer
let treadmillDLLControl
let sixAxisDLLControl

const externalParameters = ref({})

const deviceC = {
  start() {
    videoRef.value.play()
    audioRef.value.play()
    timer.start()
    treadmillDLLControl.start()
  },
  stop() {
    videoRef.value.pause()
    audioRef.value.pause()
    timer.pause()
    console.log('videoRef.value?.currentTime', videoRef.value?.currentTime)
    treadmillDLLControl.stop()
    sixAxisDLLControl.restore()
  },
  addVal() {
    treadmillDLLControl.addVal()
  },
  delVel() {
    treadmillDLLControl.delVel()
  },
  reset() {
    treadmillDLLControl.reset()
    sixAxisDLLControl.reset()
    deviceC.stop()
    deviceC.start()
  }
}

const handleTime = (time, untime) => {
  showTimeText.value = untime / 1000
  const videoCurrentTime = videoRef.value?.currentTime
  const treadmillRes = treadmillDLLControl.handleCompare(videoCurrentTime)
  const sixAxisRes = sixAxisDLLControl.handleCompare(videoCurrentTime)
  console.log('handleTime!!!', untime, videoCurrentTime, treadmillRes, sixAxisRes)
}

const onComplete = () => {
  deviceC.stop()
}

const initMedia = () => {
  const up = import.meta.env.MODE === 'development' ? '/@fs' : 'file://'
  const id = externalParameters.value.id
  videoSrc.value = `${up}/D:/Media/video_${id}.mp4`
  audioSrc.value = `${up}/D:/Media/video_${id}.mp3`

  videoRef.value?.addEventListener('ended', () => {
    deviceC.reset()
  })
}

const initDLLControl = (deviceConfig) => {
  const treadmillConfig = deviceConfig.find(v => v.name === 'treadmill').fileData
  const sixAxisConfig = deviceConfig.find(v => v.name === 'sixAxis').fileData
  treadmillDLLControl = new TreadmillDLLControl(treadmillConfig)
  sixAxisDLLControl = new SixAxisDLLControl(sixAxisConfig)
}

onMounted(async () => {
  const deviceConfig = await window.fileAPI.getDeviceConfig()
  const options = await window.fileAPI.getOptions()
  externalParameters.value = options
  console.log('deviceConfig', deviceConfig, options)
  initDLLControl(deviceConfig)
  initMedia()
  timer = new Timer(externalParameters.value.time, 100, handleTime, onComplete)
})
</script>

<template>
  <div class="main">
    <video ref="videoRef" :src="videoSrc" controls></video>
    <audio ref="audioRef" :src="audioSrc" loop></audio>
    <div class="btns">
      <button @click="deviceC.start">开始</button>
      <button @click="deviceC.stop">暂停</button>
      <button @click="deviceC.addVal">加速</button>
      <button @click="deviceC.delVel">减速</button>
    </div>
    <div>
      {{ showTimeText }}
    </div>
  </div>
</template>

<style lang="scss">
.main {
  position: relative;

  video {
    height: 100%;
    width: 100%;
  }

  .btns {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 50%;
    button {
      border: 1px solid #ccc;
      padding: 20px;
      margin-left: 20px;
      cursor: pointer;
      font-size: 20px;
    }
  }
}
</style>
