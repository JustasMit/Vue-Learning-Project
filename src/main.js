import Vue from "vue";
import App from "./App";
import { store } from "./store";
import VueRouter from "vue-router";
import routes from "./routes";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "todo"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
