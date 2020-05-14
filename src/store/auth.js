import axios from "axios";

axios.defaults.baseURL = "https://jusmit.xyz/api/";

// Initial token setup using local storage
const token = localStorage.getItem("access_token");
if (token) axios.defaults.headers.common = { Authorization: "Bearer " + token };

export default {
  namespaced: true,
  state: {
    token: token || null,
    userName: null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
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
        const response = await axios.post("login", { username, password });
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
    }
  }
};
