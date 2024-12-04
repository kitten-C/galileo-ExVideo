<template>
  <div v-show="num > 0" class="start_transition">
    <div class="text_1">
      {{ num }}
    </div>
    <div class="text_2">
      {{ $t('TrainStartTip') }}
    </div>
    <audio v-show="false" :src="audioObj[locale]" controls autoplay></audio>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import audioCn from '../assets/audio/cn/Start321.mp3'
import audioEn from '../assets/audio/en/Start321.mp3'
const audioObj = {
  cn: audioCn,
  en: audioEn
}
const { locale } = useI18n()
const num = ref(3)
onMounted(() => {
  setInterval(() => {
    // num.value -= 1
  }, 1000)
})
</script>
<style lang="scss">
.start_transition {
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
    margin-top: 90px;
    font-size: 55px;
    line-height: 55px;
  }
}
</style>
