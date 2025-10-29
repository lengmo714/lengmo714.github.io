<template>
  <div class="layout">
    <PCView v-if="isPC" />
    <MobileView v-else />
    <DefLoading />
    <DefDialog />
  </div>
</template>

<script setup lang='ts'>
import PCView from '@/views/pc/index.vue'
import MobileView from '@/views/mobile/index.vue'
import DefLoading from '@/components/def-loading.vue'
import DefDialog from '@/components/def-dialog.vue'
const isPC = ref(false)

checkPageSize()
document.body.style.background = '#000000'
window.addEventListener('resize', checkPageSize)

function checkPageSize() {
  const vwWidth = document.documentElement.clientWidth
  if (vwWidth <= 800) {
    isPC.value = false
  } else {
    isPC.value = true
  }
}

</script>

<style lang='less' scoped></style>