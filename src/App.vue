<script setup>
import NavBar from "./components/Global/NavBar.vue";
import Carousel from "./components/Home/Carousel.vue";
import StoreFeatures from "./components/Home/StoreFeatures.vue";
import NewsLetter from "./components/Global/NewsLetter.vue";
import Categories from "./components/Home/Categories.vue";
import Recommended from "./components/Home/Recommended.vue";
</script>

<template>
  <header>
    <NavBar />
    <Carousel />
  </header>
  <main>
    <StoreFeatures />
    <NewsLetter />
    <Categories />
    <Recommended />
  </main>
</template>

<style scoped></style>
