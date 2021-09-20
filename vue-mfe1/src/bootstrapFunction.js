import {createApp} from "vue";
import App from "./App"
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import UserPosts from "./components/UserPosts";
import {createRouter, createMemoryHistory, createWebHistory} from "vue-router";


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


export default (refElement, props, base) => {
    const router = createRouter({
        history: createWebHistory(base),
        routes
    })
    const app = createApp(App, {
        data: () => {
            return (this.props || {});
        }
    });
    app.use(router);
    app.mount(refElement);
}
