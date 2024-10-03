<script setup>
import { RouterView, useRoute } from "vue-router";
import NavBar from "./components/Global/Navbar/NavBar.vue";

const route = useRoute();
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="wrapper"></div>

  <RouterView />
</template>
