<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<!--SCRIPT-->
<script lang="ts">
//IMPORTS
import { defineComponent, ref, provide } from "vue";
import productList from "../products.json";
import Product from "../domain/types/Product";
import ProductCard from "../components/ProductCard.vue";

//SCRIPT EXPORT
export default defineComponent({
  name: "HomePage",
  components: { ProductCard },

  setup() {
    const products = ref<Product[]>(productList);

    return {
      products,
      ProductCard,
    };
  },
});
</script>

<style>
.product-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>
