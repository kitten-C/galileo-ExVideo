<template>
  <div class="product_item">
    <img class="bgc" src="../../assets/ui/training_image_tasktable.png" alt="" />
    <div class="product_item_main">
      <div class="title">下个目标</div>
      <div class="list">
        <div class="item" v-for="(item, index) in props.types" :key="index">
          <img class="item_img" :src="typeObj[item].img" alt="" />
          <div class="item_text">{{ typeObj[item].text }}</div>
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

const props = defineProps(['types'])
// const props = { types: ['toothbrush', 'toothpaste'] }

const typeObj = {
  oil: {
    img: img1,
    text: t('Oil')
  },
  toothbrush: {
    img: img2,
    text: t('AdultToothbrush')
  },
  toothpaste: {
    img: img3,
    text: t('ChildToothbrush')
  },
  strawberry: {
    img: img4,
    text: t('Strawberry')
  },
  bellPepper: {
    img: img5,
    text: t('Pepper')
  },
  pickles: {
    img: img6,
    text: t('Pickles')
  },
  cake: {
    img: img7,
    text: t('Cake')
  }
}
</script>
<style lang="scss">
.product_item {
  position: fixed;
  width: 1400px;
  height: 1000px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .product_item_main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 70px;
      color: #fff;
      margin-top: 88px;
    }
    .list {
      display: flex;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item_img {
      height: 510px;
      filter: drop-shadow(0px 0px 50px rgba(255, 255, 255, 0.5));
      margin-top: 36px;
    }
    .item_text {
      font-size: 60px;
      color: #fff;
      margin-top: 90px;
    }
  }

  .bgc {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
</style>
