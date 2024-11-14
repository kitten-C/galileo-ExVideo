<script setup>
import { onMounted, ref } from 'vue'

const MokeExternalParameters = {
  id: 111111,
}

const externalParameters = ref({})
window.electron.onSetFolderPath((params) => {
  console.log('params', params)
  if (import.meta.env.MODE === 'development') {
    externalParameters.value = MokeExternalParameters
  } else {
    externalParameters.value = params
  }
})

onMounted(() => {
  window.dll({ name: 'treadmillDll', function: 'InitTreadmill', data: [] })

  // window.dll({ name: 'treadmillDll', function: 'setStartMark', data: [] })

  // window.dll({ name: 'treadmillDll', function: 'setStartMark', data: [] })
})
</script>

<template>
  <div>
    app
  </div>

</template>
