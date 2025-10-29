<template>
  <van-overlay :show="show" :z-index="9999">
    <div class="def-loading" :class="isMobile() ? '' : 'pc'"></div>
  </van-overlay>
</template>

<script setup lang='ts'>
import useDialogStore from '@/stores/dialog'
import { isMobile } from '@/utils'

const { defaultLoading } = useDialogStore
const show = computed({
  get: () => defaultLoading.show,
  set: (val) => { defaultLoading.show = val },
});

</script>

<style lang='less' scoped>
.def-loading {
  width: 40px;
  height: 40px;
  background: url('@/assets/images/default/loading_new.svg') no-repeat;
  background-size: 100%;
  animation: rotate 1.4s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.def-loading.pc {
  width: 10px;
  height: 10px;
}

@keyframes rotate {
  0% {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }

  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}
</style>