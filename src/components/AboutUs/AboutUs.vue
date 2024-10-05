<!-- src/components/AboutUs.vue -->
<template>
  <section
    class="about-us-section bg-gray-100 p-6 rounded-lg shadow-md transition-opacity duration-500 ease-in-out"
    :class="{
      'opacity-0': !isVisible,
      'opacity-100': isVisible,
    }"
    @scroll="checkVisibility"
  >
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
      <p class="text-gray-600 leading-relaxed">
        We are a passionate team dedicated to delivering the best services for
        our customers. Our mission is to create innovative solutions and foster
        an environment where creativity and teamwork thrive.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const checkVisibility = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 768) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", checkVisibility);
  checkVisibility();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkVisibility);
});
</script>

<style scoped>
.about-us-section {
  opacity: 0;
}
@media (min-width: 768px) {
  .about-us-section {
    opacity: 1;
  }
}
</style>
