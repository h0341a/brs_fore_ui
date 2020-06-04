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
      currPageData: null
    };
  },
  created() {
    getUserRecommends().then(resp => {
      if (resp.data.success) {
        this.currPageData = resp.data.data;
      }
    });
  },
  methods: {
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