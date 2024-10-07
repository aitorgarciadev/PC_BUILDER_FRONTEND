<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const handleEdit = () => {
  emit("edit", props.product);
};

const handleDelete = () => {
  emit("delete", props.product.id);
};
</script>
<template>
  <tbody>
    <tr>
      <td class="p-4 border-b border-blue-gray-50">
        <div class="flex items-center gap-3">
          <img
            src="https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77027689_05_B.jpg?imwidth=2048&imdensity=1&ts=1725440677144"
            alt="John Michael"
            class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
          />
          <div class="flex flex-col">
            <p
              class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
            >
              {{ product.name }}
            </p>
          </div>
        </div>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <div class="flex flex-col">
          <p
            class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
          >
            {{ product.category.name }}
          </p>
        </div>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <div class="flex flex-col">
          <p
            class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
          >
            {{ product.description }}
          </p>
        </div>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <div class="flex flex-col">
          <p
            class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
          >
            {{ product.price }} €
          </p>
        </div>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <div class="flex flex-col">
          <p
            class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
          >
            {{ product.stock }}
          </p>
        </div>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <div class="w-max">
          <div
            :class="[
              'relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap',
              product.discount
                ? 'bg-red-500/20 text-red-900'
                : 'bg-blue-gray-500/20 text-blue-gray-900',
            ]"
          >
            <span>{{ product.discount ? product.discount + "%" : "No" }}</span>
          </div>
        </div>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <button
          @click="handleEdit"
          class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span
            class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="w-5 h-5"
            >
              <path
                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
              ></path>
            </svg>
          </span>
        </button>
      </td>
      <td class="p-4 border-b border-blue-gray-50">
        <button
          @click="handleDelete"
          class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span
            class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
              alt="Delete Icon"
            >
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </td>
    </tr>
  </tbody>
</template>
