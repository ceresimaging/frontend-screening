<template>
  <v-app>
    <side-bar />
    <v-main>
      <v-container fluid fill-height d-flex pa-0>
        <main-map class="flex-grow-1 fill-height" />
        <ColorInfo />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainMap from "./components/Map";
import SideBar from "./components/SideBar";
import ColorInfo from "./components/ColorInfo.vue";

export default {
  name: "App",

  components: {
    SideBar,
    MainMap,
    ColorInfo,
  },
};
</script>
