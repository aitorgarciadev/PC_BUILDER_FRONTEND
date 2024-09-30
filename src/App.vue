<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/Global/Navbar/NavBar.vue";
</script>

<style scoped>
body {
  background-color: black;
}

header {
}
</style>
