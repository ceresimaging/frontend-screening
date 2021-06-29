<template>
  <v-navigation-drawer app dark permanent width="350">
    <v-app-bar dark>
      <v-toolbar-title>Earthquakes Map</v-toolbar-title>
    </v-app-bar>
    <div class="ma-4 grey--text"><map-form /></div>
  </v-navigation-drawer>
</template>

<script>
import MapForm from "./MapForm.vue";

export default {
  name: "SideBar",
  components: {
    MapForm,
  },
};
</script>
