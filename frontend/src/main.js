import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import du CSS Remix Icons
import 'remixicon/fonts/remixicon.css'
const app = createApp(App)

app.use(router)

app.mount('#app')
