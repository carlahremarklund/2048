<template>
  <div  data-app class="home">
    <Board msg="2048"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue';

export default {
  name: 'Home',
  components: {
    Board,
  },
};
</script>
