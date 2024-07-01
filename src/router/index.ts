import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/threeLearning',
    name: 'threeLearning',
    component: () => import('../views/ThreeViews/textures.vue')
  },
  {
    path: '/galaxy',
    name: 'galaxy',
    component: () => import('../views/ThreeViews/galaxy.vue')
  },
  {
    path: '/toonMaterial',
    name: 'toonMaterial',
    component: () => import('../views/ThreeViews/toonMaterial.vue')
  },
  // {
  //   // path: '/',
  //   path: '/hauntedHouse',
  //   name: 'hauntedHouse',
  //   component: () => import('../views/ThreeViews/hauntedHouse.vue')
  // }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router