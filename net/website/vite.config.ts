import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue'
import pxtorem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", 'vue-router'],
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      resolvers: [],
      vueTemplate: true,
      // 配置文件生成位置(false:关闭自动生成)
      // dts: false,
      dts: "src/auto-imports.d.ts",
    }),
  ],
  css: {
    // 处理的选项
    postcss: {
      plugins: [
        // autoprefixer(),
        // 使用 pxtorem库进行转换
        pxtorem({
          rootValue: 75,
          propList: ['*'],
          selectorBlackList: ['canvas'], // 不进行px转换的选择器
          exclude: './src/views/pc'
        }),

      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    sourcemap: false
  },
})
