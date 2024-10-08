<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import FavoriteIcon from "./FavoriteIcon.vue";
import BadgeCard from "./BadgeCard.vue";
import ProductModal from "./../ProductDetail/ProductModal.vue";
import { useProductModal } from "/src/composables/useProductModal.js";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { isModalOpen, openModal, closeModal } = useProductModal();

const discountedPrice = computed(() => {
  if (props.product.discount && props.product.discount > 0) {
    const discountAmount = props.product.price * (props.product.discount / 100);
    return (props.product.price - discountAmount).toFixed(2);
  }
  return props.product.price.toFixed(2);
});

const productImageUrl = computed(() => {
  if (props.product.imageHash) {
    const isBase64 =
      props.product.imageHash.startsWith("/") ||
      props.product.imageHash.includes("base64");
    if (isBase64) {
      return `data:image/png;base64,${props.product.imageHash}`;
    } else {
      return props.product.imageHash;
    }
  }

  // Imagen alternativa de ordenador
  return "https://www.shutterstock.com/shutterstock/photos/2059817444/display_1500/stock-vector-no-image-available-photo-coming-soon-illustration-vector-2059817444.jpg";
});

const isVisible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        } else {
          isVisible.value = false;
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  const cardElement = document.querySelector(".product-card");
  if (cardElement) {
    observer.observe(cardElement);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div
    :class="[
      'product-card',
      { 'fade-enter-active': isVisible, 'fade-leave-active': !isVisible },
    ]"
    class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64"
  >
    <div class="flex justify-between pt-3 px-3">
      <div class="w-full flex place-items-center justify-between">
        <BadgeCard
          :id="product.name"
          :stock="product.stock"
          :isDiscount="product.discount > 0 ? true : false"
          :discount="product.discount > 0 ? product.discount : 0"
          :isNew="product.isNew"
        />
        <FavoriteIcon :productId="product.id" />
      </div>
    </div>
    <div class="relative p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <img
        :src="productImageUrl"
        alt="product image"
        class="h-full w-full object-cover rounded-md cursor-pointer"
        @click="openModal"
      />
    </div>
    <div></div>
    <div class="p-3">
      <p class="text-slate-600 leading-normal font-light text-xs">
        {{ product.category?.name || "Category" }}
      </p>
      <div class="mb-2 flex items-center justify-between">
        <p class="text-slate-800 text-md font-semibold">{{ product.name }}</p>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <p
            v-if="product.discount && product.discount > 0"
            class="line-through text-gray-500 text-sm"
          >
            {{ product.price.toFixed(2) }}€
          </p>
          <p
            v-if="product.discount && product.discount > 0"
            class="text-red-600 text-base font-semibold"
          >
            {{ discountedPrice }}€
          </p>

          <p v-else class="text-black text-base font-semibold">
            {{ product.price.toFixed(2) }}€
          </p>
        </div>

        <button
          @click="openModal"
          class="px-2 w-20 py-2 bg-gray-950 text-white rounded hover:bg-gray-700"
        >
          Buy
        </button>
      </div>
    </div>

    <ProductModal
      :isOpen="isModalOpen"
      @close="closeModal"
      :product="product"
    />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
