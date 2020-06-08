<template>
  <v-card>
    <v-list-item @click="1">
      <v-list-item-avatar height="124.8" width="86.4" tile>
        <v-img :src="recommend.coverUrl"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{recommend.title}}</v-list-item-title>
        <v-list-item-subtitle>{{recommend.content}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-badge color="green" :content="recommend.stars+''">
          <v-icon color="red">mdi-heart</v-icon>
        </v-badge>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import littleWomen from "../assets/img/little_women.jpg";

export default {
  props: ["recommend"],
  data() {
    return {
      littleWomen: littleWomen
    };
  }
};
</script>

<style>
</style>