<template>
  <v-card>
    <v-img
      :src="littleWomen"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      contain
      lazy-src
      height="268px"
    >
      <v-card-title v-text="book.bookName"></v-card-title>
    </v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="toStar" icon>
        <v-icon v-if="star" color="red">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart</v-icon>
      </v-btn>
      <v-btn @click="toCollection" icon>
        <v-icon v-if="collection" color="red">mdi-bookmark</v-icon>
        <v-icon v-else>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>{{book.nickname}} say:{{book.content}}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import littleWomen from "../assets/img/little_women.jpg";
import {
  isStar,
  isCollection,
  addCollection,
  cancelCollection
} from "../api/index";
export default {
  props: ["book"],
  data() {
    return {
      show: true,
      star: false,
      collection: false,
      littleWomen: littleWomen
    };
  },
  created() {
    if (this.$store.state.isLogin) {
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
    toStar() {
      // if (this.$store.state.isLogin) {
      //   if (state === "star") {
      //     console.log(state);
      //   } else if (state === "collect") {
      //     console.log(state);
      //   }
      // } else {
      //   this.$store.commit("updateShowFormState");
      // }
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
  }
};
</script>

<style>
</style>