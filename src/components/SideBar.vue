<template>
  <v-navigation-drawer app dark permanent width="350">
    <v-app-bar dark>
      <v-toolbar-title>Earthquakes Map</v-toolbar-title>
    </v-app-bar>
    <Form></Form>
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
