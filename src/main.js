import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store} from '@/store/index'
import {onAuthStateChanged,auth} from '@/firebase/config'
//import Toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const option = {
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true,
    position: "top-center",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 1.36,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
}

let app
onAuthStateChanged(auth,(_user) => {
    if(!app){
        app = createApp(App).use(store).use(router).use(Toast,option).mount('#app');
    }
    if(_user){
        store.dispatch('setCurrentUser', {
            user: _user
        })
    }
})


