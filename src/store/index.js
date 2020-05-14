import Vue from "vue";
import Vuex from "vuex";
import todo from "./todo";
import auth from "./auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    todo: todo,
    auth: auth
  }
});
