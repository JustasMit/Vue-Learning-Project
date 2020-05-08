<template>
  <div id="app" class="container">
    <div
      v-if="$store.state.loadingElse"
      class="lds-spinner"
      style="margin: 20px auto"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <img v-else alt="Vue logo" src="./assets/logo.png" class="logo" />
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600;
  margin: 0 auto;
  padding-left: 20%;
  padding-right: 20%;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 80px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 20px;
}
</style>
