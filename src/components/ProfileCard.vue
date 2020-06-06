<template>
  <v-card v-if="userProfile!=null" class="mx-auto">
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
                  <img v-if="newProfile.avatar===''" :src="userProfile.avatarUrl" alt="You" />
                  <img v-else :src="newProfile.avatar" alt="newAvatar" />
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
      <v-list-item v-if="!editName" @click="1">
        <v-list-item-icon>昵称:</v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{userProfile.nickname}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="editName = !editName">mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item v-else @click="1">
        <v-text-field label="昵称" dense v-model="newProfile.nickname"></v-text-field>
        <v-list-item-icon>
          <v-icon @click="editName = !editName">mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item @click="0">
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{userProfile.email}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
      <v-list-item v-if="!editBio" @click="0">
        <v-list-item-content>
          <v-list-item-title v-if="!editBio">个性签名:</v-list-item-title>
          <v-list-item-subtitle v-if="userProfile.bio != null">{{userProfile.bio}}</v-list-item-subtitle>
          <v-list-item-subtitle v-else>你还没有填写个性签名呢</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="editBio =!editBio">mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item v-else @click="1">
        <v-text-field label="个性签名" dense v-model="newProfile.bio"></v-text-field>
        <v-list-item-icon>
          <v-icon @click="editBio = !editBio">mdi-close</v-icon>
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
      <v-divider />
      <v-list-item v-if="editName || editBio || newProfile.avatar !== ''">
        <v-row>
          <v-btn @click="showCancelDialog=!showCancelDialog" outlined color="teal">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-divider />
          <v-btn @click="showConfirmDialog=!showConfirmDialog" outlined color="indigo">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-list>
    <v-dialog v-model="showConfirmDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">确认框</v-card-title>

        <v-card-text>是否确认更改?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="showConfirmDialog = false">取消</v-btn>

          <v-btn color="green darken-1" text @click="commit">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCancelDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">重置框</v-card-title>

        <v-card-text>确认将有可能丢失你保存的当前内容,是否确认?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="showCancelDialog = false">取消</v-btn>

          <v-btn color="green darken-1" text @click="reset">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { uploadImg, updateUserProfile, deleteCacheImg } from "../api/index";
export default {
  props: ["userProfile"],
  data() {
    return {
      showConfirmDialog: false,
      showCancelDialog: false,
      imgName: "",
      newProfile: {
        avatar: "",
        nickname: "",
        bio: ""
      },
      editName: false,
      editBio: false
    };
  },
  methods: {
    reset() {
      this.showCancelDialog = false;
      if (this.imgName !== "") {
        deleteCacheImg({ imgName: this.imgName });
        this.newProfile.avatar = "";
      }
      this.editName = false;
      this.editBio = false;
    },
    commit() {
      updateUserProfile(this.newProfile).then(resp => {
        if (resp.data.success) {
          this.newProfile.avatar = "";
          this.editName = false;
          this.editBio = false;
          this.$emit("done");
        }
      });
    },
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
          uploadImg(formData).then(resp => {
            if (resp.data.success) {
              this.imgName = resp.data.data;
              this.newProfile.avatar =
                "http://localhost:8090/img/" + this.imgName;
            } else {
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