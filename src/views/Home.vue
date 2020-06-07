<template>
  <div id="home">
    <div style="padding-top:0px;">
      <v-toolbar dense>
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <div>
              <v-carousel height="234" cycle hide-delimiter-background :show-arrows="false">
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="display-3">{{ slide }} Slide</div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
            <div v-if="currPageData != null && currPageData.list.length!=0" id="card-list">
              <v-row>
                <v-col
                  v-for="book in currPageData.list"
                  :key="book.name"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <BookCard v-bind:book="book"></BookCard>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <v-row>
                <v-divider />
                <v-chip class="ma-2">首页空空如也,连我也不知道如何是好</v-chip>
                <v-divider />
              </v-row>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.status" :timeout="4000" :top="true">
      {{snackbar.text}}
      <v-btn dark text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
    <v-btn
      v-if="currPageData!=null && currPageData.hasNextPage"
      @click="getNextPageData"
      block
      color="secondary"
      dark
    >点击加载更多</v-btn>
    <v-btn v-else block disabled>没有更多了</v-btn>
  </div>
</template>

<script>
import BookCard from "../components/BookCard";
import { getHomeRecommends } from "../api/index";
export default {
  name: "Home",
  data() {
    return {
      page: 1,
      pageSize: 8,
      snackbar: {
        visible: false,
        status: "",
        text: ""
      },
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      currPageData: null,
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
      ],
      tab: null,
      items: [
        { tab: "最新推荐", content: "Tab 1 Content" },
        { tab: "新书资讯", content: "Tab 1 Content" }
      ]
    };
  },
  created() {
    getHomeRecommends({ page: this.page }).then(resp => {
      if (resp.data.success) {
        this.currPageData = resp.data.data;
        this.page += 1;
      } else {
        this.snackbar.visible = true;
        this.snackbar.status = "error";
        this.snackbar.text = "获取首页数据失败，原因为:" + resp.data.errMsg;
      }
    });
  },
  methods: {
    getNextPageData() {
      getHomeRecommends({ page: this.page }).then(resp => {
        if (resp.data.success) {
          for (const i in resp.data.data.list) {
            this.currPageData.list.push(resp.data.data.list[i]);
            this.currPageData.hasNextPage = resp.data.data.hasNextPage;
          }
          this.page += 1;
        } else {
          this.snackbar.visible = true;
          this.snackbar.status = "error";
          this.snackbar.text = "获取首页数据失败，原因为:" + resp.data.errMsg;
        }
      });
    }
  },
  components: {
    BookCard
  }
};
</script>
