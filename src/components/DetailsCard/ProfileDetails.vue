<template>
  <v-card v-if="userInfo!=null" min-height="600px" class="mx-auto">
    <v-card-title>
      <span>用户{{userInfo.nickname}}的动态</span>
      <v-divider />
      <!-- <v-btn small> -->
      <v-avatar @click="$emit('closeUserHome')">
        <v-icon>mdi-close</v-icon>
      </v-avatar>
      <!-- </v-btn> -->
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-spacer />
          <div v-if="!follow" @click="add">
            <v-badge avatar bottom bordered overlap>
              <template v-slot:badge>
                <v-avatar>
                  <v-icon>mdi-plus</v-icon>
                </v-avatar>
              </template>
              <v-avatar color="teal" size="72">
                <img :src="userInfo.avatarUrl" />
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
                <img :src="userInfo.avatarUrl" />
              </v-avatar>
            </v-badge>
          </div>
          <v-spacer />
        </v-row>
        <v-row style="padding-top:20px">
          <v-spacer />
          <span>个性签名:{{userInfo.bio}}</span>
          <v-spacer />
        </v-row>
        <v-card width="100%">
          <v-switch v-model="reverse" label="倒序"></v-switch>
          <v-timeline :reverse="reverse" :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item color="white" v-for="item in timeLineData" :key="item.label">
              <template v-slot:icon>
                <v-avatar>
                  <v-icon v-if="item.type==='recommend'" color="red">mdi-heart</v-icon>
                  <v-icon v-else-if="item.type==='star'" color="green">mdi-star</v-icon>
                  <v-icon v-else color="blue">mdi-message-text</v-icon>
                </v-avatar>
              </template>
              <span class="font-weight-bold" slot="opposite">{{formatDate(item.showDate)}}</span>
              <v-card class="elevation-2">
                <v-card-text>{{item.describe}}</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-container>
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
  getUserDynamic,
  getUserDynamicInfo
} from "@/api/index";
export default {
  props: ["uid"],
  data() {
    return {
      snackbar: {
        visible: false,
        status: "",
        text: ""
      },
      reverse: false,
      userInfo: null,
      timeLineData: null,
      follow: false
    };
  },
  created() {
    hasRelation({ uid: this.uid }).then(resp => {
      if (resp.data.success) {
        this.follow = resp.data.data;
      }
    });
    getUserDynamicInfo(this.uid).then(resp => {
      if (resp.data.success) {
        this.userInfo = resp.data.data;
      }
    });
    getUserDynamic(this.uid).then(resp => {
      if (resp.data.success) {
        this.timeLineData = resp.data.data;
      }
    });
  },
  methods: {
    add() {
      if (!this.$store.state.isLogin) {
        this.$store.commit("updateShowFormState");
      } else {
        followUser({ targetId: this.uid }).then(resp => {
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
