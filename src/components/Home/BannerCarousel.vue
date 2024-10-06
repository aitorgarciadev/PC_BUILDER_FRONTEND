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
          Discover trusted components and high-performance hardware for seamless
          upgrades and builds.
        </p>

        <div
          class="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start text-center"
        >
          <RouterLink to="/products">
            <button
              class="block w-full rounded bg-yellow-500 px-12 py-3 text-md text-center text-gray-950 font-medium text-bl shadow hover:bg-yellow-400 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto animate-item"
            >
              Get Started
            </button>
          </RouterLink>

          <RouterLink to="/about">
            <button
              class="block w-full rounded bg-white px-12 py-3 text-md text-center text-gray-950 font-medium shadow hover:bg-yellow-50 focus:outline-none focus:ring active:text-orange-500 sm:w-auto animate-item"
            >
              Learn More
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";

const mode = ref("scroll");
let timer = null;
let animationActive = ref(true);
const animateItems = ref([]);

const handleScroll = () => {
  if (mode.value === "scroll" && animationActive.value) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    animateItems.value.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + scrollY;

      if (scrollY + windowHeight > itemTop + 50) {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 250);
      } else {
        item.classList.remove("visible");
      }
    });
  }
};

const animateWithDelay = () => {
  if (mode.value === "delay" && animationActive.value) {
    animateItems.value.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 250);
    });
  }
};

const stopAnimationAfterTimeout = () => {
  timer = setTimeout(() => {
    animationActive.value = false;
    animateItems.value.forEach((item) => item.classList.remove("visible"));
  }, 300000);
};

const resetAnimation = () => {
  animateItems.value.forEach((item) => {
    item.classList.remove("visible");
    item.style.opacity = 0;
    item.style.transform = "translateY(20px)";
  });

  animationActive.value = true;

  if (mode.value === "scroll") {
    handleScroll();
  } else {
    animateWithDelay();
  }

  clearTimeout(timer);
  stopAnimationAfterTimeout();
};

onBeforeUnmount(() => {
  clearTimeout(timer);
  window.removeEventListener("scroll", handleScroll);
});

onMounted(() => {
  animateItems.value = Array.from(document.querySelectorAll(".animate-item"));

  if (mode.value === "scroll") {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  } else {
    animateWithDelay();
  }

  stopAnimationAfterTimeout();
});
</script>

<style scoped>
.animate-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.animate-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.bg-cover {
  z-index: 1;
}
</style>
