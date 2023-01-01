<template>
  <mapbox-map
    ref="mapboxMap"
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/light-v10"
    :center="[0, 0]"
    :zoom="2"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <MapboxMarker
      v-for="marker in requestedData"
      :key="marker.id"
      :lng-lat="[
        marker.geometry.coordinates[0],
        marker.geometry.coordinates[1],
      ]"
      popup
    >
      <!-- Custom Marker Circle -->
      <div
        class="red-circle"
        :style="`width: ${marker.properties.mag * 5}px; height: ${
          marker.properties.mag * 5
        }px;`"
      ></div>

      <!-- Popup data -->
      <template v-slot:popup>
        <div style="padding: 8px 10px 2px">
          <info-item
            label="Place"
            :value="marker.properties.place"
            :withMarginBottom="true"
          />
          <info-item
            label="Time"
            :value="marker.properties.time"
            :withMarginBottom="true"
          />
          <info-item label="Min Magnitude" :value="marker.properties.mag" />
        </div>
      </template>
    </MapboxMarker>
  </mapbox-map>
</template>

<script>
// import mapboxgl from "mapbox-gl";

import InfoItem from "./ui/InfoItem.vue";

export default {
  name: "Map",

  props: ["requestedData"],

  components: { InfoItem },

  data() {
    return {
      map: null,
    };
  },

  // methods: {
  //   createMapMarkers(mapData, map) {
  //     mapData.map((m) => {
  //       // Create marker element and add styles styles
  //       const el = document.createElement("div");
  //       el.style.width = `${m.scale}px`;
  //       el.style.height = `${m.scale}px`;
  //       el.style.backgroundColor = "red";
  //       el.style.borderRadius = "50%";

  //       new mapboxgl.Marker(el)
  //         .setLngLat([m.lng, m.lat]) // add coordenates
  //         .setPopup(
  //           new mapboxgl.Popup({ offset: 25 }) // add popup
  //             .setHTML(`<h3>Title</h3><p>Description</p>`)
  //         )
  //         .addTo(map); // add marker to map
  //     });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.red-circle {
  background-color: red;
  border-radius: 50%;
  border: 4px solid #ffdfdf;
  box-sizing: content-box;
}
</style>
