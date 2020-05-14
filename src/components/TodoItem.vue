<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input
        type="checkbox"
        class="text-wrap"
        v-model="completed"
        @change="doneTodo"
      />

      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label truncate"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>

      <input
        v-else
        class="todo-item-edit truncate"
        type="text"
        v-model="title"
        @blur="doneTodo"
        @keyup.enter="doneTodo"
        v-focus
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">
      &times;
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
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
    removeTodo(id) {
      this.$store.dispatch("todo/remove", id);
    },
    editTodo() {
      if (this.completed == true) return;
      this.beforeEdit = this.title;
      this.editing = true;
    },
    doneTodo() {
      if (this.title.trim().length == 0) {
        this.title = this.beforeEdit;
      }
      this.editing = false;
      this.$store.dispatch("todo/done", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
        beforeEdit: this.beforeEdit
      });
    },
    cancelEdit() {
      this.title = this.beforeEdit;
      this.editing = false;
    }
  }
};
</script>
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  margin-left: auto;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  width: 95%;
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
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95%;
  display: inline-block;
}
</style>
