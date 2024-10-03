<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../../../stores/auth.js";
import { useI18n } from "vue-i18n";

const password = ref("");
const passwordAgain = ref("");
const email = ref("");
const textAlert = ref("");

const store = useAuthStore();

const { t } = useI18n();

const placeholderText = computed(() => t("Password"));
const placeholderText2 = computed(() => t("confirmPassword"));

async function register() {
  if (password.value !== "" && email.value !== "") {
    if (password.value === passwordAgain.value) {
      try {
        const response = await store.register(email.value, password.value);

        if (response.id) {
          store.user.id = response["id"];
          store.user.email = email.value;
          store.user.role = response["role"];
          store.user.isAuthenticated = true;
          store.user.access_token = response["access_token"];
          store.user.refresh_token = response["refresh_token"];

          localStorage.setItem("id", response["id"]);
          localStorage.setItem("email", email.value);
          localStorage.setItem("role", response["role"]);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("access_token", response["access_token"]);
          localStorage.setItem("refresh_token", response["refresh_token"]);

          textAlert.value = "";
          password.value = "";
          passwordAgain.value = "";
          email.value = "";
        } else {
          textAlert.value = t("alert4");
        }
      } catch (error) {
        textAlert.value = t("alert5");
      }
    } else {
      textAlert.value = t("alert6");
    }
  } else {
    textAlert.value = t("alert3");
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="relative flex flex-col w-full max-w-lg px-6 py-12 bg-gray-950 border-2 border-gray-300/30 rounded-xl shadow-md lg:px-8 lg:py-20"
    >
      <div class="flex justify-center mb-10 space-x-4">
        <img
          class="h-32 w-32 ml-16 object-contain"
          src="/src/assets/img/logo/LOGO-IMG.svg"
          alt="Your Company"
        />
        <img
          class="h-32 w-32 mr-16 object-contain"
          src="/src/assets/img/logo/LOGO-TXT.svg"
          alt="Your Company"
        />
      </div>

      <div class="w-full sm:max-w-sm mx-auto">
        <form class="space-y-6" @submit.prevent="register">
          <div>
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="Email"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-300 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                :placeholder="placeholderText"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-300 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input
                v-model="passwordAgain"
                id="passwordAgain"
                name="passwordAgain"
                type="password"
                autocomplete="new-password"
                :placeholder="placeholderText2"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-300 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-md font-semibold leading-6 text-black shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-800 transition duration-150 transform hover:scale-105"
            >
              Sign up
            </button>
          </div>

          <div
            v-if="textAlert != ''"
            class="mt-4 relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100"
          >
            <div class="mr-12">{{ textAlert }}</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
