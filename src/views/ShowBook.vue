<template>
  <v-card min-height="660px" class="mx-auto">
    <v-list three-line>
      <v-list-item>
        <v-divider />
        <div style="height:230px;width:160px;">
          <v-img
            :src="littleWomen"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            contain
            lazy-src
            width="100%"
            height="100%"
          />
          <div style="text-align:center;">《小妇人》</div>
        </div>
        <v-divider />
      </v-list-item>
      <v-subheader>关于本书的推荐</v-subheader>
      <v-divider></v-divider>
    </v-list>
    <v-card>
      <v-list three-line>
        <template v-for="(item,index) in items">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="item.title" @click="1">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon @click="consloe.log(s)">mdi-heart</v-icon>
              <v-icon @click="consloe.log(s)">mdi-comment-processing</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <!-- <v-btn block color="secondary" dark>点击加载更多</v-btn> -->
    <!-- <v-btn v-else block disabled>没有更多了</v-btn> -->
  </v-card>
</template>

<script>
import littleWomen from "../assets/img/little_women.jpg";

export default {
  data() {
    return {
      littleWomen: littleWomen,
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhin your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    };
  }
};
</script>

<style>
</style>