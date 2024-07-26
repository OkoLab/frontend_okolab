import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axiosPlugin from './plugins/axiosPlugin';

const pinia = createPinia()
const app = createApp(App)
app.use(axiosPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')