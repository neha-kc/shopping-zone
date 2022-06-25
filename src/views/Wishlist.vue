<template>
  <div class="outer-div">
    <h1>My Wishlist</h1>
    <div v-if="WishList.length == 0">
      <div class="alert alert-warning" role="alert">
        Your wishlist is empty! Please add products
      </div>
    </div>
    <div class="row" v-else>
      <div
        v-for="product in WishList"
        :key="product.id"
        id="product-display"
        class="col-md-2"
      >
        <img src="../assets/img/image(1).jpg" class="card-img-top" alt="..." />

        <h4>{{ product.title }}</h4>
        <small><b>Price:</b> {{ product.price }}/-</small>
        <br />
        <button
          @click="removeFromWishlist(product)"
          class="btn btn-danger mt-3"
        >
          Remove from Wishlist
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import Product from "../domain/types/Product";

export default defineComponent({
  name: "WishList",

  setup() {
    let WishList = ref(inject<Product[]>("wishlist", []));

    //REMOVE FROM WISHLIST
    function removeFromWishlist(product: Product) {
      return WishList.value.splice(
        WishList.value.findIndex((current) => {
          return current.id === product.id;
        }),
        1
      );
    }

    return {
      WishList,
      removeFromWishlist,
    };
  },
});
</script>
<style scoped>
#product-display {
  text-align: center;
  margin: 18px;
}
</style>
