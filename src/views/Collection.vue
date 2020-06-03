<template>
  <div style="padding-top:10px">
    <v-card elevation="12" class="mx-auto" max-width="98%" min-height="640px">
      <v-card-title>我的书架</v-card-title>
      <v-divider></v-divider>
      <div style="padding-left:20px">
        <v-row>
          <v-col v-for="card in cards" :key="card.name" cols="auto" sm="2" md="2" lg="1">
            <SmallBookCard v-bind:book="card"></SmallBookCard>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import SmallBookCard from "../components/SmallBookCard";
export default {
  name: "Collection",
  components: {
    SmallBookCard
  },
  data() {
    return {
      cards: [
        {
          title: "第二十二条军规",
          src: "twenty",
          user: "推荐用户",
          appreciation: "推荐理由"
        },
        {
          title: "第二十二条军规",
          src: "twenty",
          user: "推荐用户",
          appreciation: "推荐理由推荐理由推荐理由推荐理由推荐理由"
        },
        {
          title: "第二十二条军规",
          src: "twenty",
          user: "推荐用户",
          appreciation: "推荐理由推荐理由"
        },
        {
          title: "第二十二条军规",
          src: "twenty",
          user: "推荐用户",
          appreciation:
            "推荐理由推荐理由推荐理由推荐理由推荐理由推荐理由推荐理由推荐理由"
        },
        {
          title: "小妇人",
          src: "",
          user: "推荐用户",
          appreciation: "推荐理由推荐理由推荐理由推荐理由"
        }
      ]
    };
  }
};
</script>

<style>
</style>