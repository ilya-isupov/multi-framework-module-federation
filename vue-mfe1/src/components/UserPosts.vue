<template>
  <div>
    <p v-if="loading">
      Still loading..
    </p>
    <div v-if="!loading">
      <div  v-for="post of userPosts">
        <h4>{{ post.title }}</h4>
        <h5>{{ post.body }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPosts",
  data() {
    return {
      loading: false,
      userPosts: null,
      error: null,
      route: null
    }
  },
  methods: {
    fetchData() {
      this.error = this.user = null;
      this.loading = true
      fetch(`http://jsonplaceholder.typicode.com/posts?userId=${this.$route.params.id}`, {
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
            this.userPosts = json;
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
