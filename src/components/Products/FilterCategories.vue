<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
  selectedCategory: {
    type: String,
    default: "All",
  },
});

const emits = defineEmits(["update:category"]);

const selectCategory = (category) => {
  emits("update:category", category);
};
</script>
<template>
  <div class="flex flex-wrap justify-center my-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      :class="[
        'px-4 py-2 m-2 rounded',
        category === selectedCategory
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700',
      ]"
    >
      {{ category }}
    </button>
  </div>
</template>

<style scoped>
.button-active {
  background-color: #2563eb;
  color: white;
}
</style>
