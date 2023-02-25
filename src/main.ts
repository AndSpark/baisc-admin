import '@abraham/reflection'
import { createApp } from 'vue'
import App from './app/App'
import setupPlugins from './plugins'
import './assets/styles/global/index.css'

const app = createApp(App)
setupPlugins(app)
app.mount('#app')
