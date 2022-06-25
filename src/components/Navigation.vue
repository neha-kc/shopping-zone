<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Shopping Zone</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-item p-2 mb-lg-4"
              >Home</router-link
            >
          </li>
        </ul>
        <div class="me-2">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
            <li class="nav-item">
              <router-link to="/cart">
                <button
                  class="btn btn-outline-primary position-relative"
                  style="margin: 7px"
                >
                  <i class="fa fa-shopping-bag"></i>
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {{ cart.length }}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/wishlist">
                <button
                  class="btn btn-outline-warning"
                  style="margin: 7px; color: #f41cb2; border-color: #f41cb2"
                >
                  <i class="fa fa-heart"></i></button
              ></router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                ><button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="logout()"
                >
                  <i class="fa fa-power-off"></i></button
              ></a>
            </li>
          </ul>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
            <li class="nav-item">Sign in to access</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, reactive, toRefs, inject, defineComponent, computed } from "vue";
import router from "../route";
import Cart from "../domain/types/Cart";

export default defineComponent({
  name: "NavBar",
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = true;
    } else this.user = false;
  },
  setup() {
    let cart = ref<Cart[]>(inject("cart") as Cart[]);

    function logout() {
      localStorage.removeItem("user");
      router.push({ name: "SignUp" });
      window.location.reload();
    }
    return {
      logout,
      cart,
    };
  },
});
</script>

<style scoped>
li a {
  text-decoration: none;
  color: black;
}

.nav-item button {
  border-radius: 50%;
}
</style>
