import LoginViews from '@/views/Auth/LoginViews.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import HomeViews from '@/views/HomeViews.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/',
      name: 'home',
      component: HomeViews,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViews,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView ,
    }
  ],
})

export default router
