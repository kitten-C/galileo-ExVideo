<template>
  <div>
    <ShoppingList v-if="shoppingListShow" />
    <ChoseProduct v-if="choseProductShow" :type="choseProductType" />
    <ProgressBar />
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
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import TimeComparator from '../../../utils/timeComparator'

const props = defineProps(['time'])

const shoppingListShow = ref(true)
const choseProductShow = ref(false)
const productItemShow = ref(false)
const blackTransitionShow = ref(false)

const productItemTypes = ref([])
const choseProductType = ref('')
const spiderSense = ref(Math.random())

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
  { time: 519, comp: 'BlackTransition' }
]
const configList2 = [
  { time: 32, video: 'video_211011_1' },
  { time: 97, video: 'video_211011_2' },
  { time: 124, video: 'video_211011_3' },
  { time: 175, video: 'video_211011_3', action: 'stop' },
  { time: 194, video: 'video_211011_4' },
  { time: 260, video: 'video_211011_4', action: 'stop' },
  { time: 291, video: 'video_211011_5' },
  { time: 355, video: 'video_211011_6' },
  { time: 421, video: 'video_211011_7' },
  { time: 451, video: 'video_211011_8' },
  { time: 506, video: 'video_211011_9' },
  { time: 520, video: 'video_211011_10' },
  { time: 532, video: 'video_211011_10' }
]
const configList3 = [
  { time: 187, type: 'down', option: 'oil' },
  { time: 271, type: 'down', option: 'toothpaste' },
  { time: 284, type: 'down', option: 'toothbrush' },
  { time: 393, type: 'down', option: 'strawberry' },
  { time: 415, type: 'down', option: 'bellPepper' },
  { time: 444, type: 'down', option: 'pickles' },
  { time: 502, type: 'down', option: 'cake' }
]
const timeCoparator = new TimeComparator(configList)
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
onMounted(() => {})
</script>
<style lang="scss"></style>
