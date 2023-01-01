<template>
  <mapbox-map
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/light-v10"
    :center="[0, 0]"
    :zoom="2"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
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
      localOptions.data = this.dataUrl

      return localOptions
    } 
  }
};
</script>
