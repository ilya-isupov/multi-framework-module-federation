<template>
  <div>
    <ul v-if="!loading && users && users.length">
      <li v-for="user of users">
        <div class="user__links">
          <router-link :to="`/user/${user.id}`">{{user.name}}</router-link>
          <router-link :to="`/user/${user.id}/profile`">Profile {{user.name}}</router-link>
          <router-link :to="`/user/${user.id}/posts`">Posts by {{user.name}}</router-link>
        </div>
      </li>
    </ul>

    <p v-if="loading">
      Still loading..
    </p>
    <p v-if="error">
    </p>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent, onMounted, ref} from "vue";

export default {
  components: {
    Content: defineAsyncComponent(() => import("./components/Content")),
    Button: defineAsyncComponent(() => import("./components/Button")),
  },
  setup() {
    const users = ref(null);
    const loading = ref(true);
    const error = ref(null);

    function fetchData() {
      loading.value = true;
      return fetch('http://jsonplaceholder.typicode.com/users', {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      })
          .then(res => {
            if (!res.ok) {
              const error = new Error(res.statusText);
              error.json = res.json();
              throw error;
            }

            return res.json();
          })
          .then(json => {
            users.value = json;
          })
          .catch(err => {
            error.value = err;
            if (err.json) {
              return err.json.then(json => {
                error.value.message = json.message;
              });
            }
          })
          .then(() => {
            loading.value = false;
          });

    }

    onMounted(() => {
      fetchData();
    });

    return {
      users,
      loading,
      error
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

.user__links {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
