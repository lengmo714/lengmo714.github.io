<template>
    <div class="download">
        <div class="top-block">
            <div class="title">{{ pageConfig.downloadPage.title }}</div>
            <div class="desc">{{ pageConfig.downloadPage.desc }}</div>
            <div class="btn_group">
                <div class="btn_android" @click="toAndroid()">
                    <div class="btn-blur"></div>
                    <div class="btn_bg"></div>
                    <img :src="pageConfig.downloadPage.btn_android_img" alt="">
                    <div class="name">{{ pageConfig.downloadPage.btn_android_text }}</div>
                </div>
                <div class="btn_ios" @click="toIos()">
                    <div class="btn-blur"></div>
                    <div class="btn_bg"></div>
                    <img :src="pageConfig.downloadPage.btn_ios_img" alt="">
                    <div class="name">{{ pageConfig.downloadPage.btn_ios_text }}</div>
                </div>
                <div class="btn_telegram" @click="toTelegram()">
                    <div class="btn-blur"></div>
                    <div class="btn_bg"></div>
                    <img :src="pageConfig.downloadPage.btn_telegram_img" alt="">
                    <div class="name">{{ pageConfig.downloadPage.btn_telegram_text }}</div>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <div class="step-list">
                <div class="step-item" v-for="(item, index) in pageConfig.downloadPage.step_list" :key="index">
                    <div class="step-item-icon"></div>
                    <div class="step-item-star"></div>
                    <div class="step-item-next"></div>
                    <div class="step-item-desc">{{ item.desc }}</div>
                    <div class="step-item-img">
                        <img :src="item.img" alt="">
                    </div>
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
@imgBaseUrl: '@/assets/images/pc/download';

.download {
    min-width: 1200px;
    max-width: 1920px;
    margin: 0 auto;
    height: 1500px;
    background: url('@{imgBaseUrl}/UI_Web_Downland_Background.png') no-repeat,
    #000000;
    background-size: 100%;
    overflow: hidden;
    position: relative;
    top: -100px;


    .top-block {
        transform: translateY(100px);

        .title {
            margin: 100px auto 0;
            text-align: center;


            font-family: TrebuchetMS, TrebuchetMS;
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
            margin: 134px auto 200px;

            .btn_android {
                position: relative;
                width: 246px;
                height: 190px;
                margin-right: 30px;
                border-radius: 10px;
                overflow: hidden;
                cursor: pointer;
                // border: solid 2px rgba(14, 199, 9, 0.25);

                .btn_bg {
                    z-index: 3;
                    position: absolute;
                    top: 0;
                    width: 246px;
                    height: 190px;
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
                    z-index: 4;
                }

                .name {
                    font-family: TrebuchetMS;
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


            .btn_android:hover {
                background: url('@{imgBaseUrl}/UI_Web_Downland_btn_Android_active.png') no-repeat;
                background-size: 100%;
                // border: solid 2px rgba(14, 199, 9, 0.5);
            }

            .btn_ios {
                position: relative;
                width: 246px;
                height: 190px;
                margin-right: 30px;
                cursor: pointer;
                // background: url('@{imgBaseUrl}/UI_Web_Downland_btn_IOS.png') no-repeat;
                // background-size: 100%;
                border-radius: 10px;
                overflow: hidden;

                // border: solid 2px rgba(255, 255, 255, 0.25);
                .btn_bg {
                    z-index: 3;
                    position: absolute;
                    top: 0;
                    width: 246px;
                    height: 190px;
                    background: url('@{imgBaseUrl}/UI_Web_Downland_btn_IOS.png') no-repeat;
                    background-size: 100%;
                }

                img {
                    width: 50px;
                    height: 61px;
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 4;
                }

                .name {
                    font-family: TrebuchetMS;
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

            .btn_ios:hover {
                background: url('@{imgBaseUrl}/UI_Web_Downland_btn_IOS_active.png') no-repeat;
                background-size: 100%;
                // border: solid 2px rgba(255, 255, 255, 0.5);
            }

            .btn_telegram {
                position: relative;
                width: 246px;
                height: 190px;
                cursor: pointer;
                border-radius: 10px;
                overflow: hidden;
                // border: solid 2px rgba(35,143,243, 0.25);

                .btn_bg {
                    z-index: 3;
                    position: absolute;
                    top: 0;
                    width: 246px;
                    height: 190px;
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
                    z-index: 4;
                }

                .name {
                    font-family: TrebuchetMS;
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
                // border: solid 2px rgba(35,143,243, 0.50);
            }

            .btn-blur {
                position: absolute;
                width: 246px;
                height: 190px;
                z-index: 2;
                backdrop-filter: blur(10px);
            }

        }
    }

    .bottom-block {
        width: 1200px;
        margin: 0 auto;
        transform: translateY(100px);

        .step-list {
            display: flex;
            justify-content: space-between;
            padding: 0 50px;

            .step-item {
                position: relative;

                .step-item-icon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto;
                }

                .step-item-icon:hover {
                    // width: 80px;
                    // height: 80px;
                    transform: scale(1.2);
                }

                .step-item-next {
                    position: absolute;
                    top: 28px;
                    right: -180px;
                    width: 280px;
                    height: 10px;
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Guide_Line.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-star {
                    width: 26px;
                    height: 26px;
                    background: linear-gradient(to right, #5A21FF, #0090FF);
                    opacity: 0.35;
                    border-radius: 50%;
                }

                .step-item-desc {
                    position: relative;
                    z-index: 2;
                    // color: #D5D5D5;
                    color: #FFFFFF;
                    font-size: 20px;
                    text-align: center;
                    margin: 20px auto 0px;
                }

                .step-item-img {
                    margin: 0 auto;
                    width: 316px;
                    height: 216px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .step-item-intro {
                    font-size: 12px;
                    color: #B1B1B1;
                    width: 300px;
                    text-align: center;
                    white-space: pre-wrap;
                    line-height: 20px;
                }
            }

            .step-item:nth-child(1) {
                .step-item-icon {
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Step1.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-star {
                    position: absolute;
                    top: 70px;
                    left: 80px;
                }
            }

            .step-item:nth-child(2) {
                .step-item-icon {
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Step2.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-star {
                    position: absolute;
                    top: 70px;
                    left: 250px;
                }
            }

            .step-item:nth-child(3) {
                .step-item-icon {
                    background: url('@{imgBaseUrl}/UI_Web_Downland_Step3.png') no-repeat;
                    background-size: 100%;
                }

                .step-item-next {
                    display: none;
                }

                .step-item-star {
                    position: absolute;
                    top: 90px;
                    left: 90px;
                }
            }
        }
    }
}
</style>