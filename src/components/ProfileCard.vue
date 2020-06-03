<template>
  <v-card max-width="375" class="mx-auto">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-row align="center" align-content="center">
            <v-divider></v-divider>
            <div @click="chooseAvatar = !chooseAvatar">
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
          <v-list-item-title>aliconnors@example.com</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
      <v-list-item @click="0">
        <v-list-item-content>
          <v-list-item-title>个性签名:</v-list-item-title>
          <v-list-item-subtitle>{{userProfile.bio}}</v-list-item-subtitle>
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
              <v-badge color="green" :content="userProfile.idol">关注</v-badge>
            </v-col>
            <v-col>
              <v-badge color="green" :content="userProfile.fans">粉丝</v-badge>
            </v-col>
            <v-col>
              <v-badge color="green" :content="userProfile.collection">收藏</v-badge>
            </v-col>
            <v-col>
              <v-badge color="green" :content="userProfile.recommend">推荐</v-badge>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog
      @click:outside="chooseAvatar = !chooseAvatar"
      persistent
      v-model="chooseAvatar"
      max-width="400px"
    >
      <v-card max-width="375" class="mx-auto">
        <v-file-input autofocus accept="image/*" show-size label="File input"></v-file-input>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: ["userProfile"],
  data() {
    return {
      chooseAvatar: false
    };
  }
};
</script>

<style>
</style>