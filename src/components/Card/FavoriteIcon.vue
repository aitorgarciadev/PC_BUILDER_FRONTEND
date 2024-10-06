<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { FavoriteStore } from "../../stores/favorites/FavoriteStore";
import { ModalStore } from "../../stores/modals/ModalStore";

const store = FavoriteStore();
const auth = useAuthStore();
const modal = ModalStore();

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const isFavorite = ref(false); // Estado que indica si es favorito
const isPulsing = ref(false); // Estado de la animación de pulso

// Verificar si el producto es favorito
const checkFavorite = async () => {
  try {
    const favorites = await store.getFavorites(auth.user.access_token);
    // Verificamos si el producto está en la lista de favoritos del usuario autenticado
    const productFavorite = favorites.content.find(
      (fav) => fav.product.id === props.productId
    );
    isFavorite.value = !!productFavorite; // Se convierte en true si existe, false si no
    if (isFavorite.value) {
      isPulsing.value = true; // Activa el pulso si es favorito
    }
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
  }
};

// Se ejecuta cuando el componente se monta
onMounted(() => {
  if (auth.user.isAuthenticated) {
    checkFavorite(); // Comprobar el favorito si el usuario está autenticado
  }
});

// Alternar el estado de favorito
const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      // Si es favorito, lo eliminamos
      await store.removeFavorite(props.productId, auth.user.access_token);
    } else {
      // Si no es favorito, lo añadimos
      await store.addFavorite(props.productId, auth.user.access_token);
    }
    // Re-evaluamos el estado después de añadir o eliminar
    await checkFavorite();
  } catch (error) {
    console.error("Error al alternar el estado de favorito:", error);
  }
};

// Abrir el modal de login si el usuario no está autenticado
const openLoginModal = () => {
  modal.open("login");
};
</script>

<template>
  <!-- Botón para marcar/desmarcar como favorito si el usuario está autenticado -->
  <button
    v-if="auth.user.isAuthenticated"
    @click="toggleFavorite"
    :class="[
      'heart-button',
      {
        'text-red-500': isFavorite, // Si es favorito, el corazón es rojo
        'text-gray-500': !isFavorite, // Si no es favorito, el corazón es gris
        pulsing: isPulsing, // Aplica animación de pulsación si está activado
      },
    ]"
    class="rounded-md text-center text-sm transition-all focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6"
    >
      <path
        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
      />
    </svg>
  </button>

  <!-- Botón de login si el usuario no está autenticado -->
  <button
    v-else
    @click="openLoginModal"
    class="rounded-md text-center text-sm transition-all focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button"
  >
    <span class="text-gray-400">Login to Favorite</span>
  </button>
</template>

<style scoped>
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.heart-button {
  transition: transform 0.2s ease-in-out;
}

.heart-button.pulsing {
  animation: heartbeat 3s;
}

.text-red-500 {
  color: red;
}
</style>
