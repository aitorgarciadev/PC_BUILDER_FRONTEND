<script setup>
import NavBar from "./components/Global/Navbar/NavBar.vue";
</script>

<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<style scoped>
html {
  scroll-behavior: auto;
}
</style>
