<template>
  <section
    class="h-[95vh] w-full bg-[url(https://images.unsplash.com/photo-1725272413223-9eb0f5d7a6a4?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="z-10 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
    >
      <div class="max-w-xl text-center sm:text-left">
        <h1 class="text-3xl font-extrabold text-white sm:text-5xl animate-item">
          Let us find your
          <strong class="block font-extrabold text-yellow-400 animate-item"
            >Favourite Components.</strong
          >
        </h1>

        <p class="mt-4 max-w-lg text-white sm:text-xl/relaxed animate-item">
          Discover trusted computer components and high-performance hardware for
          seamless upgrades and builds.
        </p>

        <div
          class="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start text-center"
        >
          <a
            href="#"
            class="block w-full rounded bg-yellow-500 px-12 py-3 text-md text-center text-gray-950 font-medium text-bl shadow hover:bg-yellow-400 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto animate-item"
            >Get Started</a
          >

          <a
            href="#"
            class="block w-full rounded bg-white px-12 py-3 text-md text-center text-gray-950 font-medium shadow hover:bg-yellow-50 focus:outline-none focus:ring active:text-orange-500 sm:w-auto animate-item"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";

// Modo de animación, puede ser "scroll" o "delay"
const mode = ref("scroll"); // Cambia a "delay" para la opción con retraso breve
let timer = null; // Temporizador para detener la animación tras 5 minutos
let animationActive = ref(true); // Estado de la animación
const animateItems = ref([]);

// Función para manejar el scroll
const handleScroll = () => {
  if (mode.value === "scroll" && animationActive.value) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Agregar animación a los elementos con la clase 'animate-item'
    animateItems.value.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + scrollY;

      // Verificar si el elemento está en el viewport
      if (scrollY + windowHeight > itemTop + 50) {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 250); // Aumentar el retraso a 250 ms
      } else {
        item.classList.remove("visible");
      }
    });
  }
};

// Función para manejar la animación con retraso
const animateWithDelay = () => {
  if (mode.value === "delay" && animationActive.value) {
    animateItems.value.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 250); // Aumentar el retraso a 250 ms
    });
  }
};

// Función para desactivar la animación después de 5 minutos
const stopAnimationAfterTimeout = () => {
  timer = setTimeout(() => {
    animationActive.value = false; // Desactivar animación
    animateItems.value.forEach((item) => item.classList.remove("visible")); // Resetear visibilidad
  }, 300000); // 300000 ms = 5 minutos
};

// Función para reiniciar la animación cuando sea necesario
const resetAnimation = () => {
  animationActive.value = true;
  if (mode.value === "scroll") {
    handleScroll(); // Volver a activar por scroll
  } else {
    animateWithDelay(); // Volver a activar por retraso
  }
  stopAnimationAfterTimeout(); // Reiniciar el temporizador de 5 minutos
};

// Limpiar el temporizador y event listeners
onBeforeUnmount(() => {
  clearTimeout(timer);
  window.removeEventListener("scroll", handleScroll);
});

onMounted(() => {
  // Obtener todos los elementos con la clase 'animate-item'
  animateItems.value = Array.from(document.querySelectorAll(".animate-item"));

  // Activar la animación basada en el modo
  if (mode.value === "scroll") {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Inicializar la animación por scroll
  } else {
    animateWithDelay(); // Inicializar la animación por retraso
  }

  // Iniciar el temporizador de 5 minutos
  stopAnimationAfterTimeout();
});
</script>

<style scoped>
/* Estilos para los elementos que se animan */
.animate-item {
  opacity: 0; /* Inicialmente ocultos */
  transform: translateY(20px); /* Desplazar un poco hacia abajo */
  transition: opacity 1.2s ease, transform 1.2s ease; /* Transición más lenta (1.2s) */
}

.animate-item.visible {
  opacity: 1; /* Cuando está visible, mostrarlo */
  transform: translateY(0); /* Volver a la posición original */
}

.bg-cover {
  z-index: 1;
}
</style>
