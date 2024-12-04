import './assets/main.css'
import i18n from './i18n'
import { createApp } from 'vue'
import App from './App.vue'
import '../utils/setRemBasedOnHeight'

const app = createApp(App)

app.use(i18n)
app.mount('#app')
