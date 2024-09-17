import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosPlugin from './plugins/axiosPlugin';

const app = createApp(App)
app.use(axiosPlugin, { router })
app.use(router)
app.mount('#app')