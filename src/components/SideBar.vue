<template>
  <v-navigation-drawer app dark permanent width="350">
    <v-app-bar dark>
      <v-toolbar-title>Earthquakes Map</v-toolbar-title>
    </v-app-bar>
    <div class="ma-4 grey--text">The form goes here...</div>

    <Form
      @fetch-data="(value) => doSomethind(value)"
      @increase-by="increaseCount"
      @send-form-data="
        (starttime, endtime, minmagnitude) =>
          $emit('send-form-data', starttime, endtime, minmagnitude)
      "
    ></Form>
  </v-navigation-drawer>
</template>

<script>
import Form from "./Form.vue";

export default {
  name: "SideBar",

  props: [""],

  data() {
    return {
      aver: 0,
    };
  },

  components: {
    Form,
  },

  methods: {
    doSomething(value) {
      console.log(value);
      this.$emit("fetchData", value);
    },
    increaseCount(n) {
      console.log("hola", n);
      this.$emit("increase-by", n);
    },
  },
};
</script>
