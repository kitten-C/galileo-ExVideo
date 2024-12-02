<template>
  <div class="start_transition">
    <div class="text_1">
      {{ num }}
    </div>
    <div class="text_2">
      {{ $t('TrainStartTip') }}
    </div>
    <audio src="../assets/audio/en/ConsoleStop.mp3" controls></audio>
    <audio src="/audio/en/DeviceError.mp3" controls></audio>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
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
