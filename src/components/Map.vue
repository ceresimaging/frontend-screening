<style scoped>
.popup h1 {
  font-size: 15px;
  text-align: center;
}

.popup p {
  padding: 15px;
  text-align: center;
}
</style>

<template>
  <mapbox-map
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/dark-v10"
    :center="mapCenter"
    :zoom="2"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <mapbox-source id="usgs" :options="sourceOptions" />
    <mapbox-cluster
      v-bind:data="sourceOptions.data"
      @mb-feature-click="openPopup($event)"
      :unclusteredPointPaint="clusterOptions.unclusteredPointPaint"
      :clustersPaint="clusterOptions.clustersPaint"
      :clusterRadius="clusterOptions.clusterRadius"
      :clusterMaxZoom="2"
    />
    <mapbox-popup
      v-if="popup.isOpen"
      :key="popup.position.join('-')"
      :lng-lat="popup.position"
      @mb-close="() => (popup.isOpen = false)"
      className="popup"
    >
      <h1>{{ popup.data.title }}</h1>
      <p>{{ popup.data.time }}</p>
    </mapbox-popup>
  </mapbox-map>
</template>

<script>
export default {
  name: "Map",

  data() {
    return {
      map: null,
      mapCenter: [0, 0],
      minMag: null,
      maxMag: null,
      popup: {
        isOpen: false,
        position: [0, 0],
        data: null,
      },
      sourceOptions: {
        type: "geojson",
        data: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson",
      },
      clusterOptions: {
        unclusteredPointPaint: {
          "circle-color": [
            "step",
            ["get", "mag"],
            "#FFBB33",
            2,
            "#FF8800",
            4,
            "#ff4444",
            6,
            "#CC0000",
            8,
            "#C00000",
          ],
          "circle-radius": [
            "step",
            ["get", "mag"],
            5,
            2,
            10,
            4,
            20,
            6,
            30,
            8,
            40,
          ],
        },
        clustersPaint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#FFBB33",
            50,
            "#FF8800",
            100,
            "#ff4444",
            750,
            "#CC0000",
            1000,
            "#C00000",
          ],
          "circle-radius": 35,
        },
      },
    };
  },
  methods: {
    async openPopup({ geometry, properties }) {
      await this.$nextTick();

      this.popup.position = [...geometry.coordinates];
      this.popup.isOpen = true;

      this.popup.data = Object.entries(properties).reduce(
        (data, [key, value]) => {
          try {
            data[key] = value;

            if (key === "time") {
              // format time into readable date
              data[key] = new Date(properties.time).toDateString();
            }

            return data;
          } catch (err) {
            console.log(err);
          }
          return data;
        },
        {}
      );
    },
  },
  computed: {
    newMinMag() {
      return this.$store.getters.newMinMag;
    },
    newMaxMag() {
      return this.$store.getters.newMaxMag;
    },
    newStartTime() {
      return this.$store.getters.newStartTime;
    },
    newEndTime() {
      return this.$store.getters.newEndTime;
    },
  },
  watch: {
    newMinMag(value) {
      this.minMag = value;

      this.sourceOptions.data = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=${value}&maxmagnitude=${
        this.maxMag ? `&minmagnitude=${this.maxMag}` : ""
      }`;
    },
    newMaxMag(value) {
      this.maxMag = value;

      this.sourceOptions.data = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson${
        this.minMag ? `&minmagnitude=${this.minMag}` : ""
      }&maxmagnitude=${value}`;
    },
    newStartTime(value) {
      this.startTime = value;

      this.sourceOptions.data = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${value}${
        this.endTime ? `&endtime=${this.endTime}` : ""
      }${this.minMag ? `&minmagnitude=${this.minMag}` : ""}&maxmagnitude=${
        this.maxMag ? `&minmagnitude=${this.maxMag}` : ""
      }`;
    },
    newEndTime(value) {
      this.endTime = value;

      this.sourceOptions.data = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson${
        this.startTime ? `&starttime=${this.startTime}` : ""
      }&endtime=${value}${
        this.minMag ? `&minmagnitude=${this.minMag}` : ""
      }&maxmagnitude=${this.maxMag ? `&minmagnitude=${this.maxMag}` : ""}`;
    },
  },
};
</script>
