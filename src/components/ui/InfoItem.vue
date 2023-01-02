<template>
  <div>
    <p
      :class="
        this.withMarginBottom
          ? 'text-body-2 with-margin-bottom'
          : ' text-body-2 no-margin'
      "
    >
      <b class="font-weight-bold">{{ this.label }}:</b> {{ this.value || '-' }}
    </p>
  </div>
</template>

<script>
export default {
  name: "InfoItem",

  props: ["label", "value", "withMarginBottom"],
};
</script>

<style lang="scss" scoped>
.with-margin-bottom {
  margin-bottom: 4px;
}

.no-margin {
  margin: 0;
}
</style>
