import { defineStore } from "pinia";
import { useProductService } from "./productService";

export const useProductStore = defineStore("productStore", () => {
  const productService = useProductService();

  return {
    ...productService,
  };
});
