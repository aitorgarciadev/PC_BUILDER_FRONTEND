import { createI18n } from "vue-i18n";
import en from "./json/EN.json";
import es from "./json/ES.json";

const messages = {
  en,
  es,
};

// Función que obtiene el idioma del localStorage o devuelve 'en' por defecto.
const getLocale = () => {
  const storedLang = localStorage.getItem("lang");
  return storedLang ? storedLang : "en"; // Devuelve 'en' si no hay idioma guardado
};

// Crear la instancia de i18n
const i18n = createI18n({
  legacy: false, // Desactivar el modo legado para usar la API de composición
  locale: getLocale(), // Usar el idioma obtenido de localStorage o por defecto 'en'
  fallbackLocale: "en", // Si falla el idioma seleccionado, usa 'en'
  globalInjection: true, // Permite el uso global de $t
  messages, // Mensajes de traducción
});

export default i18n;
