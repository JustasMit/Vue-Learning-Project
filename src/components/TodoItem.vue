<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneTodo" />

      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>

      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneTodo"
        @keyup.enter="doneTodo"
        v-focus
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="remove-item" @click="removeTodo(index)">
      &times;
    </div>
  </div>
</template>

<script>
import { EventBus } from "./event-bus.js";

export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEdit: this.todo.beforeEdit
    };
  },
  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.todo.completed;
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    removeTodo(index) {
      EventBus.$emit("removedTodo", index);
    },
    editTodo() {
      this.beforeEdit = this.title;
      this.editing = true;
    },
    doneTodo() {
      if (this.title.trim().length == 0) {
        this.title = this.beforeEdit;
      }
      this.editing = false;
      EventBus.$emit("finishedEdit", {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });
    },
    cancelEdit() {
      this.title = this.beforeEdit;
      this.editing = false;
    }
  }
};
</script>
