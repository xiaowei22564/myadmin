import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//防重点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user.vue'),
                    meta: { title: '用户模块' }
                },
                {
                    path: '/weather',
                    component: () => import(/* webpackChunkName: "weather" */ '../components/page/weather.vue'),
                    meta: { title: '天气查询' }
                },
                {
                    path: '/vmstat',
                    component: () => import(/* webpackChunkName: "vmstat" */ '../components/page/vmstat.vue'),
                    meta: { title: 'vm命令数据' }
                },
                {
                    path: '/result',
                    component: () => import(/* webpackChunkName: "vmstat" */ '../components/page/result.vue'),
                    meta: { title: '性能结果' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '消息中心' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
