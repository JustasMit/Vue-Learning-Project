import routes from "./routes.js";
import { store } from "../store";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["auth/loggedIn"]) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters["auth/loggedIn"]) {
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

export default router;
