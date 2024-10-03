<template>
  <div class="bg-white border-gray-50" @scroll="onScroll">
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
        <button
          @click="prevSlide"
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
          @click="nextSlide"
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
        <div
          class="bg-white pt-10 pr-8 pl-8 pb-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 overflow-hidden"
        >
          <ProductCard
            v-for="(product, index) in visibleProducts"
            :key="product.id"
            :product="product"
            :class="{
              'slide-in-right': animationReset && index === 0,
              'fade-in': animationReset && index > 0,
            }"
          />
        </div>
        <div
          class="lg:hidden pt-10 flex justify-between items-center relative left-0 right-0 top-[calc(100%+1rem)] space-x-1"
        >
          <button
            @click="prevSlide"
            class="flex-1 bg-gray-900 flex flex-row justify-center items-center text-white rounded-md p-3 shadow-lg hover:bg-gray-700 transition duration-300 text-center space-x-2"
          >
            <svg
              class="w-5 h-5 text-center"
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
            @click="nextSlide"
            class="flex-1 bg-gray-900 flex flex-row justify-center items-center text-white rounded-md p-3 shadow-lg hover:bg-gray-700 transition duration-300 text-center space-x-2"
          >
            <p class="text-center text-md">Next</p>
            <svg
              class="w-5 h-5 text-center"
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

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import ProductCard from "./ProductCard.vue"; // Importar el componente ProductCard

const products = [
  {
    id: 1,
    name: "Dell XPS 13",
    href: "#",
    imageSrc: "/src/assets/img/Flags/GB.svg",
    imageAlt: "Dell XPS 13",
    price: "$999",
    category: "Laptop",
  },
  {
    id: 2,
    name: "MacBook Pro",
    href: "#",
    imageSrc: "/src/assets/img/Flags/GB.svg",
    imageAlt: "MacBook Pro",
    price: "$2,399",
    category: "Laptop",
  },
  {
    id: 3,
    name: "Lenovo ThinkPad",
    href: "#",
    imageSrc: "/src/assets/img/Flags/GB.svg",
    imageAlt: "Lenovo ThinkPad X1",
    price: "$1,200",
    category: "Laptop",
  },
  {
    id: 4,
    name: "HP Spectre x360",
    href: "#",
    imageSrc: "/src/assets/img/Flags/GB.svg",
    imageAlt: "HP Spectre x360",
    price: "$1,499",
    category: "Laptop",
  },
  {
    id: 5,
    name: "HP Spectre x360",
    href: "#",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/HP_Spectre_x360.png",
    imageAlt: "HP Spectre x360",
    price: "$1,499",
    category: "Laptop",
  },
  {
    id: 6,
    name: "HP Spectre x360",
    href: "#",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/HP_Spectre_x360.png",
    imageAlt: "HP Spectre x360",
    price: "$1,499",
    category: "Laptop",
  },
  {
    id: 7,
    name: "HP Spectre x360",
    href: "#",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/HP_Spectre_x360.png",
    imageAlt: "HP Spectre x360",
    price: "$1,499",
    category: "Laptop",
  },
  {
    id: 8,
    name: "HP Spectre x360",
    href: "#",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/HP_Spectre_x360.png",
    imageAlt: "HP Spectre x360",
    price: "$1,499",
    category: "Laptop",
  },
];

const isMobile = ref(window.innerWidth < 640);
const itemsPerSlide = computed(() => (isMobile.value ? 1 : 4));
const totalProducts = products.length;
const currentIndex = ref(0);
const animationReset = ref(false); // Nueva propiedad para la animación

const visibleProducts = computed(() => {
  const visible = [];
  const start = currentIndex.value % totalProducts; // Asegúrate de que el índice esté dentro del rango
  for (let i = 0; i < itemsPerSlide.value; i++) {
    const index = (start + i) % totalProducts; // Asegúrate de que el índice no exceda el total
    visible.push(products[index]);
  }
  return visible;
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalProducts;
  animationReset.value = true; // Activar animación al avanzar

  setTimeout(() => {
    animationReset.value = false; // Resetear animación
  }, 1000); // Asegúrate de que este tiempo coincida con la duración de la animación
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalProducts) % totalProducts;
  animationReset.value = true; // Activar animación al retroceder

  setTimeout(() => {
    animationReset.value = false; // Resetear animación
  }, 1000); // Asegúrate de que este tiempo coincida con la duración de la animación
};

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640;
};

const onScroll = () => {
  // Aquí puedes agregar la lógica para el scroll si es necesario
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<style>
@media (max-width: 640px) {
  img {
    height: 50vh;
    width: auto;
  }
}

/* Animación de deslizamiento desde la derecha */
.slide-in-right {
  animation: slide-in-right 1s ease-in-out forwards;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Animación de desvanecimiento */
.fade-in {
  animation: fade-in 1s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
