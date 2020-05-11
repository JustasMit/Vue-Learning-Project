<template>
  <div id="app" class="container">
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
  height: 75px;
}
</style>
