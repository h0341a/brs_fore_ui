<template>
  <v-card>
    <v-img
      :src="littleWomen"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      contain
      lazy-src
      height="268px"
    >
      <v-card-title v-text="book.title"></v-card-title>
    </v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import littleWomen from "../assets/img/little_women.jpg";
// import twenty from "../assets/img/twenty-two _rules.jpg";

export default {
  props: ["book"],
  data() {
    return {
      show: true,
      littleWomen: littleWomen
    };
  }
};
</script>

<style>
</style>