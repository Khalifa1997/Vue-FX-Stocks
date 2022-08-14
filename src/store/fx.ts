import { FX } from "@/types";

import { defineStore } from "pinia";

export const useFXStore = defineStore({
  id: "fx-store",
  state: () => ({
    fxs: [
      {
        currencyA: "EUR",
        currencyB: "EGP",
        price: 19.66,
      },
    ] as FX[],
  }),
  actions: {
    add(item: FX) {
      this.fxs.push(item);
    },
  },
  getters: {
    getStocks: (state) => state.fxs,
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
      },
    ],
  },
});
