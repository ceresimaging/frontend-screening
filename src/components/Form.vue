<template>
  <div>
    <form action="">
      <!-- Start Time -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            readonly
            label="Start Date"
            v-model="formattedStartDate"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            prepend-inner-icon="mdi-calendar"
          >
          </v-text-field>
        </template>
        <v-date-picker
          v-model="formData.starttime"
          color="green lighten-1"
          no-title
        ></v-date-picker>
      </v-menu>

      <!-- End Time -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            readonly
            label="End Date"
            v-model="formattedEndDate"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            prepend-inner-icon="mdi-calendar"
          >
          </v-text-field>
        </template>
        <v-date-picker
          v-model="formData.endtime"
          color="green lighten-1"
          no-title
        ></v-date-picker>
      </v-menu>

      <!-- Magnitude -->
      <v-text-field
        label="Magnitude"
        v-model="formData.minmagnitude"
      ></v-text-field>

      <!-- @click="fetchData" -->
      <v-btn
        @click="submit"
        elevation="2"
        primary
        :disabled="
          !this.formData.starttime ||
          !this.formData.endtime ||
          !this.formData.minmagnitude
        "
        >Search</v-btn
      >

      <v-btn @click="cosa"> Increase by 1 </v-btn>
    </form>
  </div>
</template>

<script>
// Query: features -> item -> properties -> mag, place, time
// https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&minmagnitude=1

export default {
  data() {
    return {
      formData: {
        starttime: "",
        endtime: "",
        minmagnitude: "",
      },
      fetchedData: null,
    };
  },
  computed: {
    formattedStartDate() {
      return this.formData.starttime;
    },
    formattedEndDate() {
      return this.formData.endtime;
    },
  },
  methods: {
    submit() {
      this.$emit(
        "send-form-data",
        this.formData.starttime,
        this.formData.endtime,
        this.formData.minmagnitude
      );
    },
    fetchData() {
      fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.formData.starttime}&endtime=${this.formData.endtime}&minmagnitude=${this.formData.minmagnitude}`
      )
        .then((response) => {
          response
            .json()
            .then((res) => console.log(res))
            .then((res) => (this.fetchedData = res))
            .then(() => this.$emit("fetchData", this.fetchedData));
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cosa() {
      this.$emit("increase-by", 1);
    },
  },
};
</script>
