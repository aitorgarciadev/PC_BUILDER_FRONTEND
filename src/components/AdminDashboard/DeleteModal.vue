<script setup>
defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col gap-5">
      <h3 class="text-2xl font-semibold text-slate-950">Eliminar producto</h3>
      <p class="text-base text-slate-900">
        ¿ Estas seguro de eliminar este producto de tu tienda ?
      </p>
      <div class="mt-4 flex justify-end space-x-4">
        <Button
          @click="$emit('cancel')"
          class="bg-gray-600 hover:bg-gray-700 rounded-lg px-5 py-2 font-regular text-white focus:outline-none"
          >Cancelar</Button
        >
        <Button
          @click="$emit('confirm')"
          class="bg-red-600 hover:bg-red-700 rounded-lg px-5 py-2 font-medium text-white focus:outline-none"
          >Eliminar</Button
        >
      </div>
    </div>
  </div>
</template>
