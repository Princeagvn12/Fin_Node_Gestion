import LoginViews from '@/views/Auth/LoginViews.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import HomeViews from '@/views/HomeViews.vue'
import { createRouter, createWebHistory } from 'vue-router'
import  {useAuth}  from '@/composables/auth'
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
    },
    {
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
          path : 'dashboard-users',
          name : "dashboard-users",
          component : () => import('../components/dashboard/DashboardUser.vue')
        },
        {
          path : 'departements',
          name : "departements",
          component : () => import('../components/dashboard/DashboardDepartement.vue')
         , meta: { requiresAuth: true },
        },
        {
          path : 'coursdash',
          name : "coursdash",
          component : () => import('../components/dashboard/DashboardCours.vue')
        ,meta: { requiresAuth: true },
        },
        {
          path : 'student',
          name : "student",
          component : () => import('../views/StudentsViews.vue')
        ,meta: { requiresAuth: true },
        },
      ]
    }
  ,
    {
      name: 'admin',
      path: '/admin',
     component: () => import('../views/AdminViews.vue'),
      children:[
        {
          name:'user_depart',
          path:'',
          component:() =>import('../views/UsersDepartViews.vue')
        }
      ]
       
    },

    {
      name: 'users',
      path: '/users',
      component: () => import('../views/UsersViews.vue'),
    },

    {
      name: 'department',
      path: '/department',
      children: [
        {
          name: 'departform',
          path: 'departform',
          component: () => import('../components/departments/DepartmentForm.vue'),
        },
        {
          name: 'departlist',
          path: 'departlist',
          component: () => import('../components/departments/DepartmentList.vue'),
        },
      ],
      component: () => import('../views/DepartmentsViews.vue'),
    },
  ],
})

router.beforeEach(  async (to, from, next) =>{
  const auth = useAuth()
  await auth.fetchUser()
  if(to.meta.requiresAuth && !auth.isAuthenticated.value){
    next({name: 'login'})
  }else{
    next()
  }
})

export default router
