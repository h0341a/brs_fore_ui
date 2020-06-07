<template>
  <v-card>
    <v-img
      :src="book.coverUrl"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      contain
      lazy-src
      height="268px"
    >
      <v-card-title v-text="book.bookName"></v-card-title>
    </v-img>
    <v-card-actions>
      <div style="cursor:pointer;">
        推荐人:
        <span
          @click="showUserHome = !showUserHome"
          style="text-decoration: underline;color:green"
        >{{book.nickname}}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="toStar" icon>
        <v-icon v-if="star" color="red">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart</v-icon>
      </v-btn>
      <v-btn @click="toCollection" icon>
        <v-icon v-if="collection" color="red">mdi-bookmark</v-icon>
        <v-icon v-else>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>查看</v-btn>
    </v-card-actions>
    <v-dialog
      @click:outside="showUserHome = false"
      persistent
      v-model="showUserHome"
      max-width="98%"
    >
      <UserHome @closeUserHome="showUserHome=false" v-bind:uid="book.uid"></UserHome>
    </v-dialog>
  </v-card>
</template>

<script>
import UserHome from "../components/DetailsCard/ProfileDetails";
import {
  isStar,
  isCollection,
  addCollection,
  cancelCollection,
  addStar,
  cancelStar
} from "../api/index";
export default {
  props: ["book"],
  data() {
    return {
      showUserHome: false,
      star: false,
      collection: false
    };
  },
  created() {
    if (this.$store.state.isLogin) {
      isStar({ rid: this.book.rid }).then(resp => {
        if (resp.data.success) {
          this.star = resp.data.data;
        }
      });
      isCollection({ bid: this.book.bid }).then(resp => {
        if (resp.data.success) {
          this.collection = resp.data.data;
        }
      });
    }
  },
  watch: {
    "$store.state.isLogin": function(val) {
      if (val) {
        isStar({ rid: this.rid }).then(resp => {
          if (resp.data.success) {
            this.star = resp.data.data;
          }
        });
        isCollection({ bid: this.book.bid }).then(resp => {
          if (resp.data.success) {
            this.collection = resp.data.data;
          }
        });
      }
    }
  },
  methods: {
    openUserHome() {
      this.showUserHome = true;
    },
    toStar() {
      if (this.$store.state.isLogin) {
        if (this.star) {
          cancelStar({ rid: this.book.rid }).then(resp => {
            if (resp.data.success) {
              this.star = false;
            }
          });
        } else {
          addStar({ rid: this.book.rid }).then(resp => {
            if (resp.data.success) {
              this.star = true;
            }
          });
        }
      } else {
        this.$store.commit("updateShowFormState");
      }
    },
    toCollection() {
      if (this.$store.state.isLogin) {
        if (this.collection) {
          cancelCollection({ bid: this.book.bid }).then(resp => {
            if (resp.data.success) {
              this.collection = false;
            }
          });
        } else {
          addCollection({ bid: this.book.bid }).then(resp => {
            if (resp.data.success) {
              this.collection = true;
            }
          });
        }
      } else {
        this.$store.commit("updateShowFormState");
      }
    }
  },
  components: {
    UserHome
  }
};
</script>

<style>
</style>