import TodoList from "../pages/TodoList";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
    component: TodoList,
    meta: { requiresAuth: true }
  },
  { path: "/", name: "home", component: Landing }
];

export default routes;
