<template>
  <v-row v-if="isError" class="mt-4">
    <v-col cols="12">
      <v-alert color="red" outlined type="error">
        There was an error, please try again with different values
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AlertError",
  computed: {
    ...mapState(["isError"]),
  },
};
</script>

<style>
</style>