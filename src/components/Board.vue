<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  width: 100%;
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
    <v-card class="board">
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
  methods: {},
};
</script>
