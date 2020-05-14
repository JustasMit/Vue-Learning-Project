import Vue from "vue";
import App from "./App";
import { store } from "./store/index";
import router from "./router/index";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
