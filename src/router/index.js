import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue'),
        meta: {
            title: "首页"
        },
        children: []
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: "登录"
        },
        component: () => import('../views/login.vue')
    },
    {
        path: '/error',
        name: '404',
        meta: {
            title: "找不到页面"
        },
        component: () => import('../views/404.vue')
    },
    {
        path: '/*',
        redirect: "/error"
    },
    {
        path: '/table',
        name: 'Table',
        meta: {
            title: "表格"
        },
        component: () => import('../views/table/table.vue')
    },
    {
        path: '/chart',
        name: 'Chart',
        meta: {
            title: "大数据图"
        },
        component: () => import('../views/chart/chart.vue')
    },
    {
        path: '/editor',
        name: 'Editor',
        meta: {
            title: "在线编辑"
        },
        component: () => import('../views/editor/editor.vue')
    },
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})
router.beforeEach((to, from, next) => {
    const isLogin = sessionStorage.getItem("mytoken") ? true : false;
    if (to.path == "/home" || to.path == "/index/index1") {
        if (sessionStorage.getItem("mytoken")) {//如果缓存里有对应的key和value就可以访问页面
            next()
        } else {
            window.alert("请先登录")//没有直接跳到登录页面
            router.push("/login")
        }
    } else {
        next()
    }
})
router.afterEach((to, from) => {
    if (to.meta.title) {//title
        window.document.title = to.meta.title
    } else {
        window.document.title = "主页"
    }
})
export default router