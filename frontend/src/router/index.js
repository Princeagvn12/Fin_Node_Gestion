import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'admin',
      path: '/admin',
     component: () => import('../views/AdminViews.vue'),
      children:[
        {
          name:'user_depart',
          path:'',
          component:() =>import('../views/UsersDepartViews.vue')
        },
        {
          name:'courseslist',
          path:'courseslist',
          component:() =>import('../components/courses/CourseList.vue')
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
      
      ]
       
    },
  ],
})

export default router
