<template>
  <div>
    <ShoppingList v-if="shoppingListShow" />
    <ChoseProduct v-if="choseProductShow" :type="choseProductType" />
    <ProgressBar :time="props.time" :list="progressBarList" :configList="progressBarConfigList" />
    <ProductItem v-if="productItemShow" :types="productItemTypes" />
    <BlackTransition v-if="blackTransitionShow" :spiderSense="spiderSense" />
    <VoiceBroadcast :time="props.time" />
  </div>
</template>
<script setup>
import ShoppingList from './ShoppingList.vue'
import ChoseProduct from './ChoseProduct.vue'
import ProgressBar from '../ProgressBar.vue'
import ProductItem from './ProductItem.vue'
import VoiceBroadcast from './VoiceBroadcast.vue'
import BlackTransition from '../BlackTransition.vue'
import { inject, nextTick, onMounted, provide, ref, watchEffect } from 'vue'
import TimeComparator from '../../../utils/timeComparator'
import { useI18n } from 'vue-i18n'
import img1 from '../../assets/ui/product/oil.png'
import img2 from '../../assets/ui/product/toothbrush.png'
import img3 from '../../assets/ui/product/toothpaste.png'
import img4 from '../../assets/ui/product/strawberry.png'
import img5 from '../../assets/ui/product/bellPepper.png'
import img6 from '../../assets/ui/product/pickles.png'
import img7 from '../../assets/ui/product/cake.png'
const { t } = useI18n({})

const props = defineProps(['time'])
const mainProvide = inject('mainProvide')
const shoppingListShow = ref(true)
const choseProductShow = ref(false)
const productItemShow = ref(false)
const blackTransitionShow = ref(false)

const productItemTypes = ref([])
const choseProductType = ref('')
const spiderSense = ref(Math.random())

const resetFunList = []

const pushResetFunList = (fn) => {
  resetFunList.push(fn)
}

const configList = [
  { time: 34, comp: 'BlackTransition' },
  { time: 34, comp: 'ShoppingList', action: 'unshow' },
  { time: 96, comp: 'BlackTransition' },
  { time: 123, comp: 'BlackTransition' },
  { time: 170, comp: 'ProductItem', option: ['oil'], action: 'show' },
  { time: 175, comp: 'ProductItem', action: 'unshow' },
  { time: 175, comp: 'ChoseProduct', option: 'oil', action: 'show' },
  { time: 190, comp: 'ChoseProduct', action: 'unshow' },
  { time: 193, comp: 'BlackTransition' },
  { time: 199, comp: 'ProductItem', option: ['toothbrush', 'toothpaste'], action: 'show' },
  { time: 204, comp: 'ProductItem', action: 'unshow' },
  { time: 260, comp: 'ChoseProduct', option: 'toothpaste', action: 'show' },
  { time: 274, comp: 'ChoseProduct', option: 'toothpaste', action: 'unshow' },
  { time: 274, comp: 'ChoseProduct', option: 'toothbrush', action: 'show' },
  { time: 290, comp: 'ChoseProduct', action: 'unshow' },
  { time: 290, comp: 'BlackTransition' },
  { time: 354, comp: 'BlackTransition' },
  { time: 376, comp: 'ProductItem', option: ['strawberry'], action: 'show' },
  { time: 381, comp: 'ProductItem', action: 'unshow' },
  { time: 381, comp: 'ChoseProduct', option: 'strawberry', action: 'show' },
  { time: 396, comp: 'ChoseProduct', action: 'unshow' },
  { time: 398, comp: 'ProductItem', option: ['bellPepper'], action: 'show' },
  { time: 403, comp: 'ProductItem', action: 'unshow' },
  { time: 403, comp: 'ChoseProduct', option: 'bellPepper', action: 'show' },
  { time: 418, comp: 'ChoseProduct', action: 'unshow' },
  { time: 420, comp: 'BlackTransition' },
  { time: 427, comp: 'ProductItem', option: ['pickles'], action: 'show' },
  { time: 432, comp: 'ProductItem', action: 'unshow' },
  { time: 432, comp: 'ChoseProduct', option: 'pickles', action: 'show' },
  { time: 447, comp: 'ChoseProduct', action: 'unshow' },
  { time: 450, comp: 'BlackTransition' },
  { time: 482, comp: 'ProductItem', option: ['cake'], action: 'show' },
  { time: 487, comp: 'ProductItem', action: 'unshow' },
  { time: 487, comp: 'ChoseProduct', option: 'cake', action: 'show' },
  { time: 502, comp: 'ChoseProduct', action: 'unshow' },
  { time: 505, comp: 'BlackTransition' },
  { time: 519, comp: 'BlackTransition' },
  { time: 540, comp: 'ShoppingList' },
  { time: 540, action: 'reset', comp: 'reset' }
]

