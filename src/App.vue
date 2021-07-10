<template>
  <v-app>
    <side-bar />
    <v-main>
      <v-container fluid fill-height d-flex pa-0>
        <main-map class="flex-grow-1 fill-height" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainMap from "./components/Map";
import SideBar from "./components/SideBar";
import axios from "axios";

export default {
  name: "App",

  components: {
    SideBar,
    MainMap,
  },
  created() {
    axios
      .get('https://earthquake.usgs.gov/fdsnws/event/1/#parameters')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
};
</script>
