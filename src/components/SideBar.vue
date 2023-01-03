<template>
  <v-navigation-drawer app dark permanent width="350">
    <v-app-bar dark>
      <v-toolbar-title>Earthquakes Map</v-toolbar-title>
    </v-app-bar>
    <div class="ma-4 grey--text">
      <v-container>
        <form-earthquake />
        <alert-error />
      </v-container>
    </div>
  </v-navigation-drawer>
</template>

<script>
import FormEarthquake from "./FormEarthquake.vue";
import AlertError from "./AlertError.vue";
export default {
  name: "SideBar",
  components: {
    FormEarthquake,
    AlertError,
  },
};
</script>
