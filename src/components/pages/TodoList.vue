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
import TodoItem from "../TodoItem";
import TodoItemsRem from "../TodoItemsRem";
import TodoCheckAll from "../TodoCheckAll";
import TodoFiltered from "../TodoFiltered";
import TodoClearCom from "../TodoClearCom";

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
