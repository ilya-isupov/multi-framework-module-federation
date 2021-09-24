import { createApp } from "vue";
import App from "./App.vue";
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import UserPosts from "./components/UserPosts"
import {createWebHistory, createRouter, createMemoryHistory} from "vue-router";



const routes = [
    {
        path: '/user/:id',
        component: User,
        children: [
            {
                path: 'profile',
                component: UserProfile,
            },
            {
                path: 'posts',
                component: UserPosts,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


const app = createApp(App);
app.use(router)
app.mount("#app");
