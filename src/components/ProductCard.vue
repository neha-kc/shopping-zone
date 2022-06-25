<template>
  <div class="card" style="width: 20rem">
    <img src="../assets/img/image(1).jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">
        {{ product.description }}
      </p>
      <a href="#" class="btn btn-primary" @click.prevent="AddToCart(product)"
        >Add to cart</a
      >

      <button
        :disabled="isInWishList(product.id)"
        class="btn btn-outline-danger ml-3"
        @click="AddToWishlist(product)"
      >
        {{
          isInWishList(product.id) ? "Added to Wishlist!" : "Add To wishlist"
        }}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import Product from "../domain/types/Product";
import Cart from "../domain/types/Cart";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: { required: true, type: Object as () => Product },
  },

  setup() {
    let cart = ref<Cart[]>(inject("cart") as Cart[]);
    let wishlist = ref<Product[]>(inject("wishlist") as Product[]);
    let isdisable = ref(false);

    //ADD TO CART
    function AddToCart(product: Product) {
      var presentProduct = cart.value.find(function (ele) {
        return ele.id === product.id;
      }) as Cart;

      if (!presentProduct) {
        cart.value.push({ ...product, quantity: 1 });
      } else {
        presentProduct.quantity++;
      }

      window.alert("Product added to Cart!");
    }

    //ADD TO WISHLIST
    function AddToWishlist(product: Product) {
      wishlist.value.push(product);
      window.alert("Product added to Wishlist!");
    }

    //CHECK WHETHER PRODUCT IS IN WISHLIST
    function isInWishList(productID: number) {
      var presentProduct = wishlist.value.find(function (ele) {
        return ele.id === productID;
      });
      return presentProduct ? true : false;
    }

    return { AddToCart, AddToWishlist, isInWishList, isdisable };
  },
});
</script>
<style scoped>
button:disabled {
  color: red;
  border: 1px solid red;
}

.card {
  margin: 15px;
}
</style>
