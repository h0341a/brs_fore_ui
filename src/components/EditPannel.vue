<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">编辑面板</span>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-text-field
                v-model="recommendForm.bookName"
                :rules="recommendFormRules.bookNameRules"
                counter
                label="书名"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="recommendForm.bookAuthor"
                :rules="recommendFormRules.authorRules"
                counter
                label="作者"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="recommendForm.title"
                :rules="recommendFormRules.titleRules"
                counter
                label="标题"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                v-model="recommendForm.content"
                :rules="recommendFormRules.contentRules"
                auto-grow
                filled
                shaped
                counter
              ></v-textarea>
              <v-btn @click="submitRecommendForm" block color="secondary">提交</v-btn>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.visible" color="error" :timeout="4000" :top="true">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="showConfirmDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">最后一次确认</v-card-title>

        <v-card-text>推荐被提交后将会交由管理员用户审核，请耐心等待审核结果。审核通过的概率取决于你现在填写内容的价值，确认提交吗？</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="showConfirmDialog = false">返回修改</v-btn>

          <v-btn color="green darken-1" text @click="commit">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { uploadUserRecommend } from "../api/index";

export default {
  data() {
    return {
      showConfirmDialog: false,
      snackbar: {
        visible: false,
        text: ""
      },
      recommendForm: {
        bookName: "",
        bookAuthor: "",
        title: "",
        content: ""
      },
      recommendFormRules: {
        bookNameRules: [v => !!v || "书名不能为空"],
        authorRules: [v => !!v || "作者不能为空"],
        titleRules: [v => !!v || "标题不能为空"],
        contentRules: [v => !!v || "内容不能为空"]
      }
    };
  },
  methods: {
    submitRecommendForm() {
      if (this.$refs.form.validate()) {
        this.showConfirmDialog = true;
      }
    },
    commit() {
      uploadUserRecommend(this.recommendForm).then(resp => {
        this.showConfirmDialog = false;
        if (resp.data.success) {
          this.recommendForm.bookName = "";
          this.recommendForm.bookAuthor = "";
          this.recommendForm.title = "";
          this.recommendForm.content = "";
          this.$emit("uploadRecommendSuccess");
        } else {
          this.snackbar.visible = true;
          this.snackbar.text = "添加推荐失败:" + resp.data.errMsg;
        }
      });
    }
  }
};
</script>

<style>
</style>