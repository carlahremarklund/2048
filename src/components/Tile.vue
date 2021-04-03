<style scoped>
</style>

<template>
  <v-card
    :class="`tile-${row}-${column}`"
    :color="color" elevation="6"
    align="center"
    justify="center"
    :ref="'tile'+row+column"
    @click="getHeight()">
      <span>
        {{row }}, {{column}}
      </span>
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
    getHeight(ref) {
      console.log(ref);
      // console.log(_.get(this.$refs, `${ref}.$el.offsetWidth`, 'auto'));
    },
  },
  mounted() {
  },
};
</script>
