<script setup>
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import Timer from '../utils/timer'
import { TreadmillDLLControl, SixAxisDLLControl } from '../utils/dLLControl'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import transitionManager from '../utils/transitionManager'
import { useI18n } from 'vue-i18n'
import { config } from '../utils'
import Supermarket from './components/supermarket/index.vue'
import TimeComparator from '../utils/timeComparator'

console.log('config', config)

const { locale } = useI18n()
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
  distance: 0,
  rotationX: 0,
  rotationY: 0,
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 0
})
let timer
let treadmillDLLControl
let sixAxisDLLControl
const deviceConfig = ref({})

const externalParameters = ref({})
const countdownFormat = computed(() => {
  return dayjs.duration(countdown.value).format('HH:mm:ss')
})
const deviceC = {
  async start() {
    console.log('start')
    await transitionManager.start()
    console.log('start transitionManager done')
    deviceC.continue()
    audioRef.value.play()
  },
  async stop() {
    console.log('stop')
    await transitionManager.end()
    console.log('stop transitionManager done')
    deviceC.pause()
    nextTick(() => {
      window.electron.quit()
    })
  },
  pause(type) {
    if (type !== 'reset') transitionManager.pause()
    videoRef.value.pause()
    timer.pause()
    console.log('videoRef.value?.currentTime', videoRef.value?.currentTime)
    treadmillDLLControl?.pause()
    sixAxisDLLControl?.restore()
  },
  continue() {
    transitionManager.continue()
    videoRef.value.play()
    timer.start()
    treadmillDLLControl?.continue()
  },
  addVal() {
    treadmillDLLControl?.addVal()
  },
  delVel() {
    treadmillDLLControl?.delVel()
  },
  reset() {
    treadmillDLLControl?.reset()
    sixAxisDLLControl?.reset()
    deviceC.pause('reset')
    deviceC.continue()
  }
}

const handleTime = (time, untime) => {
  countdown.value = time
  showTimeText.value = untime / 1000

  let timeParam = showTimeText.value

  if (externalParameters.value.id == '211011') {
    timeParam = showTimeText.value - 34
  }

  const videoCurrentTime = videoRef.value?.currentTime
  const treadmillRes = treadmillDLLControl.handleCompare(timeParam)
  const sixAxisRes = sixAxisDLLControl?.handleCompare(timeParam)
  // console.log('handleTime!!!', untime, videoCurrentTime, treadmillRes, sixAxisRes)
  if (sixAxisRes?.success) {
    const sixAxisData = sixAxisRes.data
    const {
      acc: [rotationX, rotationY],
      angle: [accelerationX, accelerationY, accelerationZ]
    } = sixAxisData
    leftText.value.rotationX = Math.floor(rotationX * 100) / 100
    leftText.value.rotationY = Math.floor(rotationY * 100) / 100
    leftText.value.accelerationX = Math.floor(accelerationX * 100) / 100
    leftText.value.accelerationY = Math.floor(accelerationY * 100) / 100
    leftText.value.accelerationZ = Math.floor(accelerationZ * 100) / 100
  }
}

const onComplete = () => {
  deviceC.stop()
}

const initMedia = () => {
  const up = import.meta.env.MODE === 'development' ? '/@fs' : 'file://'
  const id = externalParameters.value.id
  console.log('id', id)

  if (id == '211011') {
    videoSrc.value = `${up}/${config.filePath}/video_${id}_0.mp4`
  } else {
    videoSrc.value = `${up}/${config.filePath}/video_${id}.mp4`
    videoRef.value?.addEventListener('ended', () => {
      deviceC.reset()
    })
  }
  audioSrc.value = `${up}/${config.filePath}/video_${id}.mp3`

}

const initDLLControl = (_config) => {
  _config.treadmill.fileData &&
    (treadmillDLLControl = new TreadmillDLLControl(_config.treadmill.fileData))
  _config.sixAxis.fileData && (sixAxisDLLControl = new SixAxisDLLControl(_config.sixAxis.fileData))
}

const initUpdaeLeftText = () => {
  window.fileAPI.updateDeviceSpeed((value) => {
    // console.log('updateDeviceSpeed', value)

    leftText.value.speed = Math.floor(value * 100) / 100
  })
  window.fileAPI.updateDeviceDistance((value) => {
    // console.log('updateDeviceDistance', value)

    leftText.value.distance = Math.floor(value * 100) / 100
  })
  window.fileAPI.updateDeviceWarn(() => {
    // console.log('updateDeviceDistance')
    deviceC.pause()
  })
  window.mqtt.continue(() => {
    console.log('window.mqtt.continue')
    deviceC.continue()
  })
  window.mqtt.pause(() => {
    console.log('window.mqtt.stop')
    deviceC.pause()
  })
  window.mqtt.close(() => {
    console.log('window.mqtt.close')
    deviceC.stop()
  })
}

