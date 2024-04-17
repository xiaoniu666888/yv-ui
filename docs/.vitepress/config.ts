import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'V Element',
  description: 'A VitePress Site',
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    footer: {
      message: '<a href="https://beian.miit.gov.cn/">津ICP备20000929号-1</a>',
      copyright:
        'Copyright © 2019-present <a href="https://coding.imooc.com/class/693.html">慕课网 & 张轩</a>'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/components/button' },
      { text: '课程', link: 'https://coding.imooc.com/class/693.html' }
    ],

    sidebar: [
      {
        text: 'V Element 组件列表',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Message 消息', link: '/components/message' },
          { text: 'Input 文字输入', link: '/components/input' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Form 表单', link: '/components/form' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
