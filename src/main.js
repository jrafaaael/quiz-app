import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VWave from "v-wave";

import './assets/icons'

createApp(App)
.use(VWave, {
    color: "rgba(255, 255, 255, 0.75)"
})
.use(store)
.use(router)
.mount('#app')
