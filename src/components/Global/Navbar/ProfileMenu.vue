<!-- <script setup>
import { ref, computed } from "vue";
import { logoutStore } from "../../../stores/logout";
import { useAuthStore } from "../../../stores/auth";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import LoginModal from "../../Global/Auth/LoginModal.vue";
import RegisterModal from "../../Global/Auth/RegisterModal.vue";
import { useI18n } from "vue-i18n";
import { UserIcon } from "@heroicons/vue/24/outline";

const openLogin = ref(false);
const openRegister = ref(false);
const logout = logoutStore();
const { t } = useI18n();
const auth = useAuthStore();

const isAuthenticated = computed(() => auth.user.isAuthenticated);

const toggleModal = (modal) => {
  if (modal === "login") {
    openLogin.value = !openLogin.value;
    openRegister.value = false; // Ensure only one modal is open at a time
  } else if (modal === "register") {
    openRegister.value = !openRegister.value;
    openLogin.value = false; // Ensure only one modal is open at a time
  }
};

const closeModal = (modal) => {
  if (modal === "login") openLogin.value = false;
  else if (modal === "register") openRegister.value = false;
};
</script>

<template>
  <div class="relative py-1.5">
    <div v-if="!isAuthenticated" role="menu" class="relative">
      <Menu as="div" class="relative">
        <MenuButton
          class="inline-flex items-center justify-center px-1.5 py-1.5 bg-white rounded-md hover:bg-gray-300 transition"
          aria-label="User menu"
        >
          <UserIcon class="h-5 w-5 text-black" aria-hidden="true" />
        </MenuButton>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
          >
            <MenuItem v-slot="{ active }">
              <button
                @click="toggleModal('login')"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                ]"
                aria-label="Login"
              >
                {{ t("login") }}
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="toggleModal('register')"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                ]"
                aria-label="Register"
              >
                {{ t("register") }}
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>

      <!-- Login Modal -->
      <TransitionRoot :show="openLogin" as="template">
        <Dialog class="relative z-10" @close="closeModal('login')">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            ></div>
          </TransitionChild>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <TransitionChild
                enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel
                  class="shadow-xl transition-all w-full max-w-md rounded-2xl"
                >
                  <LoginModal @close="closeModal('login')" />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <TransitionRoot :show="openRegister" as="template">
        <Dialog class="relative z-10" @close="closeModal('register')">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            ></div>
          </TransitionChild>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <TransitionChild
                enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel
                  class="shadow-xl transition-all w-full max-w-md rounded-2xl"
                >
                  <RegisterModal @close="closeModal('register')" />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>

    <div v-else role="menu" class="relative">
      <Menu as="div" class="relative">
        <MenuButton
          class="inline-flex flex-shrink-0 items-center justify-center px-1.5 py-1.5 bg-white hover:bg-gray-300 rounded-md transition"
          aria-label="User menu"
        >
          <UserIcon class="h-5 w-5 text-black" aria-hidden="true" />
        </MenuButton>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
          >
            <MenuItem v-slot="{ active }">
              <a
                href="/profile"
                :class="[
                  active ? 'bg-gray-100' : '',
                  ' px-4 py-2 text-sm text-gray-700 flex flex-row',
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 text-slate-400 mr-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t("yourProfile") }}
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                @click="logout.logout()"
                :class="[
                  active ? 'bg-gray-100' : '',
                  ' px-4 py-2 text-sm text-gray-700 flex flex-row',
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 text-slate-400 mr-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ t("logout") }}
              </a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template> -->
