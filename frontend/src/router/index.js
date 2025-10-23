// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HoursViews from '../views/HoursViews.vue'
// Autres imports...

const routes = [
  { path: '/hours', name: 'hours', component: HoursViews },
  // ...autres routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
