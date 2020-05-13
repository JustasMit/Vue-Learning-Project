import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "https://jusmit.xyz/api/";

// Initial token setup using local storage
const token = localStorage.getItem("access_token");
if (token) axios.defaults.headers.common = { Authorization: "Bearer " + token };

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [],
    token: token || null,
    userName: null
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
    },
    loggedIn(state) {
      return state.token !== null;
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
    },
    retrieveTodos(state, todos) {
      state.todos = todos;
    },
    setToken(state, token) {
      axios.defaults.headers.common = { Authorization: "Bearer " + token };
      localStorage.setItem("access_token", token);
      state.token = token;
    },
    removeToken(state) {
      axios.defaults.headers.common = {};
      localStorage.removeItem("access_token");
      state.token = null;
    },
    changeUserName(state, userName) {
      state.userName = userName;
    }
  },
  actions: {
    addTodo(context, todo) {
      axios
        .post("todos", {
          title: todo.title,
          completed: false
        })
        .then(response => {
          context.commit("addTodo", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearCompleted(context) {
      const completed = store.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      axios
        .delete("todosDeleteCompleted", {
          data: {
            todos: completed
          }
        })
        .then(response => {
          context.commit("clearCompleted", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterChange(context, filter) {
      context.commit("filterChange", filter);
    },
    checkAll(context, checked) {
      axios
        .patch("todosCheckAll", {
          completed: checked
        })
        .then(context.commit("checkAll", checked))
        .catch(error => {
          console.log(error);
        });
    },
    removeTodo(context, id) {
      axios
        .delete("todos/" + id)
        .then(context.commit("removeTodo", id))
        .catch(error => {
          console.log(error);
        });
    },
    doneTodo(context, todo) {
      axios
        .patch("todos/" + todo.id, {
          title: todo.title,
          completed: todo.completed
        })
        .then(response => {
          context.commit("doneTodo", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    retrieveTodos(context) {
      axios
        .get("todos")
        .then(response => {
          context.commit("retrieveTodos", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async fetchUser({ state, commit }) {
      if (!state.token) return;

      try {
        const response = await axios.get("user");
        commit("changeUserName", response.data.name);
      } catch (e) {
        console.error(e);
      }
    },
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post("login", {
          username: username,
          password: password
        });
        commit("setToken", response.data.access_token);
      } catch (e) {
        console.error(e);
      }
    },
    async logout({ getters, commit }) {
      if (!getters.loggedIn) return;

      try {
        await axios.post("logout");
        commit("removeToken");
      } catch (e) {
        console.error(e);
      }
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("register", {
            name: data.name,
            email: data.email,
            password: data.password
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
