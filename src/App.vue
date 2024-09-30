<script setup>
import NavBar from "./components/Global/Navbar/NavBar.vue";
import Carousel from "./components/Home/Carousel.vue";
import StoreFeatures from "./components/Home/StoreFeatures.vue";
import NewsLetter from "./components/Global/NewsLetter.vue";
import Categories from "./components/Home/Categories.vue";
import Recommended from "./components/Home/Recommended.vue";
import ProductsCarousel from "./components/Home/ProductsCarousel.vue";
import FooterDiv from "./components/Global/FooterDiv.vue";
</script>

<template>
  <header>
    <NavBar />
    <Carousel />
  </header>

  <main class="bg-white">
    <NewsLetter />

    <StoreFeatures />

    <ProductsCarousel />
    <FooterDiv />
  </main>
</template>

<style scoped>
body {
  background-color: black;
}
</style>
