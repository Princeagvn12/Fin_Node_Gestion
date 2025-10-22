import LoginViews from '@/views/Auth/LoginViews.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
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
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: RegisterView ,
    // },
    {
      path: '/register',
      name: 'register',
      component: RegisterView ,
    },
    {
      /*
     - /dashboard/rh
     - /dashboard/teacher
     - /dashboard/student
       */
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView ,
      children : [
        {
          path : '',
          name : "dashboardadmin",
          component : () => import('../components/dashboard/DashboardAdmin.vue')
        ,meta: { requiresAuth: true },
        },
        {
          path : 'dashboard-rh',
          name : "dashboard-rh",
          component : () => import('../components/dashboard/DashboardRH.vue')
        },
        {
          path : 'dashboardstudent',
          name : "dashboardstudent",
          component : () => import('../components/dashboard/DashboardStudent.vue')
         , meta: { requiresAuth: true },
        },
        {
          path : 'dashboardteacher',
          name : "dashboardteacher",
          component : () => import('../components/dashboard/DashboardTeacher.vue')
        ,meta: { requiresAuth: true },
        }
      ]
    }
  ],
})

export default router
