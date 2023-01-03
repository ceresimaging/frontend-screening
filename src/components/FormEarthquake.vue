<template>
  <form @submit.prevent="submit">
    <v-row>
      <v-col cols="12">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date1 = parseDate(startDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date1"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              label="End Date"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date2 = parseDate(endDate)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date2"
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="minMagnitude"
          label="Min Magnitude"
          type="number"
        />
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn :disabled="searching" type="submit">{{
          searching ? "Searching..." : "Search"
        }}</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FormEarthquake",
  data() {
    return {
      date1: null,
      date2: null,
      startDate: null,
      endDate: null,
      menu1: false,
      menu2: false,
      minMagnitude: "",
    };
  },
  watch: {
    date1() {
      this.startDate = this.formatDate(this.date1);
    },
    date2() {
      this.endDate = this.formatDate(this.date2);
    },
  },
  computed: {
    ...mapState(["searching"]),
  },
  methods: {
    ...mapActions(["getDataApi"]),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    submit() {
      let search = {
        starttime: this.date1 || "",
        endtime: this.date2 || "",
        minmagnitude: this.minMagnitude || "",
      };
      this.getDataApi(search);
    },
  },
};
</script>

<style>
</style>