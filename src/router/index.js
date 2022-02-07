import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Admin from '../views/Admin.vue'
import Sprite from '../views/Sprite.vue'
import { useRoute } from 'vue-router'
import {store} from '@/store/index' 
const route = useRoute();


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/game/:id',
    props: true,
    name: 'Game',
    component: Game,
    beforeEnter: (to, from, next)=>{
      if(!from.name ||  store.getters['gameData/getMap'](to.params.id) == null){
        next({name: 'Menu'})
      }else next();
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
