<template>
  <div class="voice_broadcast">
    <audio ref="audioRef" :src="audioSrc"></audio>
  </div>
</template>
<script setup>
import { nextTick, ref, watchEffect } from 'vue'
import TimeComparator from '../../../utils/timeComparator'
import { getLocalMedia } from '../../../utils'
const props = defineProps(['time'])
const audioSrc = ref()
const audioRef = ref()
const configList = [
  { time: 0.01, audio: 'video_211011_1.mp3' },
  { time: 42, audio: 'video_211011_2.mp3' },
  { time: 98, audio: 'video_211011_3.mp3' },
  { time: 168, audio: 'video_211011_5.mp3' },
  { time: 176, audio: 'video_211011_6.mp3' },
  { time: 188, audio: 'video_211011_7.mp3' },
  { time: 194, audio: 'video_211011_8.mp3' },
  { time: 258, audio: 'video_211011_3.mp3' },
  { time: 260, audio: 'video_211011_9.mp3' },
  { time: 273, audio: 'video_211011_10.mp3' },
  { time: 286, audio: 'video_211011_11.mp3' },
  { time: 290, audio: 'video_211011_12.mp3' },
  { time: 374, audio: 'video_211011_13.mp3' },
  { time: 380, audio: 'video_211011_14.mp3' },
  { time: 394, audio: 'video_211011_15.mp3' },
  { time: 403, audio: 'video_211011_16.mp3' },
  { time: 416, audio: 'video_211011_17.mp3' },
  { time: 425, audio: 'video_211011_18.mp3' },
  { time: 432, audio: 'video_211011_19.mp3' },
  { time: 445, audio: 'video_211011_20.mp3' },
  { time: 480, audio: 'video_211011_21.mp3' },
  { time: 490, audio: 'video_211011_22.mp3' },
  { time: 507, audio: 'video_211011_23.mp3' },
  { time: 524, audio: 'video_211011_24.mp3' },
]

const timeCoparator = new TimeComparator(configList)

watchEffect(() => {
  const res = timeCoparator.compare(props.time)
  if (res.success) {
    audioSrc.value = getLocalMedia(res.data.audio)
    nextTick(() => {
      audioRef.value.play()
    })
  }
})
</script>
<style lang="scss"></style>
