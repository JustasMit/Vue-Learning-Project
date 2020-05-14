import axios from "axios";

axios.defaults.baseURL = "https://jusmit.xyz/api/";

export default {
  namespaced: true,
  state: {
    filter: "all",
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    todosFiltered(state) {
      switch (state.filter) {
        case "all":
          return state.todos;
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
    clearTodos(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    setCheckAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    setTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    add(context, todo) {
      axios
        .post("todos", {
          title: todo.title,
          completed: false
        })
        .then(response => {
          context.commit("addTodo", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    clearCompleted(context) {
      const completed = context.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      axios
        .delete("todosDeleteCompleted", {
          data: {
            todos: completed
          }
        })
        .then(response => {
          context.commit("clearTodos", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    filter(context, filter) {
      context.commit("updateFilter", filter);
    },
    checkAll(context, checked) {
      axios
        .patch("todosCheckAll", {
          completed: checked
        })
        .then(context.commit("setCheckAll", checked))
        .catch(e => {
          console.error(e);
        });
    },
    remove(context, id) {
      axios
        .delete("todos/" + id)
        .then(context.commit("removeTodo", id))
        .catch(e => {
          console.error(e);
        });
    },
    done(context, todo) {
      axios
        .patch("todos/" + todo.id, {
          title: todo.title,
          completed: todo.completed
        })
        .then(response => {
          context.commit("updateTodo", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    retrieve(context) {
      axios
        .get("todos")
        .then(response => {
          context.commit("setTodos", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
