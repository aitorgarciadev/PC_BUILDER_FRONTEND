<script setup>
const props = defineProps({
  isNew: Boolean,
  isDiscount: Boolean,
  discount: Number,
  stock: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div
    class="rounded-md px-2.5 border border-transparent text-md flex items-center font-semibold transition-all shadow-sm"
    :class="
      stock > 0
        ? props.isDiscount
          ? 'bg-yellow-400 font-semibold text-black'
          : props.isNew
          ? 'bg-violet-700 font-semibold text-white'
          : 'bg-white'
        : 'bg-slate-800'
    "
  >
    <div v-if="!(stock > 0 && !props.isDiscount && !props.isNew)">
      <p v-if="stock === 0">Sold</p>
      <p v-if="stock > 0 && props.isDiscount">{{ discount }}% off</p>
      <p v-if="stock > 0 && !props.isDiscount && props.isNew">New</p>
    </div>
  </div>
</template>
