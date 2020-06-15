import Vue from 'vue'
import VueRouter from 'vue-router'
//注册 vue-router
import swiper from "../components/swiper.vue"
import songs from "../components/songs.vue"
import mv from "../components/mv.vue"
import comment from "../components/comment.vue"
import player from "../components/player.vue"
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path: '/',
            component: swiper//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/swiper',
            component: swiper//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/songs',
            component: songs//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/mv',
            component: mv//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/comment',
            component: comment//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/player',
            component: player//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        }
    ]
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router