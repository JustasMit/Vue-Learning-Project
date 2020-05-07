<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Type here and press enter"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div v-if="$store.state.loading" class="lds-spinner">
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
    <transition-group
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <todo-item
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!remaining"
      >
      </todo-item>
    </transition-group>

    <div class="extra-container">
      <TodoCheckAll></TodoCheckAll>
      <TodoItemsRem></TodoItemsRem>
    </div>

    <div class="extra-container">
      <TodoFiltered></TodoFiltered>
      <TodoClearCom></TodoClearCom>
    </div>

    <label class="extra-container">
      To edit double click on item. <br />
      To cancel edit press ESC. <br />
      Click checkbox to set item as completed. <br />
    </label>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoItemsRem from "./TodoItemsRem";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCom from "./TodoClearCom";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoItemsRem,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCom
  },
  data() {
    return {
      newTodo: ""
    };
  },
  created() {
    this.$store.dispatch("retrieveTodos");
  },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    enableClearButton() {
      return this.$store.getters.enableClearButton;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        alert("Please write something");
        return;
      }
      this.$store.dispatch("addTodo", {
        title: this.newTodo
      });
      this.newTodo = "";
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 20px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid lightgray;
  margin-left: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  &:focus {
    outline: 0;
  }
}

.completed {
  text-decoration: line-through;
  color: lightgray;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgray;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

//spinner
.lds-spinner {
  color: official;
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: auto;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #41b883;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
