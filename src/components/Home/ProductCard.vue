<!-- ProductCard.vue -->
<template>
  <div class="product-card" :class="{ 'fade-in': isVisible }">
    <div
      class="group rounded-md relative p-6 border-2 border-slate-400/10 shadow-lg shadow-primary/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-white"
    >
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-85 lg:h-60 h-48"
      >
        <img
          :src="product.imageSrc"
          :alt="product.imageAlt"
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-md text-gray-700 font-semibold sm:text-lg">
            <a :href="product.href">
              <span aria-hidden="true" class="absolute inset-0" />
              {{ product.name }}
            </a>
          </h3>
          <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
        </div>
        <p class="text-md font-medium text-gray-900">{{ product.price }}</p>
      </div>
      <button
        class="mt-4 w-full bg-gray-900 text-white font-bold py-2 px-4 rounded transition duration-300 text-center hover:bg-gray-700 relative z-10"
      >
        Comprar
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isVisible = ref(false);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entry.target); // Deja de observar
      }
    });
  },
  {
    threshold: 0.1, // Ajusta el umbral según sea necesario
  }
);

onMounted(() => {
  const card = document.querySelector(".product-card");
  if (card) {
    observer.observe(card);
  }
});

onBeforeUnmount(() => {
  observer.disconnect(); // Desconecta el observer cuando se desmonta el componente
});
</script>

<style scoped>
.product-card {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out; /* Añade transición */
  opacity: 0; /* Comienza invisible */
  transform: translateY(20px); /* Comienza desplazado hacia abajo */
}

.product-card.fade-in {
  opacity: 1; /* Se vuelve visible */
  transform: translateY(0); /* Regresa a su posición original */
}
</style>
