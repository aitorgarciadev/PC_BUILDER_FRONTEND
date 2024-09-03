import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";

import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
createApp(App).mount("#app");
