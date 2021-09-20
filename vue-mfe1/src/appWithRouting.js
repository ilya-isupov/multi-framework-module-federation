import Vue from "vue";
import VueRouter from "vue-router";
import UserProfile from "./components/UserProfile";
import UserPosts from "./components/UserPosts";
import App from "./App.vue";
import User from "./components/User";

Vue.config.productionTip = false;
Vue.use(VueRouter)

const router = new VueRouter({
    routes:  [
        {
            path: '/user/:id',
            component: User,
            children: [
                {
                    // при совпадении пути с шаблоном /user/:id/profile
                    // в <router-view> компонента User будет показан UserProfile
                    path: 'profile',
                    component: UserProfile
                },
                {
                    // при совпадении пути с шаблоном /user/:id/posts
                    // в <router-view> компонента User будет показан UserPosts
                    path: 'posts',
                    component: UserPosts
                }
            ]
        }
    ]
})


export default (elRef) => {
    new Vue({
        router,
        ...App
    }).$mount(elRef);
}
