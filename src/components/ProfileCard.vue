<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-row align="center" align-content="center">
            <v-divider></v-divider>
            <div @click="upload">
              <v-badge avatar bottom bordered overlap>
                <template v-slot:badge>
                  <v-avatar>
                    <v-icon>mdi-plus</v-icon>
                  </v-avatar>
                </template>
                <v-avatar color="teal" size="72">
                  <img :src="userProfile.avatarUrl" alt="You" />
                </v-avatar>
              </v-badge>
            </div>
            <input
              style="display:none"
              type="file"
              id="file"
              ref="file"
              @change="uploadAvatar"
              accept=".jpg, .jpeg, .png"
            />

            <v-divider></v-divider>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item @click="1">
        <v-list-item-icon>昵称:</v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{userProfile.nickname}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="alert('2')">mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item @click="1">
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{userProfile.email}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
      <v-list-item @click="0">
        <v-list-item-content>
          <v-list-item-title>个性签名:</v-list-item-title>
          <v-list-item-subtitle v-if="userProfile.bio != null">{{userProfile.bio}}</v-list-item-subtitle>
          <v-list-item-subtitle v-else>你还没有填写个性签名呢</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon @click="alert('2')">mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item @click="0">
        <v-list-item-content>
          <v-row>
            <v-col>
              <v-badge color="green" :content="userProfile.idols + ''">关注</v-badge>
            </v-col>
            <v-col>
              <v-badge color="green" :content="userProfile.fans +''">粉丝</v-badge>
            </v-col>
            <v-col>
              <v-badge color="green" :content="userProfile.collections +''">收藏</v-badge>
            </v-col>
            <v-col>
              <v-badge color="green" :content="userProfile.recommends+''">推荐</v-badge>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { uploadAvatar } from "../api/index";
export default {
  props: ["userProfile"],
  methods: {
    upload() {
      this.$refs.file.click();
    },
    uploadAvatar(e) {
      let formData = new FormData();
      const files = e.target.files;
      if (files && files[0]) {
        const img = files[0];
        if (img.size > 1024 * 1024 * 5) {
          return;
        } else {
          formData.append("uploadFile", img);
          console.log(formData.get("uploadFile"));
          uploadAvatar(formData).then(resp => {
            if (resp.data.success) {
              console.log(resp.data);
            } else {
              console.log(resp.data);
              formData = null;
            }
          });
        }
      }
    }
  }
};
</script>

<style>
</style>