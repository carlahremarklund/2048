<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  min-width: 24rem;
  width: 36rem;
  padding: 10px;
  margin-top: 5rem;
  /* background-color: #757575; */
}

.col-tile {
  padding: 5px !important;
}

</style>

<template>
<div>
  <v-row no-gutters justify="center">
  <v-col
    :v-if="initialized"
    class="container"
    cols="12"
    sm="12"
    xs="12"
    md="6"
    >
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
    <v-dialog
      v-model="isGameOver"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title style="justify-content: center; background-color: #D32F2F; color: white;">
          <strong>GAME OVER</strong>
        </v-card-title>
        <v-card-text>
          <br>
          <strong> FINAL POINTS: {{ score }}</strong>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="isGameOver = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="init()"
          >
            New Game
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
  <v-col
    :v-if="initialized"
    md="5"
    sm="12"
    xs="12"
  >
    <Scoreboard
      v-on:score="getScore"
      v-on:name="setName"
      :board="allTiles"
      :actions="actions"
      :boardSize="size"
    />
  </v-col>
  </v-row>
  <v-text-field
      label="Orientation"
      hide-details="auto"
      v-model="mobileEvent"
    ></v-text-field>
  </div>
</template>

<script>
import Vue from 'vue';
import Tile from './Tile.vue';
import Scoreboard from './Scoreboard.vue';

export default {
  name: 'Board',
  props: {
    msg: String,
  },

  components: {
    Tile,
    Scoreboard,
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
      lastStep: null,
      isGameOver: false,
      score: 0,
      name: '',
      mobileEvent: null,
    };
  },
  computed: {
    emptyTiles() {
      if (!this.initialized) return null;
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
        Enter: 'enter',
      };
      this.direction(keyCodes[e.code] || undefined);
    },
    mobileHandler(event) {
      this.mobileEvent = event.acceleration.x;
    },
    direction(direction) {
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
        case 'enter':
          this.isGameOver = !this.isGameOver;
          this.setScore();
          break;
        default:
          break;
      }
    },
    up() {
      this.handleMove('up', -1, 0);
    },
    down() {
      this.handleMove('down', 1, 0);
    },
    left() {
      this.handleMove('left', 0, -1);
    },
    right() {
      this.handleMove('right', 0, 1);
    },
    async addRandomTile() {
      if (this.update || this.emptyTiles.length === 0) return;
      this.update = true;
      const randNr = this._.random(0, this.emptyTiles.length - 1);
      Vue.set(this.allTiles, this.emptyTiles[randNr], 2);
      this.actions += 1;
      this.tick += 1;
      this.update = false;
    },
    handleMove(dir, rowDir, colDir, realMove = true) {
      /*
      rowDir +1 >
      rowDir -1 <
      colDir -1 ^
      colDir +1 ˅
      */
      if (this.isGameOver) {
        return;
      }
      this.lastStep = dir;
      const copyTiles = [];
      this._.map(JSON.parse(JSON.stringify(this.allTiles)), (value, key) => {
        if (dir === 'up' || dir === 'left') {
          copyTiles.push({ [key]: value });
        } else {
          copyTiles.unshift({ [key]: value });
        }
      });
      this._.forEach(copyTiles, (element) => {
        this._.forEach(element, (value, key) => {
          const [currentTileRow, currentTileCol] = this._.map(key.split('-'), (elem) => {
            return parseInt(elem, Number);
          });
          this.tileStep(rowDir,
            colDir,
            currentTileRow,
            currentTileCol,
            copyTiles,
            key,
            value,
            realMove);
        });
      });
      if (dir !== this.lastStep) {
        if (realMove) {
          this.addRandomTile();
        }
        return true;
      }
      if (realMove) {
        this.isGameOver = !this.hasMoves();
        if (this.isGameOver) {
          this.setScore();
        }
      }
    },
    tileStep(rowDir, colDir, currentTileRow, currentTileCol, copyTiles, key, value, realMove) {
      const deltaRow = currentTileRow + rowDir;
      const deltaCol = currentTileCol + colDir;
      let isWall = false;
      if (deltaRow < 0 || deltaRow > this.size - 1 || deltaCol < 0 || deltaCol > this.size - 1) {
        isWall = true;
      }
      const next = `${currentTileRow + rowDir}-${currentTileCol + colDir}`;
      const isCollision = this.allTiles[next] !== undefined;
      if (isWall) {
        // Hanlde Wall
      } else if (isCollision) {
        // Handle Collision
        this.handleCollision(key, next, realMove);
      } else {
        this.takeStep(key, next, value, realMove);
        this.tileStep(rowDir, colDir, deltaRow, deltaCol, copyTiles, next, value, realMove);
      }
    },
    takeStep(key, next, value, realMove) {
      if (realMove) {
        Vue.set(this.allTiles, key, undefined);
        Vue.set(this.allTiles, next, value);
      }
      this.lastStep = null;
    },
    handleCollision(key, next, realMove) {
      if (this.allTiles[key] === this.allTiles[next]) {
        if (realMove) {
          this.allTiles[key] = undefined;
          this.allTiles[next] += this.allTiles[next];
        }
        this.lastStep = null;
      }
    },
    hasMoves() {
      let moves = false;
      if (this.handleMove('up', -1, 0, false)) {
        moves = true;
      }
      if (this.handleMove('down', 1, 0, false)) {
        moves = true;
      }
      if (this.handleMove('left', 0, -1, false)) {
        moves = true;
      }
      if (this.handleMove('right', 0, 1, false)) {
        moves = true;
      }
      return moves;
    },
    initializeBoard() {
      for (let i = 0; i < this.size; i += 1) {
        for (let j = 0; j < this.size; j += 1) {
          Vue.set(this.allTiles, `${i}-${j}`, undefined);
        }
      }
      this.isGameOver = false;
    },
    getScore(value) {
      this.score = value;
    },
    setScore() {
      this.$store.commit('addToHighcore', { score: this.score, name: this.name });
    },
    setName(value) {
      this.name = value;
    },
    init() {
      this.initializeBoard();
      this.initialized = true;
      this.actions = -2;
      this.addRandomTile();
      this.addRandomTile();
      this.isGameOver = false;
    },
  },
  created() {
    // document.addEventListener('keyup', this.keyHandler);
    window.addEventListener('devicemotion', this.mobileHandler, true);
  },
  mounted() {
    this.init();
  },
};
</script>
