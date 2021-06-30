<style scoped></style>

<template>
  <v-form>
    <v-container>
      <v-row class="mb-6">
        <v-menu
          ref="startDateMenu"
          v-model="startDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDateFormatted"
              label="Start Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="startDate = parseDate(startDateFormatted, `start`)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            no-title
            @input="startDateMenu = false"
            :max="maxDate"
          ></v-date-picker>
        </v-menu>
      </v-row>
      <v-row class="mb-6">
        <v-menu
          ref="endDateMenu"
          v-model="endDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDateFormatted"
              label="End Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="endDate = parseDate(endDateFormatted, `end`)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            no-title
            @input="endDateMenu = false"
            :max="maxDate"
          ></v-date-picker>
        </v-menu>
      </v-row>
      <v-row class="mb-6">
        <v-select
          v-model="minMag"
          :items="magnitudes"
          label="Min Magnitude"
          @change="setMinMag"
        ></v-select>
      </v-row>
      <v-row class="mb-6">
        <v-select
          v-model="maxMag"
          :items="magnitudes"
          label="Max Magnitude"
          @change="setMaxMag"
        ></v-select>
      </v-row>
    </v-container>
    <v-row class="mb-6 d-flex justify-center">
      <v-btn elevation="2" plain raised @click="clearSearch"
        >Clear Search</v-btn
      ></v-row
    >
  </v-form>
</template>

<script>
export default {
  name: "MapForm",

  data: () => ({
    minMag: null,
    maxMag: null,
    startDateMenu: false,
    endDateMenu: false,
    startDate: null,
    startDateFormatted: null,
    endDate: null,
    endDateFormatted: null,
    maxDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    magnitudes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }),

  methods: {
    formatDate(date, type) {
      if (!date) return null;

      // validate start and end dates
      if (
        type === "start" &&
        this.endDate &&
        new Date(date) > new Date(this.endDate)
      ) {
        alert("Start date must be before end date");
        return;
      } else if (
        type === "end" &&
        this.startDate &&
        new Date(date) < new Date(this.startDate)
      ) {
        alert("End date must be after start date");
        return;
      }

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    setMinMag(mag) {
      this.$store.commit("setMinMag", mag);
    },
    setMaxMag(mag) {
      this.$store.commit("setMaxMag", mag);
    },
    clearSearch() {
      this.$store.commit("resetSearch");
    },
  },

  computed: {
    resetSearch() {
      return this.$store.getters.resetSearch;
    },
  },

  watch: {
    startDate() {
      this.startDateFormatted = this.formatDate(this.startDate, "start");

      this.$store.commit("setStartDate", this.startDate);
    },
    endDate() {
      this.endDateFormatted = this.formatDate(this.endDate, "end");

      this.$store.commit("setEndDate", this.endDate);
    },
    resetSearch(value) {
      if (!value) return;

      this.startDate = null;
      this.startDateFormatted = null;
      this.endDate = null;
      this.endDateFormatted = null;
      this.minMag = null;
      this.maxMag = null;
    },
  },
};
</script>
