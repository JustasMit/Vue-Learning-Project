<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Type here and press enter"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <todo-item
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!remaining"
      >
      </todo-item>
    </transition-group>

    <div class="extra-container">
      <TodoCheckAll :remaining="remaining"></TodoCheckAll>
      <TodoItemsRem :remaining="remaining"></TodoItemsRem>
    </div>

    <div class="extra-container">
      <TodoFiltered></TodoFiltered>
      <TodoClearCom :enableClearButton="enableClearButton"></TodoClearCom>
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
import { EventBus } from "./event-bus.js";
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
      newTodo: "",
      idForTodo: 3,
      beforeEdit: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Asdasd",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Gfgawg",
          completed: false,
          editing: false
        },
        {
          id: 3,
          title: "Twgwgwa",
          completed: false,
          editing: false
        }
      ]
    };
  },
  created() {
    EventBus.$on("removedTodo", index => this.removeTodo(index));
    EventBus.$on("finishedEdit", data => this.finishEdit(data));
    EventBus.$on("checkAllChanged", checked => this.checkAll(checked));
    EventBus.$on("filterChanged", filterNew => (this.filter = filterNew));
    EventBus.$on("clearCompleted", () => this.clearCompleted());
  },
  beforeDestroy() {
    EventBus.$off("removedTodo", index => this.removeTodo(index));
    EventBus.$off("finishedEdit", data => this.finishEdit(data));
    EventBus.$off("checkAllChanged", checked => this.checkAll(checked));
    EventBus.$off("filterChanged", filterNew => (this.filter = filterNew));
    EventBus.$off("clearCompleted", () => this.clearCompleted());
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    todosFiltered() {
      switch (this.filter) {
        case "active":
          return this.todos.filter(todo => !todo.completed);
        case "completed":
          return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    enableClearButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        alert("Please write something");
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAll() {
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
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
</style>
