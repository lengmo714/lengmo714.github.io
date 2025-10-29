<template>
    <van-overlay :show="show" :z-index="9999">
        <div class="def-dialog" :class="isMobile() ? '' : 'pc'">
            <div class="def-dialog-message">{{ defaultDialog.message }}</div>
            <div class="def-dialog-btn" @click="close">{{ defaultDialog.btnText }}</div>
        </div>
    </van-overlay>
</template>

<script setup lang='ts'>
import useDialogStore from '@/stores/dialog'
import { isMobile } from '@/utils'

const { defaultDialog } = useDialogStore
const show = computed({
    get: () => defaultDialog.show,
    set: (val) => { defaultDialog.show = val },
});

const close = () => {
    show.value = false
    defaultDialog.cb && defaultDialog.cb()
}

</script>

<style lang='less' scoped>
.def-dialog {
    width: 400px;
    // height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 20px;
    background: #fff;
    // padding: 10px;
    box-sizing: border-box;

    .def-dialog-message {
        color: #222;
        font-size: 28px;
        text-align: center;
        margin-top: 20px;
        line-height: 40px;
        word-wrap: break-word;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
        padding: 10px 20px 30px;

    }

    .def-dialog-btn {
        font-size: 28px;
        text-align: center;
        line-height: 80px;
    }

    .def-dialog-btn:active {
        background: rgba(0, 0, 0, 0.1);
    }
}

.def-dialog.pc {
    width: 20vw;
    border-radius: 4px;

    .def-dialog-message {
        font-size: 8px;
        margin-top: 1px;
        line-height: 4vw;
        padding: 2px 4px 6px;
    }

    .def-dialog-btn {
        font-size: 1vw;
        line-height: 4vw;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>