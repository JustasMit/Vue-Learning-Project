import App from "./App";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/todo", component: App },
  { path: "/", component: Landing }
];

export default routes;
