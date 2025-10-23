import LoginViews from '@/views/Auth/LoginViews.vue'
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
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/Auth/ForgotPassword.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
  redirect: () => {
        const { currentUser } = useAuth()
        const u = currentUser()
        if (!u) return { name: 'login' }
        if (u.role === 'admin' || u.role === 'rh') return { name: 'dashboardadmin' }
        if (u.role === 'etudiant') return { name: 'dashboardstudent' }
        if (u.role === 'formateur' || u.role === 'formateur_principal') return { name: 'dashboardteacher' }
        return { name: 'dashboardadmin' }
      },
      children: [
        {
          path: '',
          name: 'dashboardadmin',
          component: () => import('../components/dashboard/DashboardAdmin.vue'),
          meta: { requiresAuth: true, roles: ['admin', 'rh'] },
        },
        {
          path: 'dashboard-rh',
          name: 'dashboard-rh',
          component: () => import('../components/dashboard/DashboardRH.vue'),
          meta: { requiresAuth: true, roles: ['rh', 'admin'] },
        },
        {
          path: 'dashboardstudent',
          name: 'dashboardstudent',
          component: () => import('../components/dashboard/DashboardStudent.vue'),
          meta: { requiresAuth: true, roles: ['etudiant'] },
        },
        {
          path: 'dashboardteacher',
          name: 'dashboardteacher',
          component: () => import('../components/dashboard/DashboardTeacher.vue'),
          meta: { requiresAuth: true, roles: ['formateur', 'formateur_principal'] },
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
      ],
    },
    {
      name: 'users',
      path: '/users',
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
          path: '/profile',
          component: () => import('../components/users/UserProfile.vue'),
        },
      ],
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
    // 404 catch-all
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router

// navigation guard for auth and role-based routes
import { useAuth as _useAuth } from '@/composables/auth'

router.beforeEach((to, from, next) => {
  const { isAuthenticated, currentUser } = _useAuth()
  const requiresAuth = to.meta?.requiresAuth
  if (requiresAuth && !isAuthenticated()) return next({ name: 'login' })
  const roles = to.meta?.roles
  if (roles) {
    const user = currentUser()
    if (!user) return next({ name: 'login' })
    const allowed = Array.isArray(roles) ? roles.includes(user.role) : user.role === roles
    if (!allowed) return next({ name: 'dashboard' })
  }
  next()
})
