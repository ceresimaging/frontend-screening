<template>
  <mapbox-map
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/light-v10"
    :center="[0, 0]"
    :zoom="2"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <mapbox-source
      v-if="sourceOptions.data !== ''"
      id="usgs"
      :options="sourceOptions"
    />
    <mapbox-layer
      v-if="sourceOptions.data !== ''"
      @click="(e) => geoJsonClick(e)"
      id="earthquakes"
      :options="layerOptions"
    />
  </mapbox-map>
</template>

<script>
import { mapState } from "vuex";
import Mapbox from "mapbox-gl";
export default {
  name: "Map",
  data() {
    return {
      map: null,
      sourceOptions: {
        type: "geojson",
        data: "",
      },
      layerOptions: {
        type: "circle",
        source: "usgs",
        paint: {
          "circle-radius": ["get", "mag"],
          "circle-stroke-width": 1,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      },
    };
  },
  computed: {
    ...mapState(["data"]),
  },
  watch: {
    data(next) {
      this.sourceOptions.data = next;
    },
  },
  methods: {
    geoJsonClick(e) {
      const features = this.map.queryRenderedFeatures(e.point);
      const place = features[0].properties.title;
      const magnitude = features[0].properties.mag;
      const time = new Date(features[0].properties.time)
        .toISOString()
        .slice(0, 10);
      const popup = new Mapbox.Popup({ offset: [0, -15] })
        .setLngLat(e.lngLat)
        .setHTML(
          `<div>
              <p>Place: ${place}<p>
              <p>Magnitude: ${magnitude}</p>
              <p>Date: ${time}</p>
          </div>`
        );

      popup.addTo(this.map);
    },
  },
};
</script>
