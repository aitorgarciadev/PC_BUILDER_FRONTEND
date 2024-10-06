<script setup>
import { defineProps } from "vue";

defineProps({
  categories: Array,
  selectedCategory: Object,
});
</script>

<template>
  <div class="flex justify-end my-4 pr-4">
    <select
      @change="
        $emit(
          'change-category',
          categories.find((cat) => cat.id === Number($event.target.value))
        )
      "
      :value="selectedCategory?.id || ''"
      class="px-4 mt-10 mr-20 py-2 m-2 rounded bg-gray-950 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <option disabled value="">Select an option</option>

      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>
