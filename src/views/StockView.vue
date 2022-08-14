<template>
  <div>
    <div class="d-flex justify-center mt-2">
      <a style="color: blue; font-size: larger" href="/fx">Go to FX</a>
    </div>
    <v-form>
      <v-container>
        <v-row class="justify-center align-content-center">
          <v-col cols="12" md="4" v-model="valid">
            <v-text-field
              v-model="name"
              label="Stock Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" class="justify-center align-start">
            <v-btn :disabled="!valid" color="primary" @click.prevent="addItem"
              >Add</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div class="d-flex flex-row justify-center flex-wrap align-content-center">
      <v-card
        v-for="item in stocks"
        :key="item.symbol"
        class="mx-3 my-10"
        min-width="320"
        min-height="220"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4 text-h5 red--text">
              {{ item.symbol }}
            </div>
            <v-list-item-title
              class="text-h5 mb-1 text--green"
              :style="[
                item.close > item.open ? { color: 'green' } : { color: 'red' },
              ]"
            >
              {{ item.close }}
            </v-list-item-title>
            <div class="ml-auto">
              <div>Open:{{ item.open }}</div>
              <div>Close:{{ item.close }}</div>
              <div>High:{{ item.high }}</div>
              <div>Low:{{ item.low }}</div>
              <div>Volume:{{ item.volume }}</div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div class="d-flex justify-center" v-if="loading">
      <v-progress-circular
        :size="90"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import { useStockStore } from "@/store/stock";
import { mapActions, mapState } from "pinia";
import { stock } from "@/types";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      price: 0,
      valid: true,
      symbol: "",
      name: "",

      open: 0,
      close: 0,
      high: 0,
      low: 0,

      show: false,
      loading: false,
    };
  },

  methods: {
    ...mapActions(useStockStore, ["add"]),
    async addItem() {
      if (this.stocks.findIndex((el) => el.symbol === this.name) != -1) return;
      this.loading = true;
      console.log(this.stocks);
      await axios
        .get(
          "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
            this.name +
            "&interval=1min&apikey=K1WWSVNCXER51IDR"
        )
        .then((res) => {
          const item = {} as stock;

          console.log(res.data);
          item.symbol = res.data["Global Quote"]["01. symbol"];
          item.open = res.data["Global Quote"]["02. open"];
          item.high = res.data["Global Quote"]["03. high"];
          item.low = res.data["Global Quote"]["04. low"];
          item.close = res.data["Global Quote"]["05. price"];
          item.volume = res.data["Global Quote"]["06. volume"];

          this.add(item);
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    ...mapState(useStockStore, ["stocks"]),
  },
});
</script>

<style scoped></style>
