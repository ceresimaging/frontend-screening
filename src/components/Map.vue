<template>
  <mapbox-map
    access-token="pk.eyJ1IjoibWF1cmltaXJhbmRhIiwiYSI6ImNqc3FsZ2JpaDE5OWI0NHA2dDI5aG5vdTcifQ.dQsXVmW2MgVsj0FhDrSeQA"
    map-style="mapbox://styles/mapbox/navigation-day-v1"
    :center="[0, 0]"
    :zoom="2"
  >
    <div v-for="earthQuake in getEarthQuakes" v-bind:key="earthQuake.id">
      <mapbox-marker
        :lng-lat="earthQuake.geometry.coordinates"
        popup
        class="marker"
      >
        <template v-slot:popup>
          <ul>
            <li class="list-group-item">
              <span class="label">Place</span>:
              <span>{{
                earthQuake.properties.place || earthQuake.properties.title
              }}</span>
            </li>
            <li class="list-group-item">
              <span class="label">Time</span>:
              <span>{{ new Date(earthQuake.properties.time) }}</span>
            </li>
            <li class="list-group-item">
              <span class="label">Magnitude</span>:
              <span>{{ earthQuake.properties.mag }}</span>
            </li>
          </ul>
        </template>
      </mapbox-marker>
    </div>
    <mapbox-source id="usgs" :options="sourceOptions" />
    <mapbox-layer id="earthquakes" :options="layerOptions" />
  </mapbox-map>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Map",
  computed: { ...mapGetters(["getEarthQuakes"]) },
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
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["interpolate", ["linear"], ["get", "mag"], 1, 8, 10, 12],
            16,
            ["interpolate", ["linear"], ["get", "mag"], 1, 8, 10, 50],
          ],
          "circle-stroke-width": 1,
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            0,
            "green",
            3,
            "yellow",
            4,
            "orange",
            5,
            "violet",
            6,
            "red",
          ],
          "circle-stroke-color": "white",
        },
      },
    };
  },
};
</script>
<style>
.mapboxgl-popup-content {
  padding: 0.5rem 0.25rem;
}
.mapboxgl-popup-content .label {
  padding-right: 0.5rem;
  font-weight: bold;
}
.list-group-item {
  list-style: none;
}
</style>
