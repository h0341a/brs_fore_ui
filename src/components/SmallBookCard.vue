<template>
    <v-card width="86.4" height="124.8">
      <v-img
        :src="littleWomen"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        contain
        lazy-src
        height="124.8"
        width="86.4"
      ></v-img>
      <div class="book-title">小妇人</div>
    </v-card>
</template>

<script>
import littleWomen from "../assets/img/little_women.jpg";

export default {
  props: ["book"],
  data() {
    return {
      littleWomen: littleWomen
    };
  }
};
</script>

<style>
.book-title {
  margin-top: 6px;
  font-size: 13px;
  color: slategrey;
  line-height: 18px;
  overflow: hidden;
  height: 36px;
  display: -webkit-box;
  display: -moz-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-text-size-adjust: none;
  box-orient: vertical;
  height: auto;
  max-height: 36px;
}
</style>