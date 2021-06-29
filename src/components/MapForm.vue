<style scoped></style>

<template>
  <v-form>
    <v-container>
      <v-row>
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
              @blur="startDate = parseDate(startDateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            no-title
            @input="startDateMenu = false"
          ></v-date-picker>
        </v-menu>
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
              @blur="endDate = parseDate(endDateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            no-title
            @input="endDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-row>
      <v-row>
        <v-select
          :items="magnitudes"
          label="Min Magnitude"
          @change="setMinMag"
        ></v-select>
      </v-row>
      <v-row>
        <v-select
          :items="magnitudes"
          label="Max Magnitude"
          @change="setMaxMag"
        ></v-select>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "MapForm",

  data: (vm) => ({
    startDateMenu: false,
    endDateMenu: false,
    startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    startDateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    endDateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    magnitudes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }),

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      console.log(date);
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    setMinMag(mag) {
      this.$store.commit("setMinMag", mag);
    },
    setMaxMag(mag) {
      this.$store.commit("setMaxMag", mag);
    },
  },
};
</script>
