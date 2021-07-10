<template>
  <v-col
    cols="12"
  >
    <v-dialog
      ref="startdialog"
      v-model="startmodal"
      :return-value.sync="startdate"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="startdate"
          label="Start Time:"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="startdate"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="startmodal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.startdialog.save(startdate)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog> <!-- start time picker -->

    <v-spacer></v-spacer>

    <v-dialog
      ref="dialog"
      v-model="endmodal"
      :return-value.sync="enddate"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="enddate"
          label="End Time:"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="enddate"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="endmodal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(enddate)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog> <!-- end time picker -->

    <v-spacer></v-spacer>

    <v-slider
      max="8"
      min="0"
      v-model="minmag.val"
      :label="minmag.label"
      :thumb-color="minmag.color"
      thumb-label="always"
      persistent-hint
      hint="(whole numbers only)"
    >
    </v-slider>
    <span></span>
  </v-col>
</template>

<script>
export default {
  name: "SidebarForm",

  data: () => ({
    startdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    enddate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    startmodal: false,
    endmodal: false,
    minmag: { label: 'Minimum Magnitude:', val: 5.0, color: 'red' }
  }),
}

</script>

<style lang="scss" scoped>
.v-input {
  margin: 2rem 0;
}
.v-input__control .v-messages__wrapper {
  margin-top: -.5rem;
  margin-left: .75rem;
}
</style>
