<template>
  <div ref="mainRef" class="chose_product">
    <img class="bgc" :src="useObj.bgc" alt="" />
    <div class="bgs"></div>
    <img class="bgc1" :src="useObj.bgc" alt="" />
    <div v-show="isShowPointto" ref="pointtoWrapRef" class="pointto_wrap">
      <img class="pointto" src="../../assets/ui/product/pointTo.png" alt="" />
      <div class="pointto_main">
        <img class="product" :src="useObj.product" alt="" />
        <div class="text">
          {{ useObj.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import bgcOil from '../../assets/ui/cabinet/oil.png'
import productOil from '../../assets/ui/product/oil.png'
import bgcBellPepper from '../../assets/ui/cabinet/vegetable.png'
import productBellPepper from '../../assets/ui/product/bellPepper.png'
import bgcStrawberry from '../../assets/ui/cabinet/fruit.png'
import productStrawberry from '../../assets/ui/product/strawberry.png'
import bgcPickles from '../../assets/ui/cabinet/freezer.png'
import productPickles from '../../assets/ui/product/pickles.png'
import bgcToothbrush from '../../assets/ui/cabinet/toothpaste.png'
import productToothbrush from '../../assets/ui/product/toothbrush.png'
import productToothpaste from '../../assets/ui/product/toothpaste.png'
import bgcCake from '../../assets/ui/cabinet/cake.png'
import productCake from '../../assets/ui/product/cake.png'

const { t } = useI18n({})

const props = defineProps(['type'])
const pointtoWrapRef = ref()
const mainRef = ref()
const isShowPointto = ref(false)

const typeObj = {
  oil: {
    class: 'chose_product_oil',
    bgc: bgcOil,
    product: productOil,
    text: `$ 50/${t('Bottle')}`
  },
  bellPepper: {
    class: 'chose_product_bellPepper',
    initClass: 'chose_product_bellPepper_init',
    bgc: bgcBellPepper,
    product: productBellPepper,
    text: `$ 15/${t('Portion')}`
  },
  strawberry: {
    class: 'chose_product_strawberry',
    bgc: bgcStrawberry,
    product: productStrawberry,
    text: `$ 25/${t('Box')}`
  },
  pickles: {
    class: 'chose_product_pickles',
    initClass: 'chose_product_pickles_init',
    bgc: bgcPickles,
    product: productPickles,
    text: `$ 10/${t('Portion')}`
  },
  toothbrush: {
    class: 'chose_product_toothbrush',
    initClass: 'chose_product_toothbrush_init',
    bgc: bgcToothbrush,
    product: productToothbrush,
    text: `$ 20/${t('Box')}`
  },
  toothpaste: {
    class: 'chose_product_toothpaste',
    initClass: 'chose_product_toothpaste_init',
    bgc: bgcToothbrush,
    product: productToothpaste,
    text: `$ 10/${t('Piece')}`
  },
  cake: {
    class: 'chose_product_cake',
    initClass: 'chose_product_cake_init',
    bgc: bgcCake,
    product: productCake,
    text: `$ 20/${t('Box')}`
  }
}

const useObj = computed(() => {
  const type = props.type || 'cake'
  return typeObj[type]
})

onMounted(() => {
  mainRef.value.classList.add(useObj.value.initClass)
  setTimeout(() => {
    mainRef.value.classList.add(useObj.value.class)
  }, 0)

  setTimeout(() => {
    isShowPointto.value = true
  }, 5000)
})
</script>
<style lang="scss">
.chose_product {
  position: flex;
  height: 100%;
  width: 100%;
  z-index: 888;

  .bgc,
  .bgc1,
  .bgs {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .bgs {
    width: 100%;
    height: 100%;
    background-color: #000000cc;
  }
  .bgc1 {
    z-index: 3;
    clip-path: xywh(0 0 6710px 100%);
    transition: clip-path 5s linear;
  }
  .pointto_wrap {
    position: absolute;
    height: 570px;
    width: 1200px;
    z-index: 2;
    .pointto {
      width: 100%;
      height: 100%;
    }
    .product {
      height: 307px;
      position: absolute;
      left: 762.3px;
      top: 84px;
    }
    .text {
      font-size: 50px;
      color: #ffffff;
      position: absolute;
      left: 828px;
      top: 429px;
    }
  }
}
.chose_product_bellPepper_init {
  .bgc,
  .bgc1 {
    left: -4939px;
  }
  .bgc1 {
    clip-path: xywh(4939px 0 6710px 100%);
  }
}
.chose_product_bellPepper {
  .bgc1 {
    clip-path: xywh(7274px 892px 313px 926px round 20px);
  }
  .pointto_wrap {
    left: 2628px;
    top: 688px;
  }
}

.chose_product_oil {
  .bgc1 {
    clip-path: xywh(239px 892px 773px 926px round 20px);
  }
  .pointto_wrap {
    left: 1000px;
    top: 950px;
  }
}

.chose_product_strawberry {
  .bgc1 {
    clip-path: xywh(44px 903px 1269px 569px round 20px);
  }
  .pointto_wrap {
    left: 1315px;
    top: 713px;
    .product {
      left: 650px;
    }
  }
}
.chose_product_pickles_init {
  .bgc,
  .bgc1 {
    left: -6674px;
  }
  .bgc1 {
    clip-path: xywh(6674px 0 6710px 100%);
  }
}
.chose_product_pickles {
  .bgc1 {
    clip-path: xywh(9917px 768px 512px 1163px round 20px);
  }
  .pointto_wrap {
    left: 3758px;
    top: 610px;
  }
}
.chose_product_toothbrush_init {
  .bgc,
  .bgc1 {
    left: -2826px;
  }
  .bgc1 {
    clip-path: xywh(2826px 0 6710px 100%);
  }
}
.chose_product_toothbrush {
  .bgc1 {
    clip-path: xywh(6040px 699px 765px 346px round 20px);
  }
  .pointto_wrap {
    left: 3982px;
    top: 390px;
    .product {
      left: 650px;
    }
  }
}
.chose_product_toothpaste_init {
  .bgc,
  .bgc1 {
    left: -2826px;
  }
  .bgc1 {
    clip-path: xywh(2826px 0 6710px 100%);
  }
}
.chose_product_toothpaste {
  .bgc1 {
    clip-path: xywh(9333px 1204px 288px 638px round 20px);
  }
  .pointto_wrap {
    left: 5323px;
    top: 890px;
    .pointto {
      transform: rotateY(180deg);
    }
    .product {
      left: 90px;
    }
    .text {
      left: 185px;
    }
  }
}
.chose_product_cake_init {
  .bgc,
  .bgc1 {
    left: -3337px;
  }
  .bgc1 {
    clip-path: xywh(3337px 0 6710px 100%);
  }
}
.chose_product_cake {
  .bgc1 {
    clip-path: xywh(5991px 806px 404px 854px round 20px);
  }
  .pointto_wrap {
    left: 3054px;
    top: 674px;
    .product {
      left: 650px;
    }
  }
}
</style>
