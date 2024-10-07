<script setup>
import ProductsTable from "./ProductsTable.vue";
import TablePagination from "./TablePagination.vue";
import DeleteModal from "./DeleteModal.vue";
import AddProductButton from "./AddProductButton.vue";
import AddProductModal from "./AddProductModal.vue";
import EditModal from "./EditModal.vue";
import { ref, onMounted } from "vue";
import { useProductStore } from "../../stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();

const {
  products,
  currentPage,
  totalPages,
  isLoading: productLoading,
  error: productError,
} = storeToRefs(productStore);

const itemsPerPage = 7;
const showDeleteModal = ref(false);
const productToDelete = ref(null);
const showEditModal = ref(false);
const productToEdit = ref(null);
const showAddProductModal = ref(false);

const openAddProductModal = () => {
  showAddProductModal.value = true;
};

const closeAddProductModal = () => {
  showAddProductModal.value = false;
};

const fetchProducts = (page = currentPage.value, size = itemsPerPage) => {
  productStore.fetchAllProducts(page, size, "createdAt", "desc");
};

onMounted(() => {
  fetchProducts();
});

const refreshProducts = () => {
  fetchProducts();
};

defineExpose({
  refreshProducts,
});

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage, itemsPerPage, "createdAt", "desc");
};

const handleEdit = (product) => {
  productToEdit.value = product;
  showEditModal.value = true;
};

const handleProductUpdated = () => {
  closeEditModal();
  refreshProducts();
};

const closeEditModal = () => {
  showEditModal.value = false;
  productToEdit.value = null;
};

const handleDeleteClick = (productId) => {
  productToDelete.value = productId;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  await productStore.deleteProduct(productToDelete.value);
  fetchProducts();
  closeModal();
};

const closeModal = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

const handleProductAdded = () => {
  closeAddProductModal();
  refreshProducts();
};
</script>
<template>
  <div
    class="flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
  >
    <div
      class="mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border"
    >
      <div class="flex items-center justify-start gap-8 mb-8">
        <div>
          <h5
            class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-dark"
          >
            Lista de productos
          </h5>
          <p
            class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
          >
            Mira la información de todos tus productos
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="w-full md:w-72">
          <div class="relative h-10 w-full min-w-[200px]">
            <div
              class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </div>
            <input
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label
              class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Buscar
            </label>
          </div>
        </div>
        <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
          <AddProductButton @open-modal="openAddProductModal" />
          <AddProductModal
            :show="showAddProductModal"
            @close="closeAddProductModal"
            @added="handleProductAdded"
          />
        </div>
      </div>
    </div>
    <div v-if="productLoading" class="flex justify-center">
      <p>Loading products...</p>
    </div>

    <div v-else-if="productError" class="text-center mt-2 text-red-500">
      <p>Error: {{ productError }}</p>
    </div>
    <div v-else class="p-6 px-0">
      <table class="w-full mt-4 text-left table-auto min-w-max">
        <thead class="bg-primary text-light">
          <tr>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-medium leading-none"
              >
                Titulo
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-medium leading-none"
              >
                Categoría
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-medium leading-none"
              >
                Descripción
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-medium leading-none"
              >
                Precio
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-medium leading-none"
              >
                Stock
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-medium leading-none"
              >
                Descuento
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-none"
              ></p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-none"
              ></p>
            </th>
          </tr>
        </thead>
        <ProductsTable
          v-for="product in products"
          :key="product.id"
          :product="product"
          @delete="handleDeleteClick"
          @edit="handleEdit"
        />
        <DeleteModal
          v-if="showDeleteModal"
          @confirm="confirmDelete"
          @click.self="closeModal"
          @cancel="closeModal"
        />
        <EditModal
          v-if="showEditModal"
          :show="showEditModal"
          :productData="productToEdit"
          @close="closeEditModal"
          :onUpdate="handleProductUpdated"
        />
      </table>
    </div>
    <TablePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>
