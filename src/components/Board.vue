<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="board">
      <v-row v-for="row in size" v-key="'r' + row">
        <v-col v-for="column in size" v-key="'c'+column">
          <Tile :row="row" :column="column" :key="`${row}${column}`"/>
        </v-col>
      </v-row>
    </div>
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
    };
  },
  computed: {},
  methods: {},
};
</script>
