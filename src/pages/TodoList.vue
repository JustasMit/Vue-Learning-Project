<template>
  <div class="container-sm">
    <b-form-input
      size="lg"
      type="text"
      style="margin-bottom: 20px"
      placeholder="Type here and press enter"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />

    <b-list-group>
      <b-list-group-item>
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
      </b-list-group-item>
      <b-list-group-item>
        <b-row>
          <b-col>
            <TodoCheckAll></TodoCheckAll>
          </b-col>
          <b-col>
            <TodoItemsRem class="float-right"></TodoItemsRem>
          </b-col>
        </b-row>
      </b-list-group-item>
      <b-list-group-item>
        <b-row>
          <b-col cols="12" md="8">
            <TodoFiltered></TodoFiltered>
          </b-col>
          <b-col cols="12" md="4">
            <TodoClearCom></TodoClearCom>
          </b-col>
        </b-row>
      </b-list-group-item>
      <b-list-group-item>
        <label>
          To edit double click on item. <br />
          To cancel edit press ESC. <br />
          Click checkbox to set item as completed. <br />
        </label>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem";
import TodoItemsRem from "../components/TodoItemsRem";
import TodoCheckAll from "../components/TodoCheckAll";
import TodoFiltered from "../components/TodoFiltered";
import TodoClearCom from "../components/TodoClearCom";

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
    this.$store.dispatch("todo/retrieve");
  },
  computed: {
    remaining() {
      return this.$store.getters["todo/remaining"];
    },
    todosFiltered() {
      return this.$store.getters["todo/todosFiltered"];
    },
    enableClearButton() {
      return this.$store.getters["todo/enableClearButton"];
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        alert("Please write something");
        return;
      }
      this.$store.dispatch("todo/add", {
        title: this.newTodo
      });
      this.newTodo = "";
    }
  }
};
</script>
