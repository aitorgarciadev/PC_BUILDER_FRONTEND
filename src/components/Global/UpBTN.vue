<template>
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
      buttonVisible: false,
      inactivityTimeout: null,
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
      if (window.scrollY > 100) {
        this.showButtonWithTimer();
      } else {
        this.buttonVisible = false;
      }
    },
    resetInactivityTimer() {
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }

      this.inactivityTimeout = setTimeout(() => {
        this.buttonVisible = false;
      }, 1500);
    },
    showButtonWithTimer() {
      this.buttonVisible = true;
      this.resetInactivityTimer();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.resetInactivityTimer); // Resetea el temporizador con cualquier movimiento del ratón
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.resetInactivityTimer);
  },
};
</script>

<style scoped>
btn {
  bottom: 40px;
  right: 30px;
  margin-bottom: 10px;
  color: white;
  text-decoration: none;
  background-color: black;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
btn:hover {
  cursor: pointer;
  opacity: 1;
}
.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-out {
  opacity: 0.1;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  btn {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
}
</style>
