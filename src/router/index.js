import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: 'electron-vue'
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about/index.vue'),
    meta: {
      title: '关于我们'
    },
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList = ['/login']

router.beforeEach(async (to, from) => {
  const {meta} = to
  if(meta && meta.title){
    document.title = meta.title
  }
  return true
})

export default router
