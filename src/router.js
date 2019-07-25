import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login.vue'
import home from './components/Home.vue'
import welcome from './components/Welcome.vue'
import users from './components/user/Users.vue'
import rights from './components/power/Rights.vue'
import roles from './components/power/Roles.vue'
import cate from './components/goods/Cate.vue'
import list from './components/goods/List.vue'
import params from './components/goods/params.vue'
import add from './components/goods/Add.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: login },
        {
            path: '/home',
            component: home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: welcome },
                { path: '/users', component: users },
                { path: '/rights', component: rights },
                { path: '/roles', component: roles },
                { path: '/categories', component: cate },
                { path: '/goods', component: list },
                { path: '/goods/add', component: add },
                { path: '/params', component: params }

            ]
        },
    ]
})

//挂载路有导航守卫**********************
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router