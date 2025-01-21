<template>
  <div class="map_mark">
    <img class="map_main" :src="map" alt="" />
    <img
      v-for="(imgItem, imgIndex) in list"
      :src="imgItem"
      :class="`map_route${imgIndex} route`"
      v-show="props.showList?.[imgIndex]"
      alt=""
    />
  </div>
</template>
<script setup>
import map from '../../assets/ui/map.png'
import route1 from '../../assets/ui/training_image_route1.png'
import route2 from '../../assets/ui/training_image_route2.png'
import route3 from '../../assets/ui/training_image_route3.png'
import route4 from '../../assets/ui/training_image_route4.png'
import route5 from '../../assets/ui/training_image_route5.png'
import route6 from '../../assets/ui/training_image_route6.png'
import route7 from '../../assets/ui/training_image_route7.png'

const props = defineProps(['showList'])
const list = [route1, route2, route3, route4, route5, route6, route7]
</script>
<style lang="scss" scoped>
.map_mark {
  position: fixed;
  top: 97.98px;
  left: 5413px;
  width: 1095.19px;
  // width: 1095.19px;
  height: 852.88px;
  .map_main {
    width: 100%;
    height: 100%;
  }
  .route {
    position: absolute;
  }
  .map_route0 {
    width: 88px;
    height: 57px;
    left: 345.36px;
    top: 341.44px;
  }
  .map_route1 {
    width: 117px;
    height: 63px;
    left: 424.36px;
    top: 353.44px;
  }
  .map_route2 {
    width: 145px;
    height: 158px;
    left: 531.36px;
    top: 372.44px;
  }
  .map_route3 {
    width: 141px;
    height: 115px;
    left: 652.36px;
    top: 337.44px;
  }
  .map_route4 {
    width: 33px;
    height: 86px;
    left: 771.36px;
    top: 448.44px;
  }
  .map_route5 {
    width: 479px;
    height: 113px;
    left: 300.36px;
    top: 523.44px;
  }
  .map_route6 {
    width: 80px;
    height: 192px;
    left: 301.36px;
    top: 342.44px;
  }
}
</style>
