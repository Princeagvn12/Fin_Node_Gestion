import LoginViews from '../views/Auth/LoginViews.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import HomeViews from '@/views/HomeViews.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/auth'

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
      component: RegisterView,
    },
    {
      /*
     - /dashboard/rh
     - /dashboard/teacher
     - /dashboard/student
       */
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: '',
          name: 'dashboardadmin',
          component: () => import('../components/dashboard/DashboardAdmin.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'dashboard-rh',
          name: 'dashboard-rh',
          component: () => import('../components/dashboard/DashboardRH.vue'),
        },
        {
          path: 'dashboardstudent',
          name: 'dashboardstudent',
          component: () => import('../components/dashboard/DashboardStudent.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'dashboardteacher',
          name: 'dashboardteacher',
          component: () => import('../components/dashboard/DashboardTeacher.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import('../views/AdminViews.vue'),
      children: [
        {
          name: 'user_depart',
          path: '',
          component: () => import('../views/UsersDepartViews.vue'),
        },
        {
          name: 'users',
          path: 'users',
          component: () => import('../views/UsersViews.vue'),

          children: [
            {
              name: 'useform',
              path: 'useform',
              component: () => import('../components/users/UserForm.vue'),
            },

            {
              name: 'uselist',
              path: 'uselist',
              component: () => import('../components/users/UserList.vue'),
            },
          
            {
              name: 'profile',
              path: 'profile',
              component: () => import('../components/users/UserProfile.vue'),
            },
          ],
        },

        {
          name: 'department',
          path: 'department',
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

         {
          name: 'courses',
          path: 'courses',
          component: () => import('../views/CoursesViews.vue'),

          children:[
            {
              name: 'coursesform',
              path: 'coursesform',
              component: () => import('../components/courses/CourseForm.vue'),
            },

            {
              name: 'courseslist',
              path: 'courseslist',
              component: () => import('../components/courses/CourseList.vue'),
            },
          ]
        },

        {
          name: 'hours',
          path: '/hours',
          component: () => import('../views/HoursViews.vue'),
        },
       
      ],  
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuth()
  await auth.fetchUser()
  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
