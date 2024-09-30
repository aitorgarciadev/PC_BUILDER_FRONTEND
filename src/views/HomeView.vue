<script setup>
import Carousel from "../components/Home/Carousel.vue";
import StoreFeatures from "../components/Home/StoreFeatures.vue";
import NewsLetter from "../components/Global/NewsLetter.vue";
import ProductsCarousel from "../components/Home/ProductsCarousel.vue";
import FooterDiv from "../components/Global/FooterDiv.vue";
</script>

<template>
  <Carousel />

  <NewsLetter />

  <StoreFeatures />

  <ProductsCarousel />
  <FooterDiv />
</template>

<style scoped>
body {
  background-color: black;
}
</style>
