import Vue from "vue";
import Master from "./components/pages/Master";
import { store } from "./store";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.config.productionTip = false;
Vue.use(VueRouter);

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
  components: { Master },
  template: "<Master/>"
});
