<script setup>
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import Timer from '../utils/timer'
import { TreadmillDLLControl, SixAxisDLLControl } from '../utils/dLLControl'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
dayjs.duration(100)
const videoSrc = ref()
const audioSrc = ref()
const videoRef = ref()
const audioRef = ref()
const showTimeText = ref(0)
const countdown = ref(0)
const leftText = ref({
  speed: 0,
  distance: 0
})
let timer
let treadmillDLLControl
let sixAxisDLLControl

const externalParameters = ref({})
const countdownFormat = computed(() => {
  return dayjs.duration(countdown.value).format('HH:mm:ss')
})
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
  countdown.value = time
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

const initUpdaeLeftText = () => {
  window.fileAPI.updateDeviceSpeed((value) => {
    console.log('updateDeviceSpeed', value)

    leftText.value.speed = value
  })
  window.fileAPI.updateDeviceDistance((value) => {
    console.log('updateDeviceDistance', value)

    leftText.value.distance = value
  })
}

onMounted(async () => {
  const deviceConfig = await window.fileAPI.getDeviceConfig()
  const options = await window.fileAPI.getOptions()
  externalParameters.value = options
  console.log('deviceConfig', deviceConfig, options)
  initDLLControl(deviceConfig)
  initMedia()
  countdown.value = externalParameters.value.time
  timer = new Timer(externalParameters.value.time, 100, handleTime, onComplete)
  initUpdaeLeftText()
})
</script>

<template>
  <div class="main">
    <video ref="videoRef" :src="videoSrc"></video>
    <audio ref="audioRef" :src="audioSrc" loop></audio>
    <div class="btns">
      <button @click="deviceC.start">开始</button>
      <button @click="deviceC.stop">暂停</button>
      <button @click="deviceC.addVal">加速</button>
      <button @click="deviceC.delVel">减速</button>
    </div>
    <div class="top">
      <img src="./assets/ui/training_nav.png">
      <div class="top_text">{{ countdownFormat }}</div>
    </div>
    <div class="left">
      <img src="./assets/ui/training_left.png">
      <div class="left_text">
        <div class="left_text_title">地面实时数据</div>
        <div>上下移动：</div>
        <div>左右平移：</div>
        <div>前后平移：</div>
        <div>X轴侧倾角度：</div>
        <div>Y轴侧倾角度：</div>
        <div class="left_text_title">步行实时数据</div>
        <div>位移：{{ leftText.distance }}m</div>
        <div>速度：{{ leftText.speed }}m/s</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main {
  position: relative;
  background-color: #000;
  height: 100%;
  width: 100%;
  overflow: hidden;

  video {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .top {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 9%;

    img {
      height: 100%;
    }

    .top_text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.3vw;
      color: #fff;
      display: flex;
    }
  }

  .left {
    position: absolute;
    left: 1%;
    top: 50%;
    transform: translate(0, -50%);
    height: 50%;

    img {
      height: 100%;
    }

    .left_text {
      width: 100%;
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.8vw;
      color: #fff;
      padding-left: 18%;
      line-height: 1.5vw;

      .left_text_title {
        font-size: 1vw;
        margin: 4% 0;
      }
    }
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
