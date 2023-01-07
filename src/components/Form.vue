<template>
  <v-container fluid width="300">
    <v-row>
      <v-col cols="10">
        <v-text-field
          label="Start Date"
          type="date"
          v-model="startTime"
          value="dd-mm-yyyy"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-text-field
          label="End Date"
          type="date"
          value="dd-mm-yyyy"
          v-model="endTime"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-text-field
          label="Min magnitude"
          type="number"
          v-model="inputMag"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-btn @click.prevent="searchAll()">search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <div class="alert-container">
          <p class="alert" v-if="this.noData">there are no results</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    inputMag: null,
    startTime: "",
    endTime: "",
  }),
  computed: { ...mapGetters(["getEarthQuakes"]), ...mapState(["noData"]) },
  methods: {
    searchAll() {
      this.$store.dispatch("fetchEarthquakes", {
        startTime: this.startTime,
        endTime: this.endTime,
        minmag: this.inputMag,
      });
    },
  },
};
</script>

<style>
.alert-container .alert {
  background-color: aliceblue;
  color: red;
  text-align: center;
}
</style>
