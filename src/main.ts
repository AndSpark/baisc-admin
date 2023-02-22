import '@abraham/reflection'
import { createApp } from 'vue'
import App from './app/App'
import './assets/tailwind.css'

const app = createApp(App)

app.mount('#app')
