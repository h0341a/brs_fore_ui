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
            <v-row align="center" align-content="center">
              <v-divider></v-divider>
              <div @click="$refs.file.click()">
                <v-badge avatar bottom bordered overlap>
                  <template v-slot:badge>
                    <v-avatar>
                      <v-icon>mdi-plus</v-icon>
                    </v-avatar>
                  </template>
                  <v-avatar tile color="teal" width="86.4" height="124.8">
                    <v-img
                      v-if="recommendForm.coverUrl !== ''"
                      :src="recommendForm.coverUrl"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      contain
                      lazy-src
                      height="100%"
                      width="100%"
                    ></v-img>
                    <span v-else>书籍封面</span>
                  </v-avatar>
                </v-badge>
              </div>
              <input
                style="display:none"
                type="file"
                id="file"
                ref="file"
                @change="uploadCover"
                accept=".jpg, .jpeg, .png"
              />
              <v-divider></v-divider>
            </v-row>
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

        <v-card-text>你账号的价值可能会因为你此次填写内容增长或降低，确认提交吗？</v-card-text>

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
import { uploadUserRecommend, uploadImg } from "../api/index";
import littleWomen from "../assets/img/little_women.jpg";

export default {
  data() {
    return {
      littleWomen: littleWomen,
      showConfirmDialog: false,
      snackbar: {
        visible: false,
        text: ""
      },
      recommendForm: {
        coverUrl: "",
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
    uploadCover(e) {
      let formData = new FormData();
      const files = e.target.files;
      if (files && files[0]) {
        const img = files[0];
        if (img.size > 1024 * 1024 * 6) {
          return;
        } else {
          formData.append("uploadFile", img);
          console.log(formData.get("uploadFile"));
          uploadImg(formData).then(resp => {
            if (resp.data.success) {
              this.imgName = resp.data.data;
              this.recommendForm.coverUrl =
                "http://207.148.17.53:8090/" + this.imgName;
            } else {
              formData = null;
            }
          });
        }
      }
    },
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