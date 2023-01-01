<template>
  <v-navigation-drawer app dark permanent width="350">
    <v-app-bar dark>
      <v-toolbar-title>Earthquakes Map</v-toolbar-title>
    </v-app-bar>
    <div class="ma-4 grey--text">What data would you like to check?</div>

    <Form
      @send-form-data="
        (starttime, endtime, minmagnitude) =>
          $emit('send-form-data', starttime, endtime, minmagnitude)
      "
    ></Form>
  </v-navigation-drawer>
</template>

<script>
import Form from "./Form.vue";

export default {
  name: "SideBar",

  components: {
    Form,
  },
};
</script>
