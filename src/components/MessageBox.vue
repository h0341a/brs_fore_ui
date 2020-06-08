<template>
  <v-card>
    <v-card>
      <v-list subheader>
        <v-subheader>A与B的聊天盒</v-subheader>
        <v-divider />
        <div v-for="msg in msgList" :key="msg.label">
          <v-list-item v-if="!msg.myself">
            <v-avatar>
              <v-img :src="userData.avatarUrl" />
            </v-avatar>
            <div style="padding-top:20px;width:48%;">
              <v-textarea
                v-model="msg.content"
                readonly
                filled
                :rows="1"
                auto-grow
                dense
                outlined
                rounded
                :label="formatDate(msg.sendDate)"
              ></v-textarea>
            </div>
          </v-list-item>
          <v-list-item v-else>
            <div style="width:50%"></div>
            <div style="padding-top:20px;width:40%;">
              <v-textarea
                filled
                :rows="1"
                v-model="msg.content"
                auto-grow
                dense
                outlined
                rounded
                reverse
                :label="formatDate(msg.sendDate)"
              ></v-textarea>
            </div>
            <v-avatar>
              <v-img :src="myselfAvatarUrl" />
            </v-avatar>
          </v-list-item>
        </div>
      </v-list>
      <v-divider />
      <v-card-actions style="padding:0 8px 0 8px">
        <div style="padding-top:25px;width:100%">
          <v-text-field
            v-model="msg.content"
            single-line
            dense
            auto-grow
            outlined
            rows="1"
            row-height="15"
          ></v-text-field>
        </div>
        <v-btn @click="send">发送</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import { getMsgList, sendMsg, getUserAvatarUrl } from "../api/index";
export default {
  props: ["userData"],
  data() {
    return {
      myselfAvatarUrl: "",
      msg: {
        targetId: this.userData.uid,
        content: ""
      },
      msgList: []
    };
  },
  created() {
    getMsgList({ targetId: this.userData.uid }).then(resp => {
      if (resp.data.success) {
        this.msgList = resp.data.data;
      }
    });
    getUserAvatarUrl().then(resp => {
      if (resp.data.success) {
        this.myselfAvatarUrl = resp.data.data;
      }
    });
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },

  methods: {
    send() {
      sendMsg(this.msg).then(resp => {
        if (resp.data.success) {
          getMsgList({ targetId: this.userData.uid }).then(resp => {
            if (resp.data.success) {
              this.msgList = resp.data.data;
            }
          });
          this.msg.content = "";
        }
      });
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