const getDeviceConfig = async () => {
  const res = await window.fileAPI.getDeviceConfig()
  console.log('res', res)

  res.forEach((element) => {
    deviceConfig.value[element.name] = element
  })
}

const changeLanguage = () => {
  locale.value = externalParameters.value.Language
}
const configList = [
  { time: 35, video: 'video_211011_1' },
  { time: 97, video: 'video_211011_2' },
  { time: 124, video: 'video_211011_3' },
  { time: 194, video: 'video_211011_4' },
  { time: 291, video: 'video_211011_5' },
  { time: 355, video: 'video_211011_6' },
  { time: 421, video: 'video_211011_7' },
  { time: 451, video: 'video_211011_8' },
  { time: 506, video: 'video_211011_9' },
  { time: 520, video: 'video_211011_10' },
  { time: 532, video: 'video_211011_10' }
]
const timeCoparator = new TimeComparator(configList)
watchEffect(() => {
  // console.log('showTimeText', showTimeText.value)
  const id = externalParameters.value.id
  if (id != '211011') return
  const res = timeCoparator.compare(showTimeText.value)
  // console.log('res', res)
  if (res.success) {
    const up = import.meta.env.MODE === 'development' ? '/@fs' : 'file://'
    videoSrc.value = `${up}/${config.filePath}/${res.data.video}.mp4`
    nextTick(() => {
      videoRef.value.play()
    })
  }
})

onMounted(async () => {
  await getDeviceConfig()
  const options = await window.fileAPI.getOptions()
  externalParameters.value = options
  console.log('externalParameters.value', externalParameters.value)
  changeLanguage()
  initDLLControl(deviceConfig.value)
  initMedia()
  countdown.value = externalParameters.value.time
  timer = new Timer(externalParameters.value.time, 100, handleTime, onComplete)
  initUpdaeLeftText()
  // deviceC.start()
})
</script>

<template>
  <div class="main">
    <video ref="videoRef" :src="videoSrc" :loop="false"></video>
    <audio ref="audioRef" :src="audioSrc" loop></audio>
    <div class="btns">
      <button @click="deviceC.continue">继续</button>
      <button @click="deviceC.pause">暂停</button>
      <button @click="deviceC.start">开始</button>
      <button @click="deviceC.stop">退出</button>
    </div>
    <div class="top">
      <img src="./assets/ui/training_nav.png" />
      <div class="top_text">{{ countdownFormat }}</div>
    </div>
    <div class="left">
      <img src="./assets/ui/training_left.png" />
      <div class="left_text">
        <div class="left_text_title">{{ $t('DataGroundTitle') }}</div>
        <div>{{ $t('DataUpDownTitle') }}{{ leftText.rotationX }}mm</div>
        <div>{{ $t('DataLeftRightTitle') }}{{ leftText.rotationY }}mm</div>
        <div>{{ $t('DataFrontBackTitle') }}{{ leftText.accelerationX }}mm</div>
        <div>{{ $t('DataAngleXTitle') }}{{ leftText.accelerationY }}°</div>
        <div>{{ $t('DataAngleYTitle') }}{{ leftText.accelerationZ }}°</div>
        <div class="left_text_title">{{ $t('DataStepTitle') }}</div>
        <div>{{ $t('DataStepMoveTitle') }}{{ leftText.distance }}m</div>
        <div>{{ $t('DataStepSpeedTitle') }}{{ leftText.speed }}m/s</div>
      </div>
    </div>
    <div class="bottom">
      {{ $t(`${deviceConfig?.base?.fileData?.introduction_name || ''}`) }}
    </div>
    <Supermarket :time="showTimeText" v-if="externalParameters.id == 211011" />
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
    z-index: 999;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 196px;

    img {
      height: 100%;
    }

    .top_text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 84px;
      color: #fff;
      display: flex;
    }
  }

  .left {
    position: absolute;
    z-index: 999;
    left: 1%;
    top: 50%;
    transform: translate(0, -50%);
    height: 907.86px;

    img {
      height: 100%;
    }

    .left_text {
      width: 100%;
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 43px;
      color: #fff;
      padding-left: 40px;

      .left_text_title {
        font-size: 57px;
        margin: 20px 0;
      }
    }
  }

  .bottom {
    position: absolute;
    top: 2164px;
    left: 50%;
    transform: translate(-50%, 0);
    color: #fff;
    font-size: 65px;
    z-index: 999;
  }

  .btns {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 50%;
    z-index: 9999;

    button {
      border: 1px solid #ccc;
      padding: 20px;
      margin-left: 20px;
      cursor: pointer;
      font-size: 40px;
    }
  }
}
</style>
