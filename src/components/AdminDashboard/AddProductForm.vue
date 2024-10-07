<script setup>
import { ref, watch } from "vue";
import useProductValidation from "../../composables/useProductValidation";

const props = defineProps({
  initialProductData: {
    type: Object,
    default: () => ({
      name: "",
      description: "",
      price: 0.0,
      stock: 0,
      category: null,
      discount: null,
      imageHash: null,
    }),
  },
  isLoadingCategories: Boolean,
  listCategories: Array,
  categoryError: String,
});

const fileBase64String = ref(null);

const emit = defineEmits(["submit", "cancel"]);

const form = ref({ ...props.initialProductData });

watch(
  () => props.initialProductData,
  (newVal) => {
    form.value = { ...newVal };
  },
  { immediate: true }
);

const { errors, validateProductForm } = useProductValidation();

const handleSubmit = () => {
  if (!validateProductForm(form.value)) {
    return;
  }
  emit("submit", form.value);
};

const handleCancel = () => {
  emit("cancel");
};

const onFileChange = (product) => {
  const file = product.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fileBase64String.value = e.target.result;
      form.value.imageHash = fileBase64String.value
        ? fileBase64String.value.split(",")[1]
        : null;
    };
    reader.readAsDataURL(file);
  }
};
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
    <div>
      <label class="block text-sm font-medium text-slate-700">Titulo</label>
      <input
        v-model="form.name"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-secondary"
        required
      />
      <span v-if="errors.name" class="text-red-500 text-sm">{{
        errors.name
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700"
        >Descripción</label
      >
      <textarea
        v-model="form.description"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-secondary"
        required
      ></textarea>
      <span v-if="errors.description" class="text-red-500 text-sm">{{
        errors.description
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700">Precio</label>
      <input
        v-model="form.price"
        type="number"
        min="0.01"
        step="0.01"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-secondary"
        required
      />
      <span v-if="errors.price" class="text-red-500 text-sm">{{
        errors.price
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700">Stock</label>
      <input
        v-model="form.stock"
        type="number"
        min="0"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-secondary"
        required
      />
      <span v-if="errors.stock" class="text-red-500 text-sm">{{
        errors.stock
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700">Categoría</label>
      <select
        v-model="form.category"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-secondary"
      >
        <option :value="null" disabled>Selecciona una categoría</option>
        <option
          v-for="category in listCategories"
          :key="category.id"
          :value="category"
        >
          {{ category.name }}
        </option>
      </select>
      <span v-if="errors.category" class="text-red-500 text-sm">{{
        errors.category
      }}</span>
      <div v-if="isLoadingCategories" class="text-secondary text-sm mt-2">
        Loading categories...
      </div>
      <div v-if="categoryError" class="text-red-500 text-sm mt-2">
        {{ categoryError }}
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700"
        >Descuento (%)</label
      >
      <input
        v-model="form.discount"
        type="number"
        min="0"
        max="100"
        step="1"
        placeholder="Introduzca 0 si no tiene ningún descuento"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-secondary"
        required
      />
      <span v-if="errors.discount" class="text-red-500 text-sm">{{
        errors.discount
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700"
        >Product Image</label
      >
      <input
        ref="upload"
        type="file"
        name="file-upload"
        multiple=""
        accept="image/jpeg, image/png"
        @change="onFileChange"
        class="mt-1 block w-full px-4 py-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-blueFunko-600"
      />
    </div>

    <div class="mt-4 flex justify-end space-x-2">
      <Button
        @click="closeModal"
        type="button"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg px-5 py-2 font-regular text-white focus:outline-none"
        >Cancelar</Button
      >
      <Button
        type="submit"
        class="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2 font-medium text-white focus:outline-none"
        >Añadir producto</Button
      >
    </div>
  </form>
</template>
