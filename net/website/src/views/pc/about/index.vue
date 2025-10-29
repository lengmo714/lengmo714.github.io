<template>
    <div class="about">
        <div class="top-block">
            <div class="title">{{ pageConfig.aboutPage.title }}</div>
            <div class="desc">{{ pageConfig.aboutPage.desc }}</div>
            <div class="line"></div>
            <div class="intro">{{ pageConfig.aboutPage.intro }}</div>
        </div>
        <div class="bottom-block">
            <div class="bottom-bg">
                <!-- <div class="text">{{ pageConfig.aboutPage.activePlayer }}</div> -->
            </div>
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
@imgBaseUrl: '@/assets/images/pc/about';

.about {
    min-width: 1200px;
    max-width: 1920px;
    margin: 0 auto;
    padding-bottom: 254px;
    background: url('@{imgBaseUrl}/UI_Web_About_Background.png') no-repeat,
    #000000;
    background-size: 100%;
    overflow: hidden;
    position: relative;
    top: -100px;

    .top-block {
        position: absolute;
        top: 320px;
        left: 14%;

        .title {
            width: 412px;
            height: 32px;
            font-family: Trebuchet MS;
            font-weight: bold;
            font-size: 42px;
            color: #FFFFFF;
            margin-bottom: 28px;
        }

        .desc {
            width: 525px;
            height: 60px;
            font-family: Trebuchet MS;
            font-weight: bold;
            font-size: 26px;
            color: #0084FF;
            line-height: 40px;
        }

        .line {
            // margin-top: 140px;
            width: 40px;
            height: 5px;
            background: #0084FF;
            transform: translateY(90px);
        }

        .intro {
            margin-top: 103px;
            width: 592px;
            height: 45px;
            font-family: Trebuchet MS;
            font-weight: 400;
            font-size: 20px;
            color: #FFFFFF;
            line-height: 26px;
        }
    }

    .bottom-block {
        // width: 1200px;
        margin: 950px auto 0;
        position: relative;

        .bottom-bg {
            position: absolute;
            top: -431px;
            left: 0;
            width: 1920px;
            height: 861px;
            background: url('@{imgBaseUrl}/UI_Mobile_About_Date.png') no-repeat;
            background-size: 100%;
        }

        .intro-list {
            z-index: 2;
            position: relative;
            width: 1137px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;

            .intro-item {
                width: 370px;
                height: 162px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                text-align: center;
                margin-right: 59px;

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
                    font-family: Trebuchet MS;
                    font-weight: 400;
                    font-size: 22px;
                    color: #FFFFFF;
                    opacity: 0.75;
                }
            }

            .intro-item:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .intro-item:last-child{
                margin-right: 0px;
            }
        }
    }
}
</style>