<template>
  <div style="padding-top:10px">
    <v-card elevation="12" class="mx-auto" min-height="640px" max-width="98%">
      <v-card-title>我的书架</v-card-title>
      <v-divider></v-divider>
      <div style="padding-left:20px">
        <v-row v-if="currPageData != null && currPageData.list.length != 0">
          <v-col
            v-for="book in currPageData.list"
            :key="book.label"
            cols="auto"
            sm="2"
            @click="$router.push('/book/'+ book.id)"
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
    <v-btn
      v-if="currPageData!=null && currPageData.hasNextPage"
      @click="getNextPageData"
      block
      color="secondary"
      dark
    >点击加载更多</v-btn>
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
      page: 1,
      pageSize: 20,
      currPageData: null
    };
  },
  components: {
    SmallBookCard
  },
  created() {
    getUserCollection({ page: this.page, pageSize: this.pageSize }).then(
      resp => {
        if (resp.data.success) {
          this.page += 1;
          this.currPageData = resp.data.data;
        } else {
          this.snackbar.visible = true;
          this.snackbar.status = "error";
          this.snackbar.text =
            "获取用户收藏书籍失败,原因为:" + resp.data.errMsg;
        }
      }
    );
  },
  methods: {
    getNextPageData() {
      getUserCollection({ page: this.page, pageSize: this.pageSize }).then(
        resp => {
          if (resp.data.success) {
            this.page += 1;
            for (const i in resp.data.data.list) {
              this.currPageData.list.push(resp.data.data.list[i]);
            }
            this.currPageData.hasNextPage = resp.data.data.hasNextPage;
          } else {
            this.snackbar.visible = true;
            this.snackbar.status = "error";
            this.snackbar.text =
              "获取用户收藏书籍失败,原因为:" + resp.data.errMsg;
          }
        }
      );
    }
  }
};
</script>

<style>
</style>