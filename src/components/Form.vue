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

      <v-btn
        @click="submit"
        elevation="2"
        primary
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        starttime: "",
        endtime: "",
        minmagnitude: "",
      },
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
  },
};
</script>
