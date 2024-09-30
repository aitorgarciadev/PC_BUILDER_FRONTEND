<script setup>
import { defineProps } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
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
      class="mt-4 w-full bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 text-center"
    >
      Comprar
    </button>
  </div>
</template>

<style scoped>
.group {
  width: 100%;
  max-width: 340px;
  padding: 16px;
  padding-top: 40px;
  background-color: white;
}

button {
  padding: 12px 24px;
  font-size: 1rem;
  margin-top: 8px;
  width: 100%;
}

@media (min-width: 640px) {
  .group {
    max-width: 360px;
  }
}
</style>
