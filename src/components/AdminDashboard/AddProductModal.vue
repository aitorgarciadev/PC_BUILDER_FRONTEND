<script setup>
import { ref } from "vue";
import { useProductStore } from "../../stores/productStore";
import { storeToRefs } from "pinia";
import { CategoryStore } from "../../stores/category/CategoryStore";
import AddProductForm from "./AddProductForm.vue";

defineProps({
  show: Boolean,
});

const emit = defineEmits(["close", "added"]);

const productStore = useProductStore();
const listCategoryStore = CategoryStore();
const listCategories = ref([]);

const { isLoading: isLoadingCategories, error: categoryError } =
  storeToRefs(listCategoryStore);

async function getCategories() {
  const response = await listCategoryStore.getCategories();
  listCategories.value = response;
}

getCategories();

const handleSubmit = async (formData) => {
  try {
    await productStore.addProduct(formData);
    emit("added");
    closeModal();
  } catch (err) {
    console.error("Failed to add product:", err);
  }
};

const closeModal = () => {
  emit("close");
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
        <h3 class="text-2xl font-semibold text-slate-950">Add New Product</h3>
        <button
          @click="closeModal"
          class="w-8 h-8 bg-black rounded-lg hover:bg-terciary text-dark text-2xl justify-center items-center flex"
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

      <AddProductForm
        :initialProductData="{
          name: '',
          description: '',
          price: 0.0,
          stock: 0,
          category: null,
          discount: null,
          imageHash: null,
        }"
        :isLoadingCategories="isLoadingCategories"
        :listCategories="listCategories"
        :categoryError="categoryError"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </div>
  </div>
</template>
