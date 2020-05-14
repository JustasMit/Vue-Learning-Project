import axios from "axios";

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
    updateAdd(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    updateClearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    updateCheckAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    updateRemove(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    updateDone(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    updateRetrieve(state, todos) {
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
          context.commit("updateAdd", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    clearCompleted(context, todo) {
      const completed = todo.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      axios
        .delete("todosDeleteCompleted", {
          data: {
            todos: completed
          }
        })
        .then(response => {
          context.commit("updateClearCompleted", response.data);
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
        .then(context.commit("updateCheckAll", checked))
        .catch(e => {
          console.error(e);
        });
    },
    remove(context, id) {
      axios
        .delete("todos/" + id)
        .then(context.commit("updateRemove", id))
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
          context.commit("updateDone", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    retrieve(context) {
      axios
        .get("todos")
        .then(response => {
          context.commit("updateRetrieve", response.data);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
