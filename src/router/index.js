import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
            title: '首页'
        },
        children: []
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const whiteList = ['/login']

router.beforeEach(async (to,from) => {
  return true
})

export default router
