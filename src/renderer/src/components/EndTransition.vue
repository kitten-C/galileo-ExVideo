<template>
  <div v-show="show" class="end_transition">
    <div class="text_1">
      {{ num }}
    </div>
    <div class="text_2">
      {{ $t('TrainEndTip') }}
    </div>
    <audio v-show="false" :src="audioObj[locale]" controls autoplay></audio>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import audioCn from '../assets/audio/cn/end321.mp3'
import audioEn from '../assets/audio/en/end321.mp3'
const audioObj = {
  cn: audioCn,
  en: audioEn
}
const { locale } = useI18n()
const num = ref(3)
const show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
    setInterval(() => {
      const temp = Math.max(num.value - 1, 1)
      num.value = temp
    }, 1000)
  }, 2000)
})
</script>
<style lang="scss">
.end_transition {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  color: aqua;
  background-color: #000000d5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .text_1 {
    font-size: 344px;
    line-height: 344px;
  }

  .text_2 {
    margin-top: 1%;
    font-size: 55px;
    line-height: 55px;
  }
}
</style>
