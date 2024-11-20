<script setup>
import { onMounted, ref } from 'vue'
import Timer from '../utils/timer'

const MokeExternalParameters = {
  id: 211012,
  time: 60 * 10000
}

const videoSrc = ref()
const audioSrc = ref()
const videoRef = ref()
const audioRef = ref()
const showTimeText = ref(0)
let timer
let deviceConfig

const externalParameters = ref({ ...MokeExternalParameters })

window.electron.onSetFolderPath((params) => {
  console.log('params', params)
  if (import.meta.env.MODE === 'development') {
    externalParameters.value = MokeExternalParameters
  } else {
    externalParameters.value = params
  }
})

const deviceC = {
  start() {
    console.log('deviceC.start')

    videoRef.value.play()
    audioRef.value.play()
    timer.start()
    window.dll({ name: 'treadmillDll', function: 'StartTreadmill', data: [1, 3] })
  },
  stop() {
    videoRef.value.pause()
    audioRef.value.pause()
    timer.pause()
    console.log('videoRef.value?.currentTime', videoRef.value?.currentTime)
    window.dll({ name: 'treadmillDll', function: 'StopTreadmill', data: [3] })
  },
  addVal() {
    window.dll({ name: 'treadmillDll', function: 'AddVel', data: [100, 3] })
  },
  delVel() {
    window.dll({ name: 'treadmillDll', function: 'DelVel', data: [100, 3] })
  }
}

const handleTime = (time, untime) => {
  showTimeText.value = untime / 1000
  console.log('time', untime, videoRef.value?.currentTime)
}

const getSrc = () => {
  const up = import.meta.env.MODE === 'development' ? '/@fs' : 'file://'
  window.dll({ name: 'treadmillDll', function: 'InitTreadmill', data: [] })
  const id = externalParameters.value.id
  videoSrc.value = `${up}/D:/Media/video_${id}.mp4`
  audioSrc.value = `${up}/D:/Media/video_${id}.mp3`
}

onMounted(async () => {
  getSrc()
  timer = new Timer(externalParameters.value.time, 100, handleTime)
  deviceConfig = await window.fileAPI.getDeviceConfig()
  console.log('deviceConfig', deviceConfig)
})
</script>

<template>
  <div class="main">
    <video ref="videoRef" :src="videoSrc" controls></video>
    <audio ref="audioRef" :src="audioSrc" controls loop></audio>
    <button @click="deviceC.start">开始</button>
    <button @click="deviceC.stop">暂停</button>
    <button @click="deviceC.addVal">加速</button>
    <button @click="deviceC.delVel">减速</button>
    <div>
      {{ showTimeText }}
    </div>
  </div>
</template>

<style lang="scss">
.main {
  video {
    height: 100%;
    width: 100%;
  }
}
</style>
