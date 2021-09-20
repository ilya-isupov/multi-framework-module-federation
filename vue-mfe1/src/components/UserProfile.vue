<template>
<div>

  <p v-if="loading">
    Still loading..
  </p>
  <div v-if="!loading">
    <h3>Address: {{userProfile.address.street + " " + userProfile.address.suite}}</h3>
    <h3>email: {{userProfile.email}}</h3>
    <h3>phone: {{userProfile.phone}}</h3>

  </div>


</div>
</template>

<script>
export default {
  name: "UserProfile",

  data() {
    return {
      loading: false,
      userProfile: null,
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
            this.userProfile = json;
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
