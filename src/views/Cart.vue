<template>
  <div class="outer-div">
    <h1>My Cart</h1>
    <div v-if="cart.length == 0">
      <div class="alert alert-warning" role="alert">
        Your Cart is empty! Please add products
      </div>
    </div>

    <div v-else>
      <div
        v-for="product in cart"
        :key="product.id"
        class="row"
        id="product-display"
      >
        <img src="../assets/img/image(1).jpg" class="card-img-top" alt="..." />
        <div class="col-md-2">
          <h4>{{ product.title }}</h4>
          <small><b>Price:</b> {{ product.price }}/-</small>
        </div>

        <div class="col-md-2">
          <h5>
            Quantity:<br /><br />
            <button
              class="btn btn-outline-primary"
              @click="product.quantity += 1"
            >
              +
            </button>
            <span style="color: #ff6600; font-size: 19px; margin: 0px 5px">
              {{ product.quantity }}
            </span>
            <button
              class="btn btn-outline-primary"
              @click="decreaseQuantity(product)"
            >
              -
            </button>
          </h5>
        </div>
        <div class="col-md-2">
          <h5>
            Price:<br /><br />
            <span style="color: #ff6600">
              {{ product.price * product.quantity }}/-</span
            >
          </h5>
        </div>
        <div class="col-md-2">
          <h5>
            <button @click="removeFromCart(product)" class="btn btn-danger">
              Remove from Cart
            </button>
          </h5>
        </div>
      </div>

      <div class="total-price">
        <h4><b>Total:</b> {{ totalPrice }}/-</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed } from "vue";
import Cart from "../domain/types/Cart";

export default defineComponent({
  name: "CartPage",
  setup() {
    let cart = ref(inject("cart") as Cart[]);

    //COMPUTE TOTAL PRICE OF CART
    const totalPrice = computed(() => {
      return cart.value.reduce(
        (total, curr) => (total = total + curr.price * curr.quantity),
        0
      );
    });

    //DECREASE QUANTITY
    function decreaseQuantity(product: Cart) {
      if (product.quantity == 1) removeFromCart(product);
      else product.quantity -= 1;
    }

    //REMOVE FROM CART
    function removeFromCart(product: Cart) {
      return cart.value.splice(
        cart.value.findIndex((current) => {
          return current.id === product.id;
        }),
        1
      );
    }

    return {
      cart,
      totalPrice,
      removeFromCart,
      decreaseQuantity,
    };
  },
});
</script>
<style>
.outer-div {
  padding: 30px;
  display: flex;
  flex-direction: column;
}

#product-display {
  padding: 20px;
  margin-top: 20px;
  border: 1px solid rgb(187, 187, 187);
}
#product-display img {
  height: 150px;
  width: 150px;
}

.product-title {
  margin-left: 50px;
}

.total-price {
  padding: 10px;
  margin-top: 20px;
  display: flex;
  -webkit-box-shadow: 4px 0px 28px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 4px 0px 28px 0px rgba(199, 199, 199, 1);
  box-shadow: 4px 0px 28px 0px rgba(199, 199, 199, 1);
  justify-content: flex-end;
}
</style>
