# 安装

```bash
npm i yv-element --save
```

## 使用文档

https://yv-ui.y-y-y.online/
## 细节描述
在掘金上放了一个专栏用于描述开发过程<a href="https://juejin.cn/column/7358732381489315879">仿照Element Plus写一个组件库——Yv Element</a>
## 开始使用

**全局使用**

```js
// 引入所有组件
import YvElement from 'yv-element'
// 引入样式
import 'yv-element/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(YvElement).mount('#app')
```

```vue
<template>
  <yv-button>我是 Yv Button</yv-button>
</template>
```

**单个导入**

Yv Element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <Button>我是 Yv Button</Button>
</template>
<script>
import { Button } from 'yv-element'
import 'yv-element/dist/index.css'
export default {
  components: { Button }
}
</script>
```
