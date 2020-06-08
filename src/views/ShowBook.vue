<template>
  <v-card v-if="book != null" min-height="660px" class="mx-auto">
    <v-list three-line>
      <v-list-item>
        <v-divider />
        <div style="height:230px;width:160px;">
          <v-img
            :src="book.coverUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            contain
            lazy-src
            width="100%"
            height="100%"
          />
        </div>
        <v-btn @click="openAddBox" absolute dark fab bottom small right color="pink">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-divider />
      </v-list-item>
      <v-subheader>
        <div style="text-align:center;">
          作者:{{book.author}}
          书名: {{book.name}}
        </div>
      </v-subheader>
      <v-divider></v-divider>
    </v-list>
    <v-card>
      <v-list three-line>
        <template v-for="(recommend,index) in book.recommendVoList">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="recommend.title" @click="1">
            <v-list-item-avatar>
              <v-img :src="recommend.avatarUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="recommend.title"></v-list-item-title>
              <v-list-item-subtitle v-html="recommend.content"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-dialog
      @click:outside="showAddBox = !showAddBox"
      persistent
      v-model="showAddBox"
      max-width="820px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">编辑面板</span>
          <v-divider></v-divider>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-text-field v-model="formData.title" counter label="标题" required></v-text-field>
              </v-row>
              <v-row>
                <v-textarea v-model="formData.content" auto-grow filled shaped counter></v-textarea>
                <v-btn @click="submitForm" block color="secondary">提交</v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.status" :timeout="2000" :top="true">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { getBookDetails, uploadRecommendForBook } from "../api/index";
export default {
  data() {
    return {
      snackbar: {
        visible: false,
        status: "",
        text: ""
      },
      formData: {
        bid: "",
        title: "",
        content: ""
      },
      showAddBox: false,
      book: null
    };
  },
  methods: {
    openAddBox() {
      if (this.$store.state.isLogin) {
        this.showAddBox = true;
      } else {
        this.$store.commit("updateShowFormState");
      }
    },
    submitForm() {
      const bid = this.$route.params.id;
      this.formData.bid = bid;
      uploadRecommendForBook(this.formData).then(resp => {
        if (resp.data.success) {
          this.snackbar.visible = true;
          this.snackbar.status = "success";
          this.snackbar.text = "添加成功";
          this.showAddBox = false;
          getBookDetails(bid).then(resp => {
            if (resp.data.success) {
              this.book = resp.data.data;
            }
          });
        } else {
          this.snackbar.visible = true;
          this.snackbar.status = "error";
          this.snackbar.text = "添加推荐失败," + resp.data.errMsg;
        }
      });
    }
  },
  created() {
    const bid = this.$route.params.id;
    getBookDetails(bid).then(resp => {
      if (resp.data.success) {
        this.book = resp.data.data;
      }
    });
  }
};
</script>

<style>
</style>