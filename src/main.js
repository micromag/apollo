import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import'./use/useIcons'
import router from './router/router'
import { auth } from './use/useFirebase'


let app;

auth.onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App)
        app.use(router)
        app.mount('#app')
    }
})