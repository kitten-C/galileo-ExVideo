<template>
  <div ref="reference" class="black_transition "></div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps(['spiderSense'])
const reference = ref()

watchEffect(() => {
  console.log(props.spiderSense);
  
  if (props.spiderSense) {
    reference.value?.classList.add('show')
    setTimeout(() => {
      reference.value?.classList.remove('show')
    }, 2000)
  }
})
</script>
<style lang="scss">
.black_transition {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  opacity: 0;
  transition: all 2s ease-in-out;
  &.show {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