const progressBarList = ref([
  { img: img1, option: 'oil', text: t('Oil'), status: 0 },
  { img: img2, option: 'toothpaste', text: t('AdultToothbrush'), status: 0 },
  { img: img3, option: 'toothbrush', text: t('ChildToothbrush'), status: 0 },
  { img: img4, option: 'strawberry', text: t('Strawberry'), status: 0 },
  { img: img5, option: 'bellPepper', text: t('Pepper'), status: 0 },
  { img: img6, option: 'pickles', text: t('Pickles'), status: 0 },
  { img: img7, option: 'cake', text: t('Cake'), status: 0 }
])

const progressBarConfigList = [
  { time: 187, type: 'down', option: 'oil' },
  { time: 271, type: 'down', option: 'toothpaste' },
  { time: 284, type: 'down', option: 'toothbrush' },
  { time: 393, type: 'down', option: 'strawberry' },
  { time: 415, type: 'down', option: 'bellPepper' },
  { time: 444, type: 'down', option: 'pickles' },
  { time: 502, type: 'down', option: 'cake' }
]

const timeCoparator = new TimeComparator(configList)
const timeCoparator2 = new TimeComparator(progressBarConfigList)
const reset = () => {
  try {
    resetFunList.forEach((v) => {
      v()
    })
    nextTick(() => {
      progressBarList.value.forEach((v) => {
        v.status = 0
      })
    })
    timeCoparator.reset()
    timeCoparator2.reset()
  } catch (error) {
    console.error('reset >>', error)
  }
}
const actionFn = {
  unshow: {
    ShoppingList: () => {
      shoppingListShow.value = false
    },
    ProductItem: () => {
      productItemShow.value = false
    },
    ChoseProduct: () => {
      choseProductShow.value = false
    }
  },
  show: {
    ProductItem: (prarm) => {
      productItemTypes.value = prarm
      productItemShow.value = true
    },
    ChoseProduct: (prarm) => {
      choseProductType.value = prarm
      choseProductShow.value = true
    },
    BlackTransition: () => {
      blackTransitionShow.value === false && (blackTransitionShow.value = true)
      spiderSense.value = Math.random()
    }
  },
  reset: {
    reset: () => {
      console.log('supermarket reset')

      reset()
      mainProvide.deviceC.reset()
    }
  }
}
watchEffect(() => {
  const res = timeCoparator.compare(props.time)
  if (res.success) {
    nextTick(() => {
      const action = res.data.action || 'show'
      actionFn[action][res.data.comp](res.data.option)
    })
  }
})

watchEffect(() => {
  const res = timeCoparator2.compare(props.time)
  if (res.success) {
    nextTick(() => {
      const option = res.data.option
      progressBarList.value.forEach((item) => {
        if (item.option === option) {
          item.status = 1
        }
      })
    })
  }
})

onMounted(() => {})

provide('supermarket', {
  pushResetFunList
})
</script>
<style lang="scss"></style>
