<template>
  <v-navigation-drawer app dark permanent width="350">
    <v-app-bar dark>
      <v-toolbar-title>Earthquakes Map</v-toolbar-title>
    </v-app-bar>
    <div class="ma-4 grey--text">Filter your results ...
      <sidebar-form />
    </div>
  </v-navigation-drawer>
</template>

<script>
import SidebarForm from './SidebarForm.vue';

export default {
  name: "SideBar",

  components: {
    SidebarForm
  }
};
</script>
