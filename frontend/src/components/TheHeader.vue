<script>
export default {
  name: "the-header",
  props: [ "player", "active" ],
  emits: [ "restart", "middle-button" ]
}
</script>

<template>
  <header>
    <h1>МОРСКОЙ БОЙ</h1>
    <div>
      <h3>{{player}}</h3>
      <h2 :class="active ? 'button' : ''" @click.prevent.stop="$emit('middle-button')">Выстрелить</h2>
    </div>
    <div>
      <h2 class="button" @click.prevent.stop="$emit('restart')">Заново</h2>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/colors.scss";

header {
  background: map-get($map: $current_color, $key: "adv-1");
  color: map-get($map: $current_color, $key: "text-1");
  display: flex;
  place-items: center;
  justify-content: space-around;

  h1 {
    font-size: 2.5em;
    margin-right: 20px;
    margin-left: 20px;
  }

  div {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;

    h2, h3 {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
      &.button {
        color: map-get($map: $current_color, $key: "text");
      }
      &.button:hover {
        color: map-get($map: $current_color, $key: "text-1");
      }
    }
  }
}
</style>
