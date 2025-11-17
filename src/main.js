import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'     // Tailwind ist hier schon aktiv
import App from './App.vue'
import { useGlobalStore } from './store/globalStore'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const globalStore = useGlobalStore()
globalStore.init()

app.mount('#app')

