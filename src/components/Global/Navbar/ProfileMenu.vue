<script setup>
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
                  class="w-5 h-5 text-gray-500 mr-3"
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
                href="/favorite"
                :class="[
                  active ? 'bg-gray-100' : '',
                  ' px-4 py-2 text-sm text-gray-700 flex flex-row',
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 text-gray-500 mr-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Wishlist
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }" v-if="auth.user.role === 'ADMIN'">
              <a
                href="/admin/products"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'px-4 py-2 text-sm text-gray-700 flex flex-row',
                ]"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-500 mr-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>
                Dashboard
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
                  class="w-5 h-5 text-gray-500 mr-3"
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
</template>
