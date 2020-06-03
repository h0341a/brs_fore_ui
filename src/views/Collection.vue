<template>
  <div style="padding-top:10px">
    <v-card elevation="12" class="mx-auto" max-width="98%" min-height="640px">
      <v-card-title>我的书架</v-card-title>
      <v-divider></v-divider>
      <div style="padding-left:20px">
        <v-row v-if="currPageData != null && currPageData.list.length != 0">
          <v-col
            v-for="book in currPageData.list"
            :key="book.label"
            cols="auto"
            sm="2"
            md="2"
            lg="1"
          >
            <SmallBookCard v-bind:book="book"></SmallBookCard>
          </v-col>
        </v-row>
        <div v-else>
          <v-row>
            <v-divider />
            <v-chip class="ma-2">
              你的书籍空空如也，
              <router-link to="/home">快去首页寻找吧</router-link>
            </v-chip>
            <v-divider />
          </v-row>
        </div>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar.visible" color="snackbar.status" :timeout="4000" :top="true">
      {{snackbar.text}}
      <v-btn dark text @click="snackbar.visible">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import SmallBookCard from "../components/SmallBookCard";
import { getUserCollection } from "../api/index";
export default {
  name: "Collection",
  data() {
    return {
      snackbar: {
        status: "error",
        visible: false,
        text: ""
      },
      currPageNumber: 0,
      pageSize: 8,
      currPageData: null
    };
  },
  components: {
    SmallBookCard
  },
  created() {
    getUserCollection().then(resp => {
      if (resp.data.success) {
        this.currPageData = resp.data.data;
      } else {
        this.snackbar.visible = true;
        this.snackbar.status = "error";
        this.snackbar.text = "获取用户收藏书籍失败,原因为:" + resp.data.errMsg;
      }
    });
  }
};
</script>

<style>
</style>