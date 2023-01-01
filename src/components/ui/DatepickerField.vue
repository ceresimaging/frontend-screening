<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        readonly
        :label="label"
        v-model="textFieldValue"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        prepend-inner-icon="mdi-calendar"
      >
      </v-text-field>
    </template>
    <v-date-picker
      v-bind:datepickerValue.sync="datepickerValue"
      color="green lighten-1"
      no-title
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["label", "datepickerValue", "textFieldValue"],
  data() {
    return {
      dateValue: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
