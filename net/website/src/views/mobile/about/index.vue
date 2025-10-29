<template>
    <div class="about">
        <div class="top-block">
            <div class="title">{{ pageConfig.aboutPage.title }}</div>
            <div class="desc">{{ pageConfig.aboutPage.desc }}</div>
            <!-- <div class="line"></div> -->
            <!-- <div class="intro">{{ pageConfig.aboutPage.intro }}</div> -->
        </div>
        <div class="banner-border-radius"></div>
        <div class="bottom-block">
            <div class="bottom-block-bg"></div>
            <div class="title">
                <div class="text">{{ pageConfig.aboutPage.activePlayer }}</div>
            </div>
            <div class="desc">
                <div class="text">{{ pageConfig.aboutPage.intro }}</div>
            </div>
            <div class="circular"></div>
            <div class="intro-list">
                <div class="intro-item" v-for="(item, index) in conf_page.aboutPage.intro_list" :key="index">
                    <!-- <div class="intro-item-title">{{ item.title }}</div> -->
                    <div class="intro-item-title">
                        <img :src="item.titleImg" alt="">
                    </div>
                    <div class="intro-item-desc">{{ item.desc }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import conf_page from '@/config/conf_page';
import pageConfig from '@/config/conf_page';
</script>

<style lang="less" scoped>
@imgBaseUrl: '@/assets/images/mobile/about';

.about {
    width: 100%;
    // height: 1800px;
    margin: 0 auto;
    background: url('@{imgBaseUrl}/UI_Mobile_About_Background.png') no-repeat,
    #000000;
    background-size: 100%;
    overflow: hidden;
    position: relative;
    top: -135px;

    .top-block {
        position: absolute;
        top: 271px;
        left: 47px;

        .title {
            width: 412px;
            height: 32px;
            font-family: Roboto;
            font-weight: bold;
            font-size: 42px;
            color: #FFFFFF;
            margin-bottom: 28px;
        }

        .desc {
            width: 376px;
            font-family: Roboto;
            font-weight: bold;
            font-size: 22px;
            color: #0083FF;
            line-height: 35px;
            text-align: left;
        }

        .line {
            margin-top: 80px;
            width: 40px;
            height: 5px;
            background: #0084FF;
        }

        .intro {
            margin-top: 103px;
            width: 592px;
            height: 45px;
            font-family: Roboto;
            font-weight: 400;
            font-size: 20px;
            color: #FFFFFF;
            line-height: 26px;
        }
    }


    // .banner-border-radius {
    //     position: absolute;
    //     top: 560px;
    //     width: 100%;
    //     height: 60px;
    //     border-radius: 50px 50px 0 0;
    //     // background: red;
    //     border: solid 1px rgba(255, 255, 255, 0.2);
    //     border-bottom: none;
    //     box-sizing: border-box;
    // }

    .bottom-block {
        margin-top: 600px;
        position: relative;
        // border: solid 1px rgba(255, 255, 255, 0.2);
        border-radius: 50px 50px 0 0;
        background: #000000;
        padding-top: 76px;
        
        box-sizing: border-box;
        box-shadow: 0px 0px 2px 0px #C8E5FF;

        .bottom-block-bg {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@{imgBaseUrl}/bottom_block_bg.png') no-repeat;
            background-size: 100%;

        }

        .title {
            font-family: Roboto-Bold;
            font-weight: bold;
            font-size: 40px;
            color: #FFFFFF;
            text-align: center;

            background-image: linear-gradient(90deg, #0090FF 0%, #5A21FF 100%);
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            -moz-box-decoration-break: clone;
            color: transparent;
            position: relative;
        }

        .desc {
            width: 537px;
            font-family: Roboto;
            font-size: 24px;
            color: #FFFFFF;
            line-height: 30px;
            text-align: center;
            margin: 10px auto 20px;
            font-weight: 400;
        }

        .circular {
            position: absolute;
            top: 384px;
            left: 50%;
            transform: translateX(-50%);
            width: 165px;
            height: 165px;
            background: url('@{imgBaseUrl}/bottom_block_circular.png') no-repeat;
            background-size: 100%;
        }

        .intro-list {
            // width: 1137px;
            height: 600px;
            margin: 0 auto;
            position: relative;
            top: -44px;

            .intro-item {
                width: 270px;
                height: 162px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                text-align: center;

                .intro-item-title {
                    margin-top: 30px;
                    font-weight: bold;
                    font-size: 58px;
                    color: #0084FF;

                    img {
                        height: 40px;
                    }
                }

                .intro-item-desc {
                    font-family: Roboto;
                    font-weight: 400;
                    font-size: 22px;
                    color: #FFFFFF;
                    opacity: 0.75;
                }
            }

            .intro-item:active {
                background: rgba(255, 255, 255, 0.1);
            }

            .intro-item:nth-child(1) {
                position: absolute;
                top: 54px;
                left: 50%;
                transform: translateX(-50%);
                width: 370px;
                height: 162px;
            }

            .intro-item:nth-child(2) {
                position: absolute;
                top: 283px;
                left: 72px;
            }

            .intro-item:nth-child(3) {
                position: absolute;
                top: 283px;
                left: 409px;
            }
        }
    }
}
</style>