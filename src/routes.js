import TodoList from "./components/pages/TodoList";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

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
