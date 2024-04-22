import './styles/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

createApp(App).mount('#app')
