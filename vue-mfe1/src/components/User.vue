<template>
  <div class="user">

    <p v-if="loading">
      Still loading..
    </p>
    <div v-if="!loading">
      <h2>User {{ user.name }}</h2>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "User",
  data() {
    return {
      loading: false,
      user: null,
      error: null,
      route: null
    }
  },
  methods: {
    fetchData() {
      this.error = this.user = null;
      this.loading = true
      fetch(`http://jsonplaceholder.typicode.com/users/${this.$route.params.id}`, {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      })
          .then(res => {
            if (!res.ok) {
              const error = new Error(res.statusText);
              this.error = res.json();
              throw error;
            }

            return res.json();
          })
          .then(json => {
            this.user = json;
          })
          .catch(err => {
            this.error = err;
            if (err.json) {
              return err.json.then(json => {
                this.error.message = json.message;
              });
            }
          })
          .then(() => {
            this.loading = false;
          });
    },
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        { immediate: true }
    )
  }

}
</script>

<style scoped>

</style>
