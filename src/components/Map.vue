<template>
  <mapbox-map
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/light-v10"
    :center="[0, 0]"
    :zoom="2"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <MapboxMarker :lng-lat="[0, 0]" popup>
      <template v-slot:popup>
        <p>Hello world!</p>
      </template>
    </MapboxMarker>

    <MapboxMarker
      v-for="marker in this.dummyData.markers"
      :key="marker.text"
      :lng-lat="[marker.lng, marker.lat]"
      popup
      color="red"
      :scale="marker.scale"
      
    >
      <v-icon slot="marker">mdi-calendar</v-icon>
      
      <template v-slot:popup>
        <p>{{ marker.text }}</p>
      </template>
    </MapboxMarker>

    <mapbox-source id="usgs" :options="dynamicSourceOptions" />
    <mapbox-layer id="earthquakes" :options="layerOptions" />
  </mapbox-map>
</template>

<script>
export default {
  name: "Map",

  props: ["dataUrl"],

  data() {
    return {
      dummyData: {
        markers: [
          { lng: 1, lat: 1, text: "a", scale: 1 },
          { lng: 20, lat: 20, text: "b", scale: 2 },
          { lng: 30, lat: 30, text: "c", scale: 4 },
          { lng: 60, lat: 60, text: "ddd", scale: 2 },
        ],
      },

      map: null,
      sourceOptions: {
        type: "geojson",
        data: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson",
      },
      layerOptions: {
        type: "circle",
        source: "usgs",
        paint: {
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      },
    };
  },
  computed: {
    dynamicSourceOptions() {
      let localOptions = Object.assign({}, this.sourceOptions); // Updating data.sourceOptions.data with the url received as prop
      localOptions.data = this.dataUrl;

      return localOptions;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-icon {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: white;
}
</style>
