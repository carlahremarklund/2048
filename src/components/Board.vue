<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  width: 36rem;
  padding: 10px;
  margin-top: 5rem;
  background-color: #757575;
}

.col-tile {
  padding: 5px !important;
}

</style>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <v-card class="board" v-on:keyup="keyHandler()">
      <v-layout row no-gutters v-for="row in size" :key="'r' + row">
        <v-flex
          v-for="column in size"
          :key="'c'+column"
          cols="12"
          :sm="12/size"
          :xs="12/size"
          class="col-tile"
          :aspect-ratio="1"
          >
          <Tile :row="row" :tile-color="color" :column="column" :key="`${row}${column}`"/>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import Tile from './Tile.vue';

export default {
  name: 'Board',
  props: {
    msg: String,
  },

  components: {
    Tile,
  },

  data() {
    return {
      size: 4,
      color: 'RED',
    };
  },
  computed: {},
  methods: {
    keyHandler(e) {
      const keyCodes = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowRight: 'right',
        ArrowLeft: 'left',
      };
      this.move(keyCodes[e.code] || undefined);
    },
    move(direction) {
      switch (direction) {
        case 'up':
          this.up();
          break;
        case 'down':
          this.down();
          break;
        case 'right':
          this.right();
          break;
        case 'left':
          this.left();
          break;
        default:
          break;
      }
      this.addRandomTile();
    },
    up() {
      console.log('Up');
    },
    down() {
      console.log('Down');
    },
    left() {
      console.log('Left');
    },
    right() {
      console.log('Right');
    },
    addRandomTile() {
      console.log('Adding random tile');
    },
  },
  created() {
    document.addEventListener('keyup', this.keyHandler);
  },
};
</script>
