import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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

createApp(App).use(store).use(router).use(Toast,option).mount('#app')
