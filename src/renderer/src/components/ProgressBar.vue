<template>
  <div class="progress_bar">
    <div class="line"></div>
    <div class="line line_bottom"></div>
    <div class="progress_bar_main">
      <div
        class="progress_bar_item"
        :class="{ progress_bar_item_comp: item.status }"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="progress_bar_main_img" :src="item.img" alt="" />
        <div class="progress_bar_main_text">{{ item.text }}</div>
        <img class="icon_comp" v-show="item.status" src="../assets/ui/circleCheckMark.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import img1 from '../assets/ui/product/oil.png'
import img2 from '../assets/ui/product/toothbrush.png'
import img3 from '../assets/ui/product/toothpaste.png'
import img4 from '../assets/ui/product/strawberry.png'
import img5 from '../assets/ui/product/bellPepper.png'
import img6 from '../assets/ui/product/pickles.png'
import img7 from '../assets/ui/product/cake.png'

const { t } = useI18n({})

const list = ref([
  { img: img1, text: t('Oil'), status: 1 },
  { img: img2, text: t('AdultToothbrush'), status: 0 },
  { img: img3, text: t('ChildToothbrush'), status: 0 },
  { img: img4, text: t('Strawberry'), status: 0 },
  { img: img5, text: t('Pepper'), status: 0 },
  { img: img6, text: t('Pickles'), status: 0 },
  { img: img7, text: t('Cake'), status: 0 }
])
</script>
<style lang="scss">
.progress_bar {
  position: fixed;
  box-sizing: border-box;
  z-index: 999;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 112px;
  background: linear-gradient(90deg, rgba(102, 170, 255, 0.5) 0%, rgba(88, 148, 223, 0.65) 100%);
  .line {
    background: linear-gradient(
      90deg,
      rgba(145, 243, 250, 0.5) 0%,
      rgba(103, 221, 245, 1) 49%,
      rgba(145, 243, 250, 0.5) 100%
    );
    position: absolute;
    width: 100%;
    height: 4.46px;
    top: 0;
  }
  .line_bottom {
    top: unset;
    bottom: 0;
  }
  .progress_bar_main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .progress_bar_item_comp {
      .progress_bar_main_img,
      .progress_bar_main_text {
        opacity: 0.3;
      }
    }
    .progress_bar_item {
      position: relative;
      width: 609px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 3px solid #979797;
      &:last-child {
        border-right: 3px solid #979797;
      }
      .progress_bar_main_img {
        height: 90px;
      }
      .progress_bar_main_text {
        font-size: 46px;
        color: #fff;
      }
      .icon_comp {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 60px;
      }
    }
  }
}
</style>
