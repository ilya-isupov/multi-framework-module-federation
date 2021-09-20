<template>
  <div>
    <p>
      <router-link to="/user/e123saASf2123s">User</router-link>
      <router-link to="/user/e123saASf2123s/profile">Profile</router-link>
      <router-link to="/user/e123saASf2123s/posts">Posts</router-link>
    </p>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
export default {
  components: {
    Content: defineAsyncComponent(() => import("./components/Content")),
    Button: defineAsyncComponent(() => import("./components/Button")),
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc,
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
