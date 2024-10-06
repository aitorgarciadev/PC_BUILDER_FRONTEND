<template>
  <footer class="bg-gray-950 py-12 px-8 font-sans tracking-wide">
    <div class="grid max-sm:grid-cols-1 lg:grid-cols-3 items-center gap-8">
      <h2 class="lg:col-span-2 text-xl font-semibold text-gray-300">
        Join our newsletter to keep up to date with us!<br />
      </h2>
      <div
        class="bg-transparent border border-gray-800 flex px-1 py-1 rounded-full"
      >
        <input
          type="email"
          placeholder="Enter your email"
          class="w-full outline-none bg-transparent pl-4 text-sm text-gray-300"
        />
        <button
          type="button"
          class="bg-gray-600 hover:bg-yellow-700 transition-all text-gray-200 text-sm rounded-full px-5 py-2.5"
        >
          Subscribe
        </button>
      </div>
    </div>

    <hr class="my-12 border-gray-800" />

    <div
      class="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-20 max-lg:gap-8"
    >
      <div class="lg:col-span-3 max-lg:col-span-full">
        <a href="javascript:void(0)" class="flex space-x-4">
          <!-- Primera imagen -->
          <img
            src="../../assets/img/logo/LOGO-IMG.svg"
            alt="logo"
            class="w-16"
          />
          <!-- Segunda imagen (duplicada) -->
          <img
            src="../../assets/img/logo/LOGO-TXT.svg"
            alt="logo"
            class="w-40 mt-2"
          />
        </a>
        <p class="text-gray-300 text-sm lg:max-w-sm mt-6">
          High-quality components designed for performance and reliability,
          tailored for enthusiasts and professionals.
        </p>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-4 text-gray-300">About us</h4>
        <ul class="space-y-4">
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-gray-200 text-sm"
              >Web Development</a
            >
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-gray-200 text-sm"
              >Mobile App Development</a
            >
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-gray-200 text-sm"
              >UI/UX Design</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-4 text-gray-300">Contact</h4>
        <ul class="space-y-4">
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-gray-200 text-sm"
              >Github</a
            >
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-gray-200 text-sm"
              >Linkedin</a
            >
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-gray-200 text-sm"
              >Email</a
            >
          </li>
        </ul>
      </div>
    </div>

    <p class="text-sm text-gray-300 mt-8">© PC-BUILDER. All rights reserved.</p>
  </footer>
</template>
