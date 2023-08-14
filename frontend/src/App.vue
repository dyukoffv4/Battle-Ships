<script>
import TheHeader from "@/components/TheHeader.vue";
import TheMiddle from "@/components/TheMiddle.vue";
import TheFooter from "@/components/TheFooter.vue";
import {socket} from "@/socket";

export default {
  name: "SetupView",
  components: {
    TheHeader,
    TheMiddle,
    TheFooter
  },
  mounted() {
    socket.connect()
  },
  beforeUnmount() {
    socket.disconnect()
  },
  data() {
    return {
      active: true,
      finish: false,
      winner: false,
      players: {
        0: { name: "", score: 0, data: [] },
        1: { name: "", score: 0, data: [] }
      }
    }
  },
  methods: {
    async fire() {
      // Todo: change request
      let x = this.$refs.middle.$data.x
      let y = this.$refs.middle.$data.y
      if (x === undefined && y === undefined) return

      socket.emit("fire",{x: x, y: y})
    }
  }
}
</script>

<template>
  <the-header :player="players[active ? 0 : 1].name" :active=active @middle-button="fire"/>
  <div id="main" ref="main">
    <the-middle ref="p1"/>
    <the-middle ref="p2"/>
  </div>
  <the-footer/>
</template>

<style lang="scss">
@import "assets/colors";

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: map-get($map: $current_color, $key: "text");
  background: map-get($map: $current_color, $key: "main");
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#main {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
