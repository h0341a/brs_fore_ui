<template>
  <v-card min-height="660px" class="mx-auto">
    <v-list three-line>
      <v-list-item>
        <v-divider />
        <v-btn @click="showEditPannel=!showEditPannel">
          <v-icon>mdi-plus</v-icon>添加新推荐
        </v-btn>
        <v-divider />
      </v-list-item>
      <v-subheader>我的推荐</v-subheader>
      <v-divider></v-divider>
      <div v-if="currPageData != null && currPageData.list.length != 0">
        <template v-for="recommend in currPageData.list">
          <div :key="recommend.label">
            <RecommendCard v-bind:recommend="recommend"></RecommendCard>
            <v-divider />
          </div>
        </template>
      </div>
      <div v-else>
        <v-row>
          <v-divider />
          <v-chip class="ma-2">没有发现你的推荐，尝试用上方的按钮新建一个吧</v-chip>
          <v-divider />
        </v-row>
      </div>
    </v-list>

    <v-dialog
      @click:outside="showEditPannel = false"
      persistent
      v-model="showEditPannel"
      max-width="400px"
    >
      <EditPannel @uploadRecommendSuccess="uploadSuccess"></EditPannel>
    </v-dialog>
    <v-btn
      v-if="currPageData!=null && currPageData.hasNextPage"
      @click="getNextPageData"
      block
      color="secondary"
      dark
    >点击加载更多</v-btn>
    <v-btn v-else block disabled>没有更多了</v-btn>
  </v-card>
</template>

<script>
import RecommendCard from "../components/RecommendCard";
import EditPannel from "../components/EditPannel";
import { getUserRecommends } from "../api/index";
export default {
  name: "Recommend",
  data() {
    return {
      showEditPannel: false,
      currPageData: null,
      page: 1,
      pageSize: 8
    };
  },
  created() {
    getUserRecommends().then(resp => {
      if (resp.data.success) {
        this.page += 1;
        this.currPageData = resp.data.data;
      }
    });
  },
  methods: {
    getNextPageData() {
      getUserRecommends({ page: this.page, pageSize: this.pageSize }).then(
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
    },
    uploadSuccess() {
      this.showEditPannel = false;
      getUserRecommends().then(resp => {
        if (resp.data.success) {
          this.currPageData = resp.data.data;
        }
      });
    }
  },
  components: {
    RecommendCard,
    EditPannel
  }
};
</script>

<style>
</style>