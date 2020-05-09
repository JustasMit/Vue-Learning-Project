<template>
  <div id="app">
    <ul class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/todo">App</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 20px;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.nav {
  display: flex;
  list-style: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  background-color: lightblue;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
}
.nav a {
  color: lightyellow;
  padding: 0 25px;
  font-size: 14;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
