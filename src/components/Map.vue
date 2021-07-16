<template>
  <mapbox-map
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/light-v10"
    :center="[0, 0]"
    :zoom="2"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <mapbox-source id="usgs" :options="sourceOptions" />
    <mapbox-layer id="earthquakes" :options="layerOptions" />
    <!-- <mapbox-popup 
      :lng-lat="[10, 10]"
    >
      <p>Place</p>
      <p>Magnitude</p>
      <p>Time</p>
    </mapbox-popup> -->
  </mapbox-map>
</template>

<script>
// let starttime = startdate;
// console.log(starttime);
// const magnitude = feature.getProperty("mag");

export default {
  name: "Map",

  data() {
    return {
      map: null,
      sourceOptions: {
        type: "geojson",
        data: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson",
/** from the Mapbox docs it looks like I should be able to magnitude and date range filters as a filter object of the source layer ... https://docs.mapbox.com/help/glossary/filter/  **/
        // filter: {
          // "starttime": this.startdate,
          // "endtime": this.enddate,
          // "minmagnitude": ['literal', {5}],
        // }
      },
      layerOptions: {
        type: "circle",
        source: "usgs",
        paint: {
/** this seemed like a way to set the earthquake circle to be relative to its magnitude - doesn't work **/
          // "circle-radius": Math.pow(2, this.data.mag) / 2,
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      },
    };
  },
};
</script>
