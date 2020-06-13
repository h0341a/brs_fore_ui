<template>
  <v-card min-height="600px" class="mx-auto">
    <v-card-text>
      <v-row>
        <v-spacer />
        <div v-if="!relation" @click="add">
          <v-badge avatar bottom bordered overlap>
            <template v-slot:badge>
              <v-avatar>
                <v-icon>mdi-plus</v-icon>
              </v-avatar>
            </template>
            <v-avatar color="teal" size="72">
              <img :src="recommend.avatarUrl" />
            </v-avatar>
          </v-badge>
        </div>
        <div v-else @click="cancel">
          <v-badge avatar bottom bordered overlap>
            <template v-slot:badge>
              <v-avatar>
                <v-icon>mdi-window-minimize</v-icon>
              </v-avatar>
            </template>
            <v-avatar color="teal" size="72">
              <img :src="recommend.avatarUrl" />
            </v-avatar>
          </v-badge>
        </div>
        <v-spacer />
      </v-row>
      <div style="padding-top:20px;">
        <v-divider />
        <v-card-title>{{recommend.title}}</v-card-title>
        <v-card-text style="font-size:14px;">
          <p>{{recommend.content}}</p>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="addStar" fab>
              <v-icon v-if="star" color="red">mdi-heart</v-icon>
              <v-icon v-else>mdi-heart</v-icon>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card-text>
      </div>
    </v-card-text>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.status" :timeout="2000" :top="true">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import {
  hasRelation,
  followUser,
  cancelFollow,
  addStar,
  cancelStar,
  isStar
} from "@/api/index";
export default {
  props: ["recommend"],
  data() {
    return {
      relation: false,
      star: false,
      snackbar: {
        visible: false,
        status: "",
        text: ""
      }
    };
  },
  created() {
    if (this.$store.state.isLogin) {
      hasRelation({ uid: this.recommend.uid }).then(resp => {
        if (resp.data.success) {
          this.relation = resp.data.data;
        }
      });
      isStar({ rid: this.recommend.rid }).then(resp => {
        if (resp.data.success) {
          this.star = resp.data.data;
        }
      });
    }
  },
  methods: {
    addStar() {
      if (this.$store.state.isLogin) {
        if (this.star) {
          cancelStar({ rid: this.recommend.rid }).then(resp => {
            if (resp.data.success) {
              this.star = false;
              this.snackbar.visible = true;
              this.snackbar.status = "info";
              this.snackbar.text = "取消成功";
            }
          });
        } else {
          addStar({ rid: this.recommend.rid }).then(resp => {
            if (resp.data.success) {
              this.star = true;
              this.snackbar.visible = true;
              this.snackbar.status = "success";
              this.snackbar.text = "对方收到了你的点赞";
            } else {
              this.snackbar.visible = true;
              this.snackbar.status = "error";
              this.snackbar.text = "对方没有成功接受你的点赞";
            }
          });
        }
      } else {
        this.$store.commit("updateShowFormState");
      }
    },
    add() {
      if (!this.$store.state.isLogin) {
        this.$store.commit("updateShowFormState");
      } else {
        followUser({ targetId: this.recommend.uid }).then(resp => {
          if (resp.data.success) {
            this.follow = true;
            this.snackbar.visible = true;
            this.snackbar.status = "success";
            this.snackbar.text = "关注成功";
          } else {
            this.snackbar.visible = true;
            this.snackbar.status = "error";
            this.snackbar.text = "添加关注失败,原因为:" + resp.data.errMsg;
          }
        });
      }
    },
    cancel() {
      if (!this.$store.state.isLogin) {
        this.$store.commit("updateShowFormState");
      } else {
        cancelFollow(this.uid).then(resp => {
          if (resp.data.success) {
            this.follow = false;
            this.snackbar.visible = true;
            this.snackbar.status = "success";
            this.snackbar.text = "取消成功";
          }
        });
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const YY = date.getFullYear() + "-";
      const MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      const mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      const ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    }
  }
};
</script>

<style>
</style>