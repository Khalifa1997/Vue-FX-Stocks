<template>
  <v-container>
    <div class="d-flex justify-center mt-2 mb-4">
      <a style="color: blue; font-size: larger" href="/stock">Go to Stocks</a>
    </div>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-autocomplete
          v-model="valueA"
          :items="abbreviations"
          outlined
          dense
          label="Outlined"
        ></v-autocomplete>
      </v-col>

      <v-col cols="4">
        <v-autocomplete
          v-model="valueB"
          :items="abbreviations"
          outlined
          dense
          label="Outlined"
        ></v-autocomplete>
      </v-col>
      <v-col cols="1">
        <v-btn rounded x-large color="primary" @click.prevent="convert"
          >Convert</v-btn
        >
      </v-col>
    </v-row>

    <v-row align="center" justify="center" v-for="fx in fxs">
      <v-col cols="3">
        <v-text-field disabled rounded filled dense>{{
          fx.currencyA
        }}</v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field disabled rounded filled dense>{{
          fx.currencyB
        }}</v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field disabled rounded filled dense>{{
          fx.price
        }}</v-text-field>
      </v-col>
    </v-row>
    <div class="d-flex justify-center" v-if="loading">
      <v-progress-circular
        :size="90"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { currencies } from "@/commons";
import { useFXStore } from "@/store/fx";
import { mapActions, mapState } from "pinia";
import { currency, FX } from "@/types";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      items: currencies as currency[],
      valueA: "",
      valueB: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(useFXStore, ["add"]),

    async convert() {
      const currA = this.valueA.split("-")[0];
      const currB = this.valueB.split("-")[0];
      this.loading = true;
      await axios
        .get(
          `https://api.apilayer.com/exchangerates_data/convert?to=${currB}&from=${currA}&amount=1`,
          {
            headers: {
              apikey: "wTrLv03uxCTjDYQz5hLhwiJ7DNVLUZKU",
            },
          }
        )
        .then((res) => {
          const result = parseFloat(res.data.result.toFixed(2));
          this.add({
            currencyA: currA,
            currencyB: currB,
            price: result,
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    abbreviations(): string[] {
      return this.items.map(
        (el: currency) => `${el.abbreviation}- ${el.currency}`
      );
    },
    ...mapState(useFXStore, ["fxs"]),
  },
});
</script>

<style scoped></style>
