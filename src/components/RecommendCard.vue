<template>
  <v-card>
    <v-list-item @click="1">
      <v-list-item-avatar height="124.8" width="86.4" tile>
        <v-img :src="littleWomen"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{recommend.title}}</v-list-item-title>
        <v-list-item-subtitle>{{recommend.content}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text>
          <v-badge color="green" content="9">
            <v-icon>mdi-comment-processing-outline</v-icon>
          </v-badge>
        </v-list-item-action-text>
        <v-divider />
        <v-badge color="green" content="9">
          <v-icon>mdi-star</v-icon>
        </v-badge>
        <v-divider />
        <v-badge color="green" content="9">
          <v-icon>mdi-heart</v-icon>
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