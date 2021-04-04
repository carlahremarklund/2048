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
  <div :v-if="initialized" class="container">
    <h1>{{ msg }}</h1>
    <v-card class="board" v-on:keyup="keyHandler()" :key="actions">
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
          <Tile
            :row="row"
            :number="_.get(allTiles, `${row - 1}-${column - 1}`)"
            :column="column"
            :key="`${row}${column}`"
          />
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue';
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
      allTiles: {},
      initialized: false,
      actions: 0,
      tick: 0,
      update: false,
    };
  },
  computed: {
    emptyTiles() {
      if (!this.initialized) return null;
      console.log('Updating emptyTiles');
      // Vue likes cashing too much
      this.tick -= 1;
      const emptyArray = [];
      this._.forEach(this.allTiles, (value, key) => {
        if (value === undefined) {
          emptyArray.push(key);
        }
      });
      return emptyArray;
    },
  },
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
          this.addRandomTile();
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
      // this.addRandomTile();
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
    async addRandomTile() {
      if (this.update || this.emptyTiles.length === 0) return;
      console.log('Adding random tile');
      this.update = true;
      const randNr = this._.random(0, this.emptyTiles.length - 1);
      // const randomElement = this.emptyTiles[randNr];
      // console.log(randomElement);
      Vue.set(this.allTiles, this.emptyTiles[randNr], 2);
      this.actions += 1;
      this.tick += 1;
      this.update = false;
    },
    initializeMatrix() {
      for (let i = 0; i < this.size; i += 1) {
        for (let j = 0; j < this.size; j += 1) {
          Vue.set(this.allTiles, `${i}-${j}`, undefined);
        }
      }
    },
  },
  created() {
    document.addEventListener('keyup', this.keyHandler);
    this.initializeMatrix();

    this.initialized = true;
  },
  mounted() {
    if (!this.initialized) return;
    this.addRandomTile();
    this.addRandomTile();
  },
};
</script>
