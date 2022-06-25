<template>
  <NavBar />

  <div class="container-flex">
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import Cart from "./domain/types/Cart";
import Product from "./domain/types/Product";
import NavBar from "./components/Navigation.vue";

export default defineComponent({
  name: "App",
  components: { NavBar },
  setup() {
    let cart = ref<Cart[]>([]);
    let wishlist = ref<Product[]>([]);
    let loggedIn = ref(false);
    provide("cart", cart);
    provide("wishlist", wishlist);
  },
});
</script>

<style></style>
