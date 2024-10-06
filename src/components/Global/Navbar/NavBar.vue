<template>
  <div class="bg-white">
    <transition name="fade">
      <div
        v-if="open"
        class="lg:hidden fixed inset-0 z-40 flex bg-black bg-opacity-25"
      >
        <div
          class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-slate-950 pb-12 shadow-xl"
        >
          <div class="flex px-4 pb-2 pt-5">
            <button
              type="button"
              class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
              @click="open = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div class="space-y-6 border-t border-white px-4 py-6">
            <div class="flow-root">
              <a href="/home" class="-m-2 block p-2 font-medium text-white">
                {{ t("home") }}
              </a>
            </div>
            <div class="flow-root">
              <a href="/products" class="-m-2 block p-2 font-medium text-white">
                {{ t("products") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <header class="relative bg-gray-950">
      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div class="flex h-16 items-center">
            <button
              type="button"
              class="relative rounded-md bg-white p-1 text-black lg:hidden"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              class="ml-4 flex lg:ml-0 items-center space-x-2 hover:brightness-75"
            >
              <RouterLink to="/" class="hidden md:block">
                <span class="sr-only">PC-BUILDER</span>
                <div class="flex space-x-2">
                  <img
                    class="h-8 w-auto"
                    src="/src/assets/img/logo/LOGO-IMG.svg"
                    alt="Logo 1"
                  />
                  <img
                    class="h-8 w-auto mt-0.5"
                    src="/src/assets/img/logo/LOGO-TXT.svg"
                    alt="Logo 2"
                  />
                </div>
              </RouterLink>
            </div>

            <div class="hidden lg:flex h-full space-x-8">
              <a
                href="/home"
                class="flex items-center text-sm font-medium text-white hover:text-yellow-400"
              >
                {{ t("home") }}
              </a>
              <a
                href="/products"
                class="flex items-center text-sm font-medium text-white hover:text-yellow-400"
              >
                {{ t("products") }}
              </a>
            </div>

            <div class="ml-auto flex items-center">
              <div class="ml-4 text-white">
                <SearchButton />
              </div>
              <div class="ml-4 text-white">
                <LanguageSelector />
              </div>
              <div class="ml-4 text-white">
                <ProfileMenu />
              </div>
              <div class="ml-4 bg-white rounded-md">
                <ShoppingCart />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ShoppingCart from "../ShoppingCart/ShoppingCart.vue";
import ProfileMenu from "./ProfileMenu.vue";
import LanguageSelector from "./LanguageSelector.vue";
import SearchButton from "./SearchButton.vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const open = ref(false);
const { t } = useI18n();
</script>
