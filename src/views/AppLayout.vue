<template>
  <v-app>
    <v-app-bar app height="64">
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-icon v-else @click="drawer=!drawer">mdi-arrow-expand-left</v-icon>
      <v-spacer></v-spacer>
      <div style="padding:30px 20px 0 0 ">
        <v-text-field
          v-model="search"
          :loading="loading"
          flat
          clearable
          dense
          solo
          label="查询:书籍、好友等"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
      <v-avatar
        v-if="!this.$store.state.isLogin"
        @click="$store.commit('updateShowFormState')"
        color="teal"
        size="48"
      >
        <span
          v-if="!this.$store.state.isLogin"
          style="cursor:pointer;fontsize:14px;color:#fff;"
        >Login</span>
      </v-avatar>
      <v-menu v-else open-on-hover allow-overflow offset-y>
        <template v-slot:activator="{ on }">
          <v-avatar v-on="on" color="teal" size="48">
            <img :src="avatarUrl" alt="You" />
          </v-avatar>
        </template>
        <div style="padding-top:3px;">
          <v-list dense>
            <v-list-item dense @click="1">
              <v-list-item-title>个人资料</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="logout">
              <v-list-item-title>登出</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer width="234" v-model="drawer" app disable-resize-watcher>
      <v-list-item style="height:64px;">
        <v-list-item-content>
          <v-list-item-title class="title">图书推荐</v-list-item-title>
          <v-list-item-subtitle>为你的书找一些朋友</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :exact="true" :to="item.path" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content style="overflow-x:hidden">
      <v-container style="padding:8px" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-dialog
      @click:outside="$store.commit('updateShowFormState')"
      persistent
      v-model="this.$store.state.loginForm"
      max-width="420px"
    >
      <LoginBox @loginSuccess="loginSuccess"></LoginBox>
    </v-dialog>
    <v-snackbar v-model="showSnackbar" color="success" :timeout="4000" :top="true">
      登陆成功
      <v-btn dark text @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import LoginBox from "../components/LoginBox";
import { getUserAvatarUrl, userLogout } from "../api/index";
export default {
  data() {
    return {
      search: "",
      avatarUrl: "",
      showSnackbar: false,
      loading: false,
      items: [
        { path: "/home", title: "首页", icon: "mdi-view-dashboard" },
        { path: "/my", title: "我的主页", icon: "mdi-account" },
        { path: "/friends", title: "联系人", icon: "mdi-account-box-multiple" },
        { path: "/recommend", title: "我的推荐", icon: "mdi-book" },
        { path: "/collection", title: "我的收藏", icon: "mdi-book" }
      ],
      drawer: true
    };
  },
  watch: {
    search(val) {
      this.loading = val !== "";
      console.log(val);
    }
  },
  components: {
    LoginBox
  },
  methods: {
    loginSuccess() {
      this.showSnackbar = true;
      getUserAvatarUrl().then(resp => {
        if (resp.data.success) {
          this.avatarUrl = resp.data.data;
        }
      });
    },
    logout() {
      userLogout().then(resp => {
        if (resp.data.success) {
          this.$store.commit("updateLoginState");
        }
      });
    }
  }
};
</script>

<style>
</style>