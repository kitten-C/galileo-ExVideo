<template>
  <div v-show="num > 0" class="start_transition">
    <div class="text_1">
      {{ num }}
    </div>
    <div class="text_2">
      {{ $t('TrainStartTip') }}
    </div>
    <audio
      v-show="false"
      :src="`src/assets/audio/${locale}/Start321.mp3`"
      controls
      autoplay
    ></audio>
    <!-- <audio :src="`src/assets/audio/${locale}/end321.mp3`" controls autoplay></audio> -->
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const num = ref(3)
onMounted(() => {
  setInterval(() => {
    num.value -= 1
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
    font-size: 10vw;
    line-height: 10vw;
  }

  .text_2 {
    margin-top: 1%;
    font-size: 1.2vw;
    line-height: 1.2vw;
  }
}
</style>
