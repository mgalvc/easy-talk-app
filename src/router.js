import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./components/HomePage')
  },
  {
    path: '/room/:id',
    component: () => import('./components/ChatRoom')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router