<script setup>
import { ref } from "vue";
import { useProductStore } from "../../stores/productStore";
import { storeToRefs } from "pinia";
import { CategoryStore } from "../../stores/category/categoryStore";
import EditModalForm from "./EditModalForm.vue";

const props = defineProps({
  show: Boolean,
  productData: Object,
  onUpdate: Function,
});

defineEmits(["close"]);

const productStore = useProductStore();
const listCategoryStore = CategoryStore();
const listCategories = ref([]);

const { isLoading: isLoadingCategories, error: categoryError } =
  storeToRefs(listCategoryStore);

const getCategories = async () => {
  const response = await listCategoryStore.getCategories();
  listCategories.value = response;
};

getCategories();

const handleSubmit = async (formData) => {
  try {
    await productStore.updateProduct(props.productData.id, formData);
    props.onUpdate();
  } catch (err) {
    console.error("Failed to update product:", err);
  }
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto"
  >
    <div
      class="bg-white w-full max-w-2xl mx-auto p-6 md:p-10 rounded-lg shadow-lg flex flex-col gap-5 my-8"
    >
      <div
        class="flex justify-between items-center pb-4 border-b border-slate-200"
      >
        <h3 class="text-2xl font-semibold text-slate-950">Edit Product</h3>
        <button
          @click="$emit('close')"
          class="w-8 h-8 bg-slate-100 rounded-full hover:bg-terciary text-dark text-2xl justify-center items-center flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <EditModalForm
        :initialProductData="productData"
        :isLoadingCategories="isLoadingCategories"
        :listCategories="listCategories"
        :categoryError="categoryError"
        @submit="handleSubmit"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>
