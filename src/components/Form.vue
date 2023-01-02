<template>
  <form class="px-4" action="">
    <!-- Start Time -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-text-field
          readonly
          label="Start Date"
          v-model="formattedStartDate"
          v-on="on"
          prepend-inner-icon="mdi-calendar"
          :max="maxDate"
        >
        </v-text-field>
      </template>
      <v-date-picker
        v-model="formData.starttime"
        no-title
        :max="maxDate"
      ></v-date-picker>
    </v-menu>

    <!-- End Time -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-text-field
          readonly
          label="End Date"
          v-model="formattedEndDate"
          v-on="on"
          prepend-inner-icon="mdi-calendar"
        >
        </v-text-field>
      </template>
      <v-date-picker
        v-model="formData.endtime"
        no-title
        :min="this.formData.starttime"
        :max="maxDate"
      ></v-date-picker>
    </v-menu>

    <!-- Magnitude -->
    <v-text-field
      label="Min Magnitude"
      v-model="formData.minmagnitude"
    ></v-text-field>

    <v-btn
      @click="submit"
      elevation="2"
      primary
      block
      :disabled="
        !(
          this.formData.starttime ||
          this.formData.endtime ||
          this.formData.minmagnitude
        )
      "
      >Search</v-btn
    >
  </form>
</template>

<script>
export default {
  name: "Form",

  data() {
    return {
      maxDate: null,
      formData: {
        starttime: "",
        endtime: "",
        minmagnitude: "",
      },
    };
  },

  computed: {
    formattedStartDate() {
      // This could be used to format the value shown in the input
      return this.formData.starttime;
    },
    formattedEndDate() {
      // This could be used to format the value shown in the input
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
    formatMaxDate(date) {
      /**
       * Format js Date() into YYYY-MM-DD format
       * @param date Date() Sun Jan 01 2023 20:38:20 GMT-0300
       * @returns 2023-01-01
       */
      return date.toISOString().split("T")[0];
    },
  },

  mounted() {
    // Set maximum available date for datepickers (today) when component mounts
    const today = new Date();
    this.maxDate = this.formatMaxDate(today);
  },
};
</script>
