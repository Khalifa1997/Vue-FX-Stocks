import { stock } from "@/types";
import { defineStore } from "pinia";

export const useStockStore = defineStore({
  id: "stock-store",
  state: () => ({
    stocks: [
      {
        symbol: "MSFT",
        open: 288.48,
        close: 291.91,
        high: 291.91,
        low: 286.94,
        volume: 22619675,
      },
    ] as stock[],
  }),
  actions: {
    add(item: stock) {
      this.stocks.push(item);
    },
  },
  getters: {
    getStocks: (state) => state.stocks,
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
