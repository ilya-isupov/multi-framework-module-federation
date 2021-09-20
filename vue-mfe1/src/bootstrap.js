import Vue from "vue";
import VueRouter from "vue-router";
import UserHome from "./components/UserHome";
import UserProfile from "./components/UserProfile";
import UserPosts from "./components/UserPosts";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: App,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },

        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

new Vue({
  router,
  ...App
}).$mount("#app");
