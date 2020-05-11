import App from "./App";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Logout from "./components/pages/Logout";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: "/todo",
    name: "todo",
    component: App,
    meta: { requiresAuth: true }
  },
  { path: "/", name: "home", component: Landing },
  { path: "/logout", name: "logout", component: Logout }
];

export default routes;
