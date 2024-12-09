<template>
  <div class="chose_product">
    <img class="bgc" :src="useObj.bgc" alt="" />
    <div class="bgs"></div>
    <img ref="bgc1Ref" class="bgc1" :src="useObj.bgc" alt="" />
    <div ref="pointtoWrapRef" class="pointto_wrap">
      <img ref="pointtoRef" class="pointto" src="../../assets/ui/product/pointTo.png" alt="" />
      <div class="pointto_main">
        <img ref="productRef" class="product" :src="useObj.product" alt="" />
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
const { t } = useI18n({})

const props = defineProps(['type'])
const bgc1Ref = ref()
const pointtoRef = ref()
const pointtoWrapRef = ref()

const typeObj = {
  oil: {
    bgc1Class: 'bgc1_oil',
    pointtoClass: 'pointto_oil',
    pointtoWrapClass: 'pointto_wrap_oil',
    productClass: 'product_oil',
    bgc: bgcOil,
    product: productOil,
    text: `$ 50/${t('Bottle')}`
  }
}

const useObj = computed(() => {
  const type = props.type || 'oil'
  return typeObj[type]
})

onMounted(() => {
  setTimeout(() => {
    bgc1Ref.value.classList.add(useObj.value.bgc1Class)
  }, 0)

  setTimeout(() => {
    pointtoWrapRef.value.classList.add(useObj.value.pointtoWrapClass)
  }, 5000)
})
</script>
<style lang="scss">
.chose_product {
  position: flex;
  height: 100%;
  width: 100%;
  z-index: 888;
  canvas {
    display: block;
    margin: 0 auto;
    // background: white;
  }
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
    transition: all 5s ease;
  }
  .pointto_wrap {
    position: absolute;
    height: 570px;
    width: 1200px;
    z-index: 2;
    display: none;
    .pointto {
      width: 100%;
      height: 100%;
    }
    .product {
      height: 307px;
      // width: 307px;
    }
  }

  .bgc1_oil {
    clip-path: xywh(239px 892px 773px 926px round 20px);
  }
  .pointto_wrap_oil {
    left: 1000px;
    top: 950px;
    display: block;
  }
}
</style>
