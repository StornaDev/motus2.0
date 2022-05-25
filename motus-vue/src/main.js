import { createApp } from 'vue'
import App from './App.vue'
window.axios = require('axios');
import router from "./router";
import store from "./store"

createApp(App).use(router).use(store).mount('#app')
