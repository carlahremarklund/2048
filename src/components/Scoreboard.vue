<style scoped>
</style>

<template>
<div>
  <h1 style="text-align: center; padding-bottom: 4rem;">Scoreboard</h1>
  <v-card class='mx-auto' max-width='400'>
    <v-card-title>
      <v-text-field
      @change="nameChanged"
      ref="nameInput"
      label="NAME"
      :hide-details="!nameError"
      :autofocus="nameError"
      :error="nameError"
      error-messages="NAME is required"
      v-model="name"
    ></v-text-field>
    </v-card-title>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class='headline'> Points </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align='center'>
        <v-col cols='12'>
          <v-chip
          class="ma-2"
          color="#FFD700"
          label
          text-color="white"
          x-large
          style="font-size: 36px;"
        >
          {{ score }}
        </v-chip>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-wrench</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ actions }}</v-list-item-title>
      <v-list-item-subtitle>Actions</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ freeTiles }}</v-list-item-title>
      <v-list-item-subtitle>Available tiles</v-list-item-subtitle>
    </v-list-item>

    <v-slider
      :value="score"
      color="#ef6c00"
      :max="_.get($store.state.highscores, `[0]['score']`, 2048)"
    ></v-slider>
    <v-card-text>
      HIGH SCORES
      </v-card-text>
    <v-list class='transparent'>
      <v-list-item v-for="item in $store.state.highscores"
        :key='item.id'
      >
        <v-list-item-title class="text-start">{{ item.name }}</v-list-item-title>

        <v-list-item-subtitle class='text-center'>
          {{ item.score }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'Scoreboard',
  props: {
    board: {
      type: Object,
      required: true,
    },
    actions: {
      type: Number,
      required: true,
    },
    boardSize: {
      type: Number,
      required: true,
    },
    nameError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      name: null,
    };
  },
  computed: {
    score() {
      let returnScore = 0;
      this._.map(JSON.parse(JSON.stringify(this.board)), (value) => {
        returnScore += parseInt(value, Number);
      });
      this.sendScore(returnScore);
      return returnScore;
    },
    freeTiles() {
      if (this.board === undefined) return 16;
      return this.boardSize ** 2 - this._.size(JSON.parse(JSON.stringify(this.board)));
    },
  },
  methods: {
    sendScore(value) {
      this.$emit('score', value);
    },
    nameChanged() {
      this.$emit('name', this.name);
    },
  },
};
</script>
