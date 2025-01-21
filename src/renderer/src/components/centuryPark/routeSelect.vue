<template>
  <div class="route_select">
    <img class="router_select_1" :src="router_select_1" alt="" />
    <div class="title">路线选择</div>
    <mapMark class="map_mark" :showList="props.showList" />
    <div class="select_btns">
      <div
        v-for="(item, index) in btnList"
        :key="index"
        class="select_btn"
        @click="century_park.setShowList(index)"
      >
        <div class="select_btn_left">
          <div class="select_0" v-if="!props.showList?.[index]"></div>
          <img class="select_1" v-else :src="select_1" alt="" />
        </div>
        <div class="select_btn_right">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'
import router_select_1 from '../../assets/ui/router_select_1.png'
import select_1 from '../../assets/ui/select_1.png'
import mapMark from './mapMark.vue'
const props = defineProps(['showList'])
const century_park = inject('century_park')

const btnList = [
  { text: '镜天湖' },
  { text: '云帆桥' },
  { text: '‌闻莺桥' },
  { text: '世纪小道' },
  { text: '蒙特利尔园' },
  { text: '湖畔小道' },
  { text: '公园出口' }
]
</script>
<style lang="scss">
.route_select {
  position: fixed;
  width: 2600px;
  height: 1660px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .map_mark {
    position: absolute;
    left: 118px;
    top: 400px;
  }

  .router_select_1 {
    width: 100%;
    height: 100%;
  }

  .title {
    position: absolute;
    left: 50%;
    top: 85px;
    transform: translateX(-50%);
    font-size: 60px;
    color: #fff;
  }

  .select_btns {
    position: absolute;
    width: 1014px;
    height: 590px;
    left: 1452px;
    top: 494px;
    display: flex;
    flex-wrap: wrap;

    .select_btn {
      width: 50%;
      font-size: 60px;
      color: #fff;
      display: flex;
      align-items: center;
      cursor: pointer;

      .select_btn_left {
        width: 80px;
        height: 80px;

        .select_0 {
          width: 100%;
          height: 100%;
          border-radius: 15.17px;
          border: 10px solid #fff;
        }

        .select_1 {
          width: 100%;
          height: 100%;
        }
      }

      .select_btn_right {
        margin-left: 45px;
      }
    }
  }
}
</style>
