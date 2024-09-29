<template>
  <section
    class="bg-[url(https://images.unsplash.com/photo-1725272413223-9eb0f5d7a6a4?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-banner bg-cover bg-center bg-no-repeat"
  >
    <!-- Ajuste de la opacidad para oscurecer el fondo -->

    <div
      class="z-10 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
    >
      <!-- Asegúrate de que este contenedor tenga un z-index bajo para que no interfiera con la barra de navegación -->
      <div class="max-w-xl text-center sm:text-left">
        <h1 class="text-3xl font-extrabold text-white sm:text-5xl">
          Let us find your
          <strong class="block font-extrabold text-navy"
            >Favourite Components.</strong
          >
        </h1>

        <p class="mt-4 max-w-lg text-white sm:text-xl/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          illo tenetur fuga ducimus numquam ea!
        </p>

        <div
          class="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start text-center"
        >
          <!-- Alinear los botones con el texto -->
          <a
            href="#"
            class="block w-full rounded bg-navy px-12 py-3 text-sm font-medium text-white shadow hover:text-black hover:bg-navy focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
          >
            Get Started
          </a>

          <a
            href="#"
            class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-navy shadow hover:text-navy focus:outline-none focus:ring active:text-orange-500 sm:w-auto"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Asegúrate de que el z-index del fondo sea bajo */
.bg-cover {
  z-index: 1;
}

.bg-banner {
}
</style>
