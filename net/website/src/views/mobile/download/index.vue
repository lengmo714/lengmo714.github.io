<template>
    <div class="download">
        <div class="top-block">
            <!-- <div class="title">{{ pageConfig.downloadPage.title }}</div>
            <div class="desc">{{ pageConfig.downloadPage.desc }}</div> -->
            <div class="btn_group">
                <div class="btn_android" v-if="getDeviceType() === 'Android'" @click="toAndroid">
                    <div class="btn-bg"></div>
                    <div class="btn-blur"></div>
                    <img :src="pageConfig.downloadPage.btn_android_img" alt="">
                    <div class="name">{{ pageConfig.downloadPage.btn_android_text }}</div>
                </div>
                <div class="btn_ios" v-else @click="toIos">
                    <div class="btn-bg"></div>
                    <div class="btn-blur"></div>
                    <img :src="pageConfig.downloadPage.btn_ios_img" alt="">
                    <div class="name">{{ pageConfig.downloadPage.btn_ios_text }}</div>
                </div>
                <div class="btn_telegram" @click="toTelegram">
                    <div class="btn-bg"></div>
                    <div class="btn-blur"></div>
                    <img :src="pageConfig.downloadPage.btn_telegram_img" alt="">
                    <div class="name">{{ pageConfig.downloadPage.btn_telegram_text }}</div>
                </div>
            </div>
            <div class="banner-border-radius"></div>
        </div>
        <div class="bottom-block">
            <div class="bottom-view">
                <div class="intro-item" v-for="(item, index) in pageConfig.downloadPage.step_list">
                    <img :src="item.img" alt="">
                </div>
                <div class="zhuangshi-01"></div>
                <div class="zhuangshi-02"></div>
            </div>
            <div class="step-list">
                <div class="step-item" v-for="(item, index) in pageConfig.downloadPage.step_list" :key="index">
                    <div class="step-item-icon"></div>
                    <div class="step-item-next"></div>
                    <div class="step-item-desc">{{ item.desc }}</div>
                    <div class="step-item-circle"></div>
                    <div class="step-item-intro">
                        {{ item.intro }}
                    </div>
                </div>
            </div>
            <div class="round-star"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import pageConfig from '@/config/conf_page';
import { getDeviceType } from '@/utils'
import { showDefaultDialog } from '@/utils';
import { LogicTool } from '@/utils/LogicTool';

enum jumpType {
    Zero,
    Cur,
    Blank,
}

function toAndroid() {
    LogicTool.clickAndroid()
}
function toTelegram() {
    LogicTool.clickTelegram()
}
function toIos() {
    LogicTool.clickIos()
}

// 导航到指定的URL
function toLink(url: string) {
    if (url.length == 0) {
        showDefaultDialog(pageConfig.tips.come_tips)
        return
    }

    if (pageConfig.global.jump_type === jumpType.Cur) {
        location.href = url
    } else if (pageConfig.global.jump_type === jumpType.Blank) {
        window.open(url);
    }
}
</script>

<style lang="less" scoped>
@imgBaseUrl: '@/assets/images/mobile/download';

