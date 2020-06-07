<template>
  <div id="card-list">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="6">
        <v-card class="mx-auto">
          <v-list subheader>
            <v-subheader>
              最近聊天
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span>近七天的聊天用户</span>
              </v-tooltip>
            </v-subheader>
            <v-list-item
              @click="showMessageBox=!showMessageBox"
              v-for="item in items"
              :key="item.title"
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-chat</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="6">
        <v-card class="mx-auto">
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
                <v-list-item-title>我关注的</v-list-item-title>
              </template>
              <v-list-item v-for="i in 4" :key="i" link>
                <v-list-item-title v-text="4"></v-list-item-title>
                <v-list-item-icon>
                  <v-icon color="black" small>mdi-chat</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
            <v-list-group prepend-icon="mdi-account-circle">
              <template v-slot:activator>
                <v-list-item-title>关注我的</v-list-item-title>
              </template>
              <v-list-item v-for="i in 4" :key="i" link>
                <v-list-item-title v-text="4"></v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-chat</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      @click:outside="showMessageBox = !showMessageBox"
      persistent
      v-model="showMessageBox"
      max-width="820px"
    >
      <MessageBox></MessageBox>
    </v-dialog>
  </div>
</template>

<script>
import MessageBox from "../components/MessageBox";
export default {
  name: "Friend",
  data() {
    return {
      showMessageBox: false,
      itemsPerPage: 4,
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
  components: {
    MessageBox
  }
};
</script>

<style>
</style>