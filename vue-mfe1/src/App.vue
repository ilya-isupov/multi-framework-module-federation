<template>
  <div id="app">
    <p>
      <router-link to="/user/foo">/user/foo</router-link>
      <router-link to="/user/foo/profile">/user/foo/profile</router-link>
      <router-link to="/user/foo/posts">/user/foo/posts</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
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