.download {
    width: 100%;
    margin: 0 auto;
    // height: 1300px;
    background: url('@{imgBaseUrl}/UI_Mobile_Downland_Background.png') no-repeat,
    #000000;
    background-size: 100%;
    overflow: hidden;
    position: relative;
    top: -135px;

    .top-block {
        margin-bottom: 230px;
        position: relative;
        // overflow: hidden;

        .title {
            margin: 100px auto 0;
            text-align: center;


            font-family: Roboto;
            font-weight: bold;
            font-size: 52px;
            color: #397AFF;
            text-align: center;
            font-style: normal;
            text-transform: none;

        }

        .desc {
            color: #D5D5D5;
            font-size: 18px;
            text-align: center;
        }

        .btn_group {
            display: flex;
            justify-content: center;
            margin: 384px auto 0;

            .btn_android {
                position: relative;
                width: 247px;
                height: 192px;
                margin-right: 30px;
                cursor: pointer;
                border-radius: 10px;
                overflow: hidden;

                .btn-bg {
                    width: 100%;
                    height: 100%;
                    background: url('@{imgBaseUrl}/UI_Web_Downland_btn_Android.png') no-repeat;
                    background-size: 100%;
                }

                img {
                    width: 52px;
                    height: 61px;
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .name {
                    font-family: Roboto;
                    font-size: 18px;
                    color: #FFFFFF;
                    line-height: 0px;
                    text-align: center;
                    font-style: normal;
                    text-transform: none;
                    position: absolute;
                    top: 140px;
                    width: 100%;
                    z-index: 2;
                }
            }


            .btn_android:active {
                background: url('@{imgBaseUrl}/UI_Web_Downland_btn_Android_active.png') no-repeat;
                background-size: 100%;
            }

            .btn_ios {
                position: relative;
                width: 247px;
                height: 192px;
                margin-right: 30px;
                cursor: pointer;
                border-radius: 10px;
                overflow: hidden;

                .btn-bg {
                    width: 100%;
                    height: 100%;
                    background: url('@{imgBaseUrl}/UI_Web_Downland_btn_IOS.png') no-repeat;
                    background-size: 100%;
                }

                img {
                    width: 50px;
                    height: 60px;
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .name {
                    font-family: Roboto;
                    font-size: 18px;
                    color: #FFFFFF;
                    line-height: 0px;
                    text-align: center;
                    font-style: normal;
                    text-transform: none;
                    position: absolute;
                    top: 140px;
                    width: 100%;
                    z-index: 2;
                }
            }

            .btn_ios:active {
                background: url('@{imgBaseUrl}/UI_Web_Downland_btn_IOS_active.png') no-repeat;
                background-size: 100%;
            }


            .btn_telegram {
                position: relative;
                width: 247px;
                height: 192px;
                cursor: pointer;
                border-radius: 10px;
                overflow: hidden;

                .btn-bg {
                    width: 100%;
                    height: 100%;
                    background: url('@{imgBaseUrl}/UI_Web_Downland_btn_Telegram.png') no-repeat;
                    background-size: 100%;
                }

                img {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    z-index: 2;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .name {
                    font-family: Roboto;
                    font-size: 18px;
                    color: #FFFFFF;
                    line-height: 0px;
                    text-align: center;
                    font-style: normal;
                    text-transform: none;
                    position: absolute;
                    top: 140px;
                    width: 100%;
                    z-index: 2;
                }
            }

            .btn_telegram:hover {
                background: url('@{imgBaseUrl}/UI_Web_Downland_btn_Telegram_active.png') no-repeat;
                background-size: 100%;
            }

            .btn-blur {
                position: absolute;
                width: 246px;
                height: 190px;
                z-index: 2;
                backdrop-filter: blur(10px);
            }

        }

        .banner-border-radius {
            position: absolute;
            bottom: -230px;
            width: 100%;
            height: 60px;
            border-radius: 50px 50px 0 0;
            // background: red;
            // border: solid 1px rgba(255, 255, 255, 0.2);
            border-bottom: none;
            box-sizing: border-box;
            box-shadow: 0px 0px 2px 0px #C8E5FF;
        }
    }

    .bottom-block {
        margin: 0 auto;
        width: 100%;
        position: relative;
        top: -2px;
        background: #000000;
        z-index: 2;
        // height: 1155px;

        .bottom-view {
            height: 266px;
            position: relative;

            .intro-item {
                width: 201px;
                height: 138px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .intro-item:nth-child(1) {
                position: absolute;
                top: 40px;
                left: 46px;
            }

            .intro-item:nth-child(2) {
                position: absolute;
                top: 40px;
                left: 274px;
            }

            .intro-item:nth-child(3) {
                position: absolute;
                top: 40px;
                left: 503px;
            }

            .zhuangshi-01 {
                width: 165px;
                height: 146px;
                position: absolute;
                top: 66px;
                left: 171px;
                background: url('@{imgBaseUrl}/UI_Mobile_Dowland_Guide_Image.png') no-repeat;
                background-size: 100%;
            }

            .zhuangshi-02 {
                width: 165px;
                height: 146px;
                position: absolute;
                top: 1px;
                left: 414px;
                background: url('@{imgBaseUrl}/UI_Mobile_Dowland_Guide_Image2.png') no-repeat;
                background-size: 100%;
            }
        }

        .step-list {
            width: 100%;
            // padding-left: 63px;
            box-sizing: border-box;

            .step-item {
                position: relative;
                overflow: hidden;

                .step-item-icon {
                    position: absolute;
                    left: 63px;
                    width: 60px;
                    height: 60px;
                }

                .step-item-icon:hover {
                    // width: 80px;
                    // height: 80px;
                    transform: scale(1.2);
                }

                .step-item-next {
                    position: absolute;
                    top: 70px;
                    left: 87px;
                    width: 8px;
                    height: 167px;
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Guide_Line.png') no-repeat;
                    background-size: 100% 100%;
                }

                .step-item-circle {
                    position: absolute;
                    width: 26px;
                    height: 26px;
                    background: #2495FF;
                    opacity: 0.25;
                    border-radius: 50%;
                }

                .step-item-desc {
                    position: absolute;
                    top: 21px;
                    left: 130px;

                    font-family: Roboto;
                    font-weight: bold;
                    font-size: 24px;
                    color: #FFFFFF;
                    line-height: 30px;
                    text-align: left;
                }

                .step-item-intro {
                    // position: absolute;
                    // top: 71px;
                    // left: 130px;
                    margin: 71px 130px 50px;
                    width: 580px;
                    font-family: Roboto;
                    font-size: 20px;
                    color: #A6A6A6;
                    line-height: 24px;
                    text-align: left;
                    white-space: pre-wrap;
                }
            }

            .step-item:nth-child(1) {
                .step-item-icon {
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Step1.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-circle {
                    top: 5px;
                    left: 143px;
                }
            }

            .step-item:nth-child(2) {

                .step-item-icon {
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Step2.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-circle {
                    top: 1px;
                    left: 218px;
                }

                .step-item-intro {
                    margin-bottom: 30px;
                }
            }

            .step-item:nth-child(3) {
                .step-item-icon {
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Step3.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-circle {
                    top: 8px;
                    left: 157px;
                }

                .step-item-next {
                    display: none;
                }
            }
        }
    }
}
</style>