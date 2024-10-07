<script setup>
import { computed } from "vue";

const { currentPage, totalPages } = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["changePage"]);

const isFirstPage = computed(() => currentPage === 0);
const isLastPage = computed(() => currentPage === totalPages - 1);

const handlePageChange = (newPage) => {
  if (newPage < 0 || newPage >= totalPages) return;
  emit("changePage", newPage);
};

const generateVisiblePages = (current, total, maxVisiblePages) => {
  const pages = [1];
  if (total <= maxVisiblePages) {
    for (let i = 2; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current > 3) pages.push("...");

    const startPage = Math.max(2, Math.min(current - 1, total - 3));
    const endPage = Math.min(total - 1, Math.max(current + 1, 4));

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
};

const visiblePages = computed(() =>
  generateVisiblePages(currentPage + 1, totalPages, 5)
);
</script>
<template>
  <div
    class="flex items-center justify-between p-4 border-t border-blue-gray-50"
  >
    <p
      class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
    >
      Page {{ currentPage + 1 }} of {{ totalPages }}
    </p>
    <div class="flex gap-2 items-center">
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="isFirstPage"
        class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Previous
      </button>
      <div class="flex gap-1">
        <span
          v-for="page in visiblePages"
          :key="page"
          @click="typeof page === 'number' && handlePageChange(page - 1)"
          :class="[
            'cursor-pointer rounded-full py-1 px-2 text-xs font-bold',
            page === currentPage + 1
              ? 'bg-blue-gray-500 text-white'
              : 'text-blue-gray-900',
          ]"
        >
          {{ page }}
        </span>
      </div>
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="isLastPage"
        class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Next
      </button>
    </div>
  </div>
</template>
