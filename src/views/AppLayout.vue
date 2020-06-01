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
      <v-avatar color="teal" size="48">
        <span class="white--text headline">Me</span>
      </v-avatar>
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
    <v-content>
      <v-container style="padding:8px" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      loading: false,
      items: [
        { path: "/home", title: "首页", icon: "mdi-view-dashboard" },
        { path: "/friends", title: "联系人", icon: "mdi-account-box-multiple" },
        { path: "/recommend", title: "我的推荐", icon: "mdi-book" },
        { path: "/collection", title: "我的收藏", icon: "mdi-book" }
      ],
      drawer: true
    };
  },
  watch: {
    search(val) {
      this.loading = val !== ""
      console.log(val)
    }
  }
};
</script>

<style>
</style>