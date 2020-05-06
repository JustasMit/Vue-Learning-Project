import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
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
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    todosFiltered(state) {
      switch (state.filter) {
        case "active":
          return state.todos.filter(todo => !todo.completed);
        case "completed":
          return state.todos.filter(todo => todo.completed);
      }
      return state.todos;
    },
    enableClearButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    filterChange(state, filter) {
      state.filter = filter;
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    doneTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    }
  },
  actions: {
    addTodo(context, todo) {
      context.commit("addTodo", todo);
    },
    clearCompleted(context) {
      context.commit("clearCompleted");
    },
    filterChange(context, filter) {
      context.commit("filterChange", filter);
    },
    checkAll(context, checked) {
      context.commit("checkAll", checked);
    },
    removeTodo(context, id) {
      context.commit("removeTodo", id);
    },
    doneTodo(context, todo) {
      context.commit("doneTodo", todo);
    }
  }
});
