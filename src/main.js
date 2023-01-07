import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueMapbox from "@studiometa/vue-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import store from "@/store/store";

Vue.use(VueMapbox);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
