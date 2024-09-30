<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

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

const visibleProducts = computed(() => {
  const visible = [];
  const start = currentIndex.value;
  for (let i = 0; i < itemsPerSlide.value; i++) {
    visible.push(products[(start + i) % totalProducts]);
  }
  return visible;
});

const nextSlide = () => {
  if (currentIndex.value + itemsPerSlide.value >= totalProducts) {
    currentIndex.value = 0;
  } else {
    currentIndex.value += 1;
  }
};

const prevSlide = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = totalProducts - itemsPerSlide.value;
  } else {
    currentIndex.value -= 1;
  }
};

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<template>
  <div class="bg-white pb-20 mb-10 border-gray-50">
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
          <div
            v-for="(product, index) in visibleProducts"
            :key="product.id"
            class="group rounded-md relative p-6 border-2 border-slate-400/10 shadow-lg shadow-primary/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
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
              <p class="text-md font-medium text-gray-900">
                {{ product.price }}
              </p>
            </div>
            <button
              class="mt-4 w-full bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 relative text-lg"
            >
              Comprar
            </button>
          </div>
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
<style>
@media (max-width: 640px) {
  img {
    height: 50vh;
    width: auto;
  }
  .group {
    width: calc(100% - 16px);
    height: 400px;
    padding: 16px;
    padding-top: 40px;
  }
  button {
    padding: 12px 24px;
    font-size: 1rem;
    margin-top: 8px;
  }
  .lg:hidden button {
    padding: 12px;
    font-size: 0.875rem;
    margin: 8px;
  }
}
</style>
