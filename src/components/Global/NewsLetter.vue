<template>
  <!-- Contenedor principal con animación al hacer scroll -->
  <div
    class="mx-auto max-w-full lg:mx-0 text-center pb-20 pt-20 bg-white p-8 items-center animate-item"
  >
    <h2
      class="text-3xl font-bold tracking-tight text-gray-950 text-center sm:text-4xl animate-item"
    >
      Exclusive closing offers
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600 animate-item">
      Limited-time promotions expiring soon
    </p>
  </div>

  <div class="mx-auto max-w-[1200px] px-5 rounded-md">
    <section
      class="flex max-w-[1200px] justify-between bg-gray-950 px-5 rounded-md animate-item"
    >
      <div class="py-8 px-3 lg:px-16">
        <p class="text-white animate-item">ONLINE EXCLUSIVE</p>
        <h2 class="pt-6 text-5xl font-bold text-yellow-400 animate-item">
          15% OFF
        </h2>
        <p class="pt-4 text-white animate-item">
          ACCENT CHAIRS, <br />
          TABLES & OTTOMANS
        </p>
        <button
          href="#"
          class="mt-6 bg-amber-400 px-4 py-2 duration-100 rounded-md hover:bg-yellow-300 animate-item"
        >
          Shop now
        </button>
      </div>

      <img
        class="-mr-5 hidden w-[550px] object-cover md:block rounded-md animate-item"
        src="https://images.unsplash.com/photo-1609815697866-033945af9797?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Rainbow credit card with macbook on a background"
      />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";

const animateItems = ref([]);

// Función para manejar el scroll y la animación
const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // Agregar animación a los elementos con la clase 'animate-item'
  animateItems.value.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top + scrollY;
    const itemBottom = rect.bottom + scrollY;

    // Verificar si el elemento está en el viewport
    if (scrollY + windowHeight > itemTop + 50 && scrollY < itemBottom) {
      item.classList.add("visible");
    } else {
      item.classList.remove("visible");
    }
  });
};

onMounted(() => {
  // Obtener todos los elementos con la clase 'animate-item'
  animateItems.value = Array.from(document.querySelectorAll(".animate-item"));

  // Agregar el event listener para el scroll
  window.addEventListener("scroll", handleScroll);

  // Llamar la función por si la página ya está en scroll inicial
  handleScroll();
});

// Limpiar el event listener al desmontar el componente
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Estilos para los elementos que se animan */
.animate-item {
  opacity: 0; /* Inicialmente ocultos */
  transform: translateY(20px); /* Desplazar un poco hacia abajo */
  transition: opacity 0.6s ease, transform 0.6s ease; /* Transición suave */
}

.animate-item.visible {
  opacity: 1; /* Cuando está visible, mostrarlo */
  transform: translateY(0); /* Volver a la posición original */
}

html {
  scroll-behavior: smooth;
}
</style>
