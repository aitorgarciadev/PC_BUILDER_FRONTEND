<script setup>
import { ref, computed, nextTick } from "vue";
import { useProductStore } from "../../stores/product/productStore";
import { storeToRefs } from "pinia";
import FunkoCard from "../Card/ProductCard.vue"; // Mantiene el componente FunkoCard

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const currentIndex = ref(0); // Índice actual del carrusel
const itemsPerSlide = ref(4); // Número de items por vista (4 en escritorio)
const isAnimating = ref(false); // Flag para bloquear clicks durante la animación

// Total de productos en la base de datos
const totalProducts = computed(() => products.value.length);

// Función para obtener los productos visibles en función del índice actual
const visibleProducts = computed(() => {
  const start = currentIndex.value;
  const end = start + itemsPerSlide.value;

  if (end > totalProducts.value) {
    return [
      ...products.value.slice(start, totalProducts.value),
      ...products.value.slice(0, end - totalProducts.value),
    ];
  }

  return products.value.slice(start, end);
});

// Función para avanzar a la izquierda (producto anterior)
const scrollLeft = async () => {
  if (!isAnimating.value) {
    isAnimating.value = true;
    if (currentIndex.value === 0) {
      currentIndex.value = totalProducts.value - 1; // Vuelve al último producto si está en el primero
    } else {
      currentIndex.value -= 1; // Retrocede un producto
    }
    await nextTick();
    isAnimating.value = false;
  }
};

// Función para avanzar a la derecha (siguiente producto)
const scrollRight = async () => {
  if (!isAnimating.value) {
    isAnimating.value = true;
    if (currentIndex.value === totalProducts.value - 1) {
      currentIndex.value = 0; // Vuelve al primer producto si está en el último
    } else {
      currentIndex.value += 1; // Avanza un producto
    }
    await nextTick();
    isAnimating.value = false;
  }
};

// Función para actualizar el número de productos por vista dependiendo del tamaño de la pantalla
const updateItemsPerSlide = () => {
  if (window.innerWidth < 768) {
    itemsPerSlide.value = 1; // En móviles, mostrar una sola carta
  } else {
    itemsPerSlide.value = 4; // En pantallas más grandes, mostrar 4 cartas
  }
};

// Escuchar el evento resize para ajustar el número de cartas visibles
window.addEventListener("resize", updateItemsPerSlide);

// Llamada inicial para ajustar las cartas según el tamaño de la pantalla
updateItemsPerSlide();

// Llamada a la store para obtener los productos con descuento
productStore.fetchDiscountedProducts();

// Función para manejar el favorito
const toggleFavorite = (productId) => {
  productStore.toggleFavorite(productId); // Llama al método del store
};
</script>

<template>
  <div class="bg-white border-gray-50">
    <div class="mx-auto max-w-full lg:mx-0 text-center pb-10 items-center">
      <h2
        class="text-3xl font-bold tracking-tight text-dark text-center sm:text-4xl"
      >
        Recommended for you
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Limited-time offers ending soon.
      </p>
    </div>

    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="relative">
        <!-- Botones de navegación -->
        <button
          @click.stop="scrollLeft"
          class="lg:flex hidden absolute -left-8 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition duration-300"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          @click.stop="scrollRight"
          class="lg:flex hidden absolute -right-8 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition duration-300"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Contenedor de productos -->
        <div
          class="bg-white pt-10 pr-8 pl-8 pb-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <transition
            v-for="product in visibleProducts"
            :key="product.id"
            name="slide-fade"
            mode="out-in"
          >
            <div class="flex-none w-64">
              <!-- Asegúrate de pasar correctamente el productId y el estado de favorito -->
              <FunkoCard
                :product="product"
                :isFavorite="product.isFavorite"
                @toggle-favorite="toggleFavorite(product.id)"
              />
            </div>
          </transition>
        </div>

        <!-- Botones para móviles -->
        <div
          class="lg:hidden pt-10 flex justify-between items-center relative left-0 right-0 top-[calc(100%+1rem)] space-x-1"
        >
          <button
            @click.stop="scrollLeft"
            class="flex-1 bg-gray-900 flex flex-row justify-center items-center text-white rounded-md p-3 shadow-lg hover:bg-gray-700 transition duration-300 text-center space-x-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <p class="text-center text-md">Previous</p>
          </button>
          <button
            @click.stop="scrollRight"
            class="flex-1 bg-gray-900 flex flex-row justify-center items-center text-white rounded-md p-3 shadow-lg hover:bg-gray-700 transition duration-300 text-center space-x-2"
          >
            <p class="text-center text-md">Next</p>
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de deslizamiento con fade para nuevas tarjetas */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
