<template>
  <v-card width="86.4">
    <v-img
      :src="book.coverUrl"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      contain
      lazy-src
      height="124.8"
      width="86.4"
    ></v-img>
    <div class="book-title">{{book.name}}</div>
  </v-card>
</template>

<script>
export default {
  props: ["book"],
  data() {
    return {};
  }
};
</script>

<style>
.book-title {
  margin-top: 6px;
  text-overflow: ellipsis;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  height: auto;
}
</style>