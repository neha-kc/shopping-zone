import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CartPage from "./views/Cart.vue";
import WishList from "./views/Wishlist.vue";
import PageNotFound from "./views/PageNotFound.vue";
import LogIn from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";

function guardMyroute(to: any, from: any, next: any) {
  if (localStorage.getItem("user")) {
    next();
  } else {
    next("/");
  }
}
const routes = [
  {
    name: "SignUp",
    path: "/",
    component: SignUp,
  },
  {
    name: "HomePage",
    path: "/home",
    component: HomePage,
    beforeEnter: guardMyroute,
  },

  {
    name: "CartPage",
    path: "/cart",
    component: CartPage,
    beforeEnter: guardMyroute,
  },

  {
    name: "WishList",
    path: "/wishlist",
    component: WishList,
    beforeEnter: guardMyroute,
  },
  {
    name: "LogIn",
    path: "/login",
    component: LogIn,
  },
  {
    name: "PageNotFound",
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
