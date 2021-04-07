<style scoped>
.tile {
  position: relative;
  margin:0 auto;
  width: 8rem;
  height: 6rem;
  min-width: 4rem;
  min-height: 5rem;
  display: table;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <v-card
    :class="` tile tile-${row}-${column}`"
    :color="getColor(number)" elevation="6"
    align="center"
    justify="center"
    :ref="'tile'+row+column"
    >
      <v-card-text>
        <strong style="color: white; font-size: large; line-height: 3rem;">{{number}}</strong>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    row: {
      type: Number,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: '#BDBDBD',
    },
  },

  data() {
    return {
      size: 4,
    };
  },
  computed: {},
  methods: {
    getColor(number) {
      const color = {
        2: '#81C784',
        4: '#66BB6A',
        8: '#FDD835',
        16: '#0277BD',
        32: '#5E35B1',
        64: '#C62828',
        128: '#00897B',
        256: '#66BB6A',
        1024: '#2E7D32',
        2048: '#212121',
      };
      return color[number] || '#F5F5F5';
    },
  },
  mounted() {
  },
};
</script>
