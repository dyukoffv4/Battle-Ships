<script>
export default {
  name: "the-middle",
  props: [ "p1", "p2", "active" ],
  data() {
    return {
      cid: undefined,
      x: undefined,
      y: undefined
    }
  },
  mounted() {
    window.addEventListener("resize", this.glassResize)
    this.glassResize()
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.glassResize)
  },
  computed: {
    p1Prepare() {
      let data = []
      for (let i = 0; i < 100; i++) data.push({id: "p1-" + i, class: "square"})
      for (let i of this.p1) data[i.x + i.y * 10].class = i.status < 1 ? "solid" : i.status > 1 ? "clear" : "broke"
      return data
    },
    p2Prepare() {
      let data = []
      for (let i = 0; i < 100; i++) data.push({id: "p2-" + i, class: "square"})
      for (let i of this.p2) data[i.x + i.y * 10].class = i.status < 1 ? "solid" : i.status > 1 ? "clear" : "broke"
      return data
    }
  },
  methods: {
    glassResize() {
      let W = this.$refs.main.clientWidth
      let H = this.$refs.main.clientHeight
      let K = W / H
      if (K > 2) {
        this.$refs.p1.style.height = "90%"
        this.$refs.p1.style.width = (90 / K) + "%"
        this.$refs.p2.style.height = "90%"
        this.$refs.p2.style.width = (90 / K) + "%"
      } else {
        this.$refs.p1.style.width = "45%"
        this.$refs.p1.style.height = (45 * K) + "%"
        this.$refs.p2.style.width = "45%"
        this.$refs.p2.style.height = (45 * K) + "%"
      }
    },
    cellClick(event) {
      if (event.target.className.split(' ')[0] !== "solid") return
      if (this.cid !== undefined) {
        document.getElementById(this.cid).className = document.getElementById(this.cid).className.split(' ')[0]
      }
      this.cid = event.target.id
      this.x = (+this.cid.split('-')[1]) % 10
      this.y = Math.floor((+this.cid.split('-')[1]) / 10)
      document.getElementById(this.cid).className += " clicked"
      console.log(document.getElementById(this.cid))
    }
  }
}
</script>

<template>
  <div id="main" ref="main">
    <div ref="p1" class="field">
      <div v-for="i of p1Prepare" :key="i" :class="i.class" :id="i.id"/>
    </div>
    <div ref="p2" class="field">
      <div v-for="i of p2Prepare" :key="i" :class="i.class" :id="i.id" @click.prevent.stop="cellClick"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/colors.scss";

#main {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .field {
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
    grid-gap: 1px;
    position: relative;

    .square {
      border: solid 1px map-get($map: $current_color, $key: "text");
      place-self: stretch stretch;
      background: none;

      &:hover {
        border: solid 3px map-get($map: $current_color, $key: "warn-2");
      }
    }

    .solid {
      @extend .square;
      background: map-get($map: $current_color, $key: "warn-1");
    }

    .broke {
      @extend .square;
      background: map-get($map: $current_color, $key: "warn-2");
    }

    .clear {
      @extend .square;
      background: map-get($map: $current_color, $key: "alfa");
    }

    .clicked {
      border: solid 3px map-get($map: $current_color, $key: "warn-3");
    }
  }
}
</style>
