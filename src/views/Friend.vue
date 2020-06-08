<template>
  <div id="card-list">
    <v-card min-height="640px" class="mx-auto">
      <v-list subheader>
        <v-subheader>
          我的好友
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" dark v-on="on">mdi-help-circle-outline</v-icon>
            </template>
            <span>如果你的关注里已经有了该好友，那么在关注我的列表项中不会出现该好友</span>
          </v-tooltip>
        </v-subheader>
        <v-list-group prepend-icon="mdi-account-circle" value="true">
          <template v-slot:activator>
            <v-list-item-title>我关注的({{myFollows.length}})</v-list-item-title>
          </template>
          <v-list-item
            @click="openMessageBox(item.uid,item.avatarUrl)"
            v-for="item in myFollows"
            :key="item.label"
            link
          >
            <v-list-item-avatar>
              <v-img :src="item.avatarUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.nickname"></v-list-item-title>
            <v-list-item-icon>
              <v-icon color="black" small>mdi-chat</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>关注我的({{followMes.length}})</v-list-item-title>
          </template>
          <v-list-item v-for="item in followMes" :key="item.label" link>
            <v-list-item-avatar>
              <v-img :src="item.avatarUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.nickname"></v-list-item-title>
            <v-list-item-icon>
              <v-icon color="black" small>mdi-chat</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
    <v-dialog
      @click:outside="showMessageBox = !showMessageBox"
      persistent
      v-model="showMessageBox"
      max-width="820px"
    >
      <MessageBox v-bind:userData="otherUserData"></MessageBox>
    </v-dialog>
  </div>
</template>

<script>
import MessageBox from "../components/MessageBox";
import { getFriendList } from "../api/index";
export default {
  name: "Friend",
  data() {
    return {
      showMessageBox: false,
      passId: null,
      otherUserData: {},
      myFollows: ["1"],
      followMes: ["1"],
      items: [
        {
          active: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ],
      items2: [
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
        },
        {}
      ]
    };
  },
  created() {
    getFriendList().then(resp => {
      if (resp.data.success) {
        this.myFollows = resp.data.data.followUser;
        this.followMes = resp.data.data.userFollow;
      }
    });
  },
  methods: {
    openMessageBox(uid, avatarUrl) {
      this.showMessageBox = true;
      this.otherUserData.uid = uid;
      this.otherUserData.avatarUrl = avatarUrl;
    }
  },
  components: {
    MessageBox
  }
};
</script>

<style>
</style>