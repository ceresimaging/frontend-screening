<template>
  <div class="container">
    <ul>
      <li class="list-item">
        <div class="color-info1"></div>
        <p>Magnitude from 0 to 3</p>
      </li>
      <li class="list-item">
        <div class="color-info2"></div>
        <p>Magnitude from 3 to 4</p>
      </li>
      <li class="list-item">
        <div class="color-info3"></div>
        <p>Magnitude from 4 to 5</p>
      </li>
      <li class="list-item">
        <div class="color-info4"></div>
        <p>Magnitude from 5 to 6</p>
      </li>
      <li class="list-item">
        <div class="color-info5"></div>
        <p>Magnitude 6+</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ColorInfo",
};
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: antiquewhite;
  z-index: 999;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  width: 20%;
}

.list-item {
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 10px;
  line-height: 1rem;
}
.color-info1,
.color-info2,
.color-info3,
.color-info4,
.color-info5 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.color-info1 {
  background-color: green;
}
.color-info2 {
  background-color: yellow;
}

.color-info3 {
  background-color: orange;
}
.color-info4 {
  background-color: violet;
}
.color-info5 {
  background-color: red;
}
</style>
