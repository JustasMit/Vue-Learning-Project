<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>

        <b-nav-item v-if="loggedIn" :to="{ name: 'todo' }">App</b-nav-item>

        <b-nav-item v-if="!loggedIn" :to="{ name: 'login' }">Login</b-nav-item>

        <b-nav-item v-if="!loggedIn" :to="{ name: 'register' }"
          >Register</b-nav-item
        >

        <b-nav-item v-if="loggedIn" :to="{ name: 'logout' }">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 20px;
}
@media (max-width: 768px) {
  .mg-clr {
    margin-top: 10px;
  }
}
@media (min-width: 768px) {
  .mg-r {
    margin-right: 10px;
  }
}
.col-lg-2 {
  margin-top: 20px;
}
.container-sm {
  margin-top: 100px;
}
</style>
