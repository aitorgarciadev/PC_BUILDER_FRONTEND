<script setup>
import { ref } from "vue";
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
import LoginModal from "../LoginModal.vue";
import RegisterModal from "../RegisterModal.vue";
import { useI18n } from "vue-i18n";
import { UserIcon } from "@heroicons/vue/24/outline";

const openLogin = ref(false);
const openRegister = ref(false);
const logout = logoutStore();
const { t } = useI18n();

const open = (modal) => {
  if (modal === "login") openLogin.value = !openLogin.value;
  else if (modal === "register") openRegister.value = !openRegister.value;

  setTimeout(() => {
    openLogin.value = false;
    openRegister.value = false;
  }, 120000);
};

const auth = useAuthStore();
</script>

<template>
  <div class="relative py-1.5">
    <div v-if="!auth.user.isAuthenticated" role="menu" class="relative">
      <Menu as="div" class="relative">
        <MenuButton
          class="inline-flex items-center justify-center px-1.5 py-1.5 bg-white rounded-md hover:bg-gray-300 transition"
        >
          <UserIcon
            class="h-5 flex-shrink-0 w-5 text-black"
            aria-hidden="true"
          />
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
                @click="open('login')"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                ]"
              >
                {{ t("login") }}
              </button>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                @click="open('register')"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                ]"
              >
                {{ t("register") }}
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>

      <!-- Login Modal -->
      <TransitionRoot as="template" :show="openLogin">
        <Dialog class="relative z-10" @close="openLogin = !openLogin">
          <TransitionChild
            as="template"
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
                as="template"
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
                  <LoginModal />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <TransitionRoot as="template" :show="openRegister">
        <Dialog class="relative z-10" @close="openRegister = !openRegister">
          <TransitionChild
            as="template"
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
                as="template"
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
                  <RegisterModal />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>

    <div v-else role="menu" class="relative">
      <Menu as="div" class="relative">
        <div>
          <MenuButton
            class="inline-flex flex-shrink-0 items-center justify-center px-1.5 py-1.5 bg-white hover:bg-gray-300 rounded-md transition"
          >
            <UserIcon
              class="h-5 w-5 text-black flex-shrink-0"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

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
                @click="logout.logout()"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                ]"
              >
                {{ t("logout") }}
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
