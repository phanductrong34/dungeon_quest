import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Admin from '../views/Admin.vue'
import Sprite from '../views/Sprite.vue'

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
    path: '/game',
    name: 'Game',
    component: Game
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
