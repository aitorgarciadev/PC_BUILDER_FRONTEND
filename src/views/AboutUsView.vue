<template>
  <!-- Carousel siempre visible y sin efectos de scroll -->
  <Carousel />

  <section id="AboutUsSection" class="section">
    <AboutUs />
  </section>

  <section id="BlogSection" class="section">
    <BlogSection />
  </section>

  <!-- Botón para subir -->
  <UpBTN :class="{ visible: upButtonVisible }" />

  <FooterDiv />
</template>

<script setup>
import { onMounted, ref } from "vue";
import Carousel from "../components/Home/Carousel.vue";
import AboutUs from "../components/AboutUs/AboutUs.vue";
import FooterDiv from "../components/Global/FooterDiv.vue";
import BlogSection from "../components/Home/BlogSection.vue";
import UpBTN from "../components/Global/UpBTN.vue";

const sections = ref([]);
const upButtonVisible = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  sections.value.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollY;

    // Verificar si la sección está en el viewport
    if (scrollY + windowHeight > sectionTop + 50) {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible");
    }
  });

  // Mostrar el botón de subir si el usuario ha desplazado hacia abajo
  upButtonVisible.value = scrollY > 300;
};

onMounted(() => {
  // Obtener todas las secciones, excluyendo el Carousel
  sections.value = Array.from(document.querySelectorAll("section"));

  window.addEventListener("scroll", handleScroll);

  // Limpiar el event listener al desmontar
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
});
</script>

<style scoped>
/* Estilos generales para secciones */
.section {
  opacity: 0; /* Inicialmente ocultas */
  transform: translateY(20px); /* Desplazar un poco hacia abajo */
  transition: opacity 0.8s ease, transform 0.8s ease; /* Transición suave */
}

.section.visible {
  opacity: 1; /* Cuando está visible, mostrarlo */
  transform: translateY(0); /* Volver a la posición original */
}

/* Estilos para el componente StoreFeatures */
.store-features {
  min-height: auto; /* Mantener el tamaño original del StoreFeatures */
  opacity: 1; /* Siempre visible */
  transform: none; /* Sin efectos de transformación */
}

/* Estilos para el botón de subir */
#UpBTN {
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

#UpBTN.visible {
  opacity: 1; /* Mostrar el botón cuando es visible */
}
</style>
