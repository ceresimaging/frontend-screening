<template>
  <v-app>
    <side-bar
      @fetch-data="(value) => doSomething(value)"
      @send-form-data="
        (starttime, endtime, minmagnitude) =>
          fetchData(starttime, endtime, minmagnitude)
      "
    />
    <v-main>
      <v-container fluid fill-height d-flex pa-0>
        <main-map class="flex-grow-1 fill-height" :dataUrl="this.dataUrl" />
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
      dataUrl: ''
    };
  },

  methods: {
    doSomething(value) {
      console.log("hola", value);
    },
    increaseCount(n) {
      console.log("App", n);
    },
    formatData(rawData) {
      return rawData.map((item) => {
        const id = item.id;
        const { mag, place, time } = item.properties;

        return {
          id,
          properties: {
            mag,
            place,
            time,
          }
        };
      });
    },
    fetchData(starttime, endtime, minmagnitude) {
      console.log(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}`)
      return this.dataUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}`
      // fetch(
      //   `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}`
      // )
      //   .then((response) => {
      //     response
      //       .json()
      //       .then((res) => console.log("App", res))
      //       // TODO: formatData & then pass it to map component
      //       .then((res) => (this.requestedData = res.features));
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
  },
};
</script>
