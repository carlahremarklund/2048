<style scoped>
</style>

<template>
  <div class="container">
    <span>
      {{row }}, {{column}}
    </span>
  </div>
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
