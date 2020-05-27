<template>
  <div id="app" class="fillcontainer">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App"
});
</script>

<style lang="scss">
@import './assets/style/common';
</style>
