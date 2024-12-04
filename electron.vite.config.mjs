import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import postcssPxtorem from 'postcss-pxtorem'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()],
    css: {
      postcss: {
        plugins: [
          postcssPxtorem({
            rootValue: 16, // 根元素的字体大小 (通常为 16px 或 10px)
            unitPrecision: 5, // 转换时保留的小数点位数
            propList: ['*'], // 哪些属性需要转换成 rem，['*'] 表示所有属性
            selectorBlackList: [], // 排除不进行 px 转换的选择器
            replace: true, // 是否直接替换原来的 px 值
            mediaQuery: false, // 是否允许在媒体查询中转换 px
            minPixelValue: 0
          })
        ]
      }
    },
    server: {
      fs: {
        // 允许为项目根目录的上一级提供服务
        allow: ['D:\\']
      }
    }
  }
})
