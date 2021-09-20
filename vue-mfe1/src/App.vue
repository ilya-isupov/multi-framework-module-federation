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

export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
