<template>
  <div class="shopping_list">
    <div class="bgs"></div>
    <div class="title">{{ $t('ShopList') }}</div>
    <div class="item_wrap">
      <img src="../../assets/ui/training_image_tasktable.png" alt="" class="item_wrap_bgc" />
      <div v-for="(item, index) in list" :key="index" class="item">
        <img class="item_bgc" src="../../assets/ui/training_image_tasktable2.png" alt="" />
        <div class="item_c">
          <img class="item_img" :src="item.img" alt="" />
          <div class="item_text">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import img1 from '../../assets/ui/product/oil.png'
import img2 from '../../assets/ui/product/toothbrush.png'
import img3 from '../../assets/ui/product/toothpaste.png'
import img4 from '../../assets/ui/product/strawberry.png'
import img5 from '../../assets/ui/product/bellPepper.png'
import img6 from '../../assets/ui/product/pickles.png'
import img7 from '../../assets/ui/product/cake.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({})

const list = [
  { img: img1, text: t('Oil') },
  { img: img2, text: t('AdultToothbrush') },
  { img: img3, text: t('ChildToothbrush') },
  { img: img4, text: t('Strawberry') },
  { img: img5, text: t('Pepper') },
  { img: img6, text: t('Pickles') },
  { img: img7, text: t('Cake') }
]
</script>
<style lang="scss">
.shopping_list {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .bgs {
    width: 100%;
    height: 100%;
    background-color: #00000066;
  }

  .title {
    text-align: center;
    font-size: 71.38px;
    color: #fff;
    margin-top: 430px;
    position: relative;
    z-index: 2;
  }
  .item_wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 1660px;
    width: 2600px;
    padding: 274px 215px 0 215px;
    display: grid;
    grid-template-columns: repeat(4, 460px);
    grid-template-rows: repeat(2, 420px);
    gap: 110px;
  }
  .item_wrap_bgc,
  .item_bgc {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .item {
    position: relative;
    .item_c {
      position: relative;
      z-index: 3;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item_img {
        height: 300px;
        z-index: 3;
        filter: drop-shadow(0px 0px 50px rgba(255, 255, 255, 0.5));
      }
      .item_text {
        font-size: 40px; 
        color: #fff;
      }
    }
  }
}
</style>
