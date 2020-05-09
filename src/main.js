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

new Vue({
  el: "#app",
  store,
  router,
  components: { Master },
  template: "<Master/>"
});
