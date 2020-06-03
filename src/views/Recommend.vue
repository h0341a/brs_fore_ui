<template>
  <v-card class="mx-auto">
    <v-list three-line>
      <v-list-item>
        <v-divider />
        <v-btn>
          <v-icon>mdi-plus</v-icon>添加新推荐
        </v-btn>
        <v-divider />
      </v-list-item>
      <v-subheader>我的推荐</v-subheader>
      <v-divider></v-divider>
      <template v-for="item in items">
        <div :key="item.label">
          <RecommendCard v-bind:recommend="item"></RecommendCard>
          <v-divider />
        </div>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import RecommendCard from "../components/RecommendCard";
export default {
  name: "Recommend",
  data() {
    return {
      items: [
        {
          bookName: "《little women》",
          bookCover: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          content:
            "这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内容"
        },
        {
          bookName: "《little women》",
          bookCover: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Brunch this weekend?",
          content:
            "这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一荐内这是一个推荐内这是一个推荐内这是一个推荐内这荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内这是一个推荐内容"
        }
      ]
    };
  },
  components: {
    RecommendCard
  }
};
</script>

<style>
</style>