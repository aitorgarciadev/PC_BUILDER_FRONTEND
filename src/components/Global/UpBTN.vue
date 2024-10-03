<template>
  <!-- Botón para subir a la navbar -->
  <btn
    href="#"
    @click.prevent="scrollToCarousel"
    :class="[
      'p-1 text-2xl rounded-full text-center items-center fixed',
      buttonVisible ? 'fade-in' : 'fade-out',
    ]"
  >
    ↑
  </btn>
</template>

<script>
export default {
  data() {
    return {
      buttonVisible: false, // Controla la visibilidad del botón
      inactivityTimeout: null, // Referencia al temporizador de inactividad
    };
  },
  methods: {
    scrollToCarousel() {
      const carousel = document.getElementById("scrollBtn");
      if (carousel) {
        carousel.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    handleScroll() {
      // Mostrar el botón si el scroll pasa de 100px
      if (window.scrollY > 100) {
        this.showButtonWithTimer();
      } else {
        this.buttonVisible = false;
      }
    },
    resetInactivityTimer() {
      // Borra cualquier temporizador activo
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }

      // Establece un nuevo temporizador de 5 segundos (5000 ms) de inactividad
      this.inactivityTimeout = setTimeout(() => {
        this.buttonVisible = false; // Ocultar el botón por inactividad
      }, 1500);
    },
    showButtonWithTimer() {
      this.buttonVisible = true; // Mostrar el botón
      this.resetInactivityTimer(); // Reiniciar el temporizador
    },
  },
  mounted() {
    // Agregar listeners al evento scroll y movimiento del ratón
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.resetInactivityTimer); // Resetea el temporizador con cualquier movimiento del ratón
  },
  beforeDestroy() {
    // Eliminar los listeners cuando el componente se destruye
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.resetInactivityTimer);
  },
};
</script>

<style scoped>
/* Estilos generales para el botón */
btn {
  bottom: 40px;
  right: 30px;
  margin-bottom: 10px;
  color: white;
  text-decoration: none;
  background-color: black;
  width: 45px; /* Ancho ajustado */
  height: 45px; /* Alto ajustado */
  border-radius: 50%; /* Hacerlo circular */
  display: flex; /* Centrar contenido */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  z-index: 1000; /* Asegurarse de que esté por encima del contenido */
  opacity: 0; /* Oculto por defecto */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Animaciones de opacidad y transformación */
}
btn:hover {
  cursor: pointer;
}
/* Mostrar el botón con animación */
.fade-in {
  opacity: 1; /* Totalmente visible */
  transform: translateY(0); /* Sin desplazamiento */
}

/* Ocultar el botón con animación */
.fade-out {
  opacity: 0.1; /* Totalmente oculto */
  transform: translateY(20px); /* Desplazado hacia abajo */
}

/* Estilos para pantallas móviles */
@media (max-width: 768px) {
  btn {
    bottom: 20px; /* Más cerca de la parte inferior */
    right: 20px; /* Más cerca del borde derecho */
    width: 50px; /* Un poco más grande en mobile */
    height: 50px;
  }
}
</style>
