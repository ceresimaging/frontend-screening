<template>
  <v-app>
    <side-bar
      @send-form-data="
        (starttime, endtime, minmagnitude) =>
          fetchData(starttime, endtime, minmagnitude)
      "
    />
    <v-main>
      <v-container fluid fill-height d-flex pa-0>
        <main-map
          class="flex-grow-1 fill-height"
          :requestedData="this.requestedData"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainMap from "./components/Map";
import SideBar from "./components/SideBar";

export default {
  name: "App",

  components: {
    SideBar,
    MainMap,
  },

  data() {
    return {
      requestedData: null,
      dataUrl: "",
      cosa: 0,
    };
  },

  methods: {
    async fetchData(starttime, endtime, minmagnitude) {
      fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}`
      )
        .then((response) => {
          response.json().then((res) => (this.requestedData = res.features));
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
