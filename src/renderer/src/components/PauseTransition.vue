<template>
  <div class="pause_transition">
    <img class="image_pop" src="../assets/ui/training_image_pop.png" alt="">
    <img class="image_pause" src="../assets/ui/training_image_pause.png" alt="">
    <div class="text">{{ $t('Process_Exit_Tip') }}</div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.pause_transition {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #00000066;

  .image_pop,
  .image_pause,
  .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .image_pop {
    height: 1188.2px;
    top: 611px;
    z-index: 1;
  }

  .image_pause {
    height: 366px;
    top: 794px;
    z-index: 2;
  }

  .text {
    color: #fff;
    font-size: 83px;
    top: 1210px;
    z-index: 3;

  }
}
</style>