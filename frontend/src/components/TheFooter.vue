<script>
export default {
  name: "the-footer"
}
</script>

<template>
  <footer>
    <h2>Zyablik Corp.</h2>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/colors.scss";

footer {
  background: map-get($map: $current_color, $key: "adv-1");
  color: map-get($map: $current_color, $key: "text-1");
  padding: 10px;
  display: grid;
  justify-content: center;
  z-index: 1;

  * {
    margin: 5px;
  }
}
</style>
