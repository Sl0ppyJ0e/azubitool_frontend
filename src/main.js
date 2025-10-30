import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'     // Tailwind ist hier schon aktiv
import App from './App.vue'
import { useGlobalStore } from './stores/globalStore'
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

const app = createApp(App)
app.component('flat-pickr', FlatPickr) // dann <flat-pickr .../>
app.use(createPinia())
app.use(router)

const globalStore = useGlobalStore()
globalStore.init()

app.mount('#app')

