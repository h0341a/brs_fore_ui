<template>
  <v-card>
    <v-list subheader>
      <v-subheader>A与B的聊天盒</v-subheader>
      <v-divider />
      <v-list-item>
        <v-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg" />
        </v-avatar>
        <div style="padding-top:20px;width:88%;">
          <v-textarea
            v-model="message"
            readonly
            filled
            :rows="1"
            auto-grow
            dense
            outlined
            rounded
            label="17:02"
          ></v-textarea>
        </div>
      </v-list-item>
      <v-list-item>
        <v-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg" />
        </v-avatar>
        <div style="padding-top:20px;">
          <v-textarea
            v-model="message"
            readonly
            filled
            :rows="1"
            auto-grow
            dense
            outlined
            rounded
            label="17:02"
          ></v-textarea>
        </div>
      </v-list-item>
      <v-list-item>
        <div style="width:50%"></div>
        <div style="padding-top:20px;width:40%;">
          <v-textarea
            filled
            :rows="1"
            v-model="message2"
            auto-grow
            dense
            outlined
            rounded
            reverse
            label="17:02"
          ></v-textarea>
        </div>

        <v-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg" />
        </v-avatar>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-actions style="padding:0 8px 0 8px">
      <div style="padding-top:25px;width:100%">
        <v-text-field single-line dense auto-grow outlined rows="1" row-height="15"></v-text-field>
      </div>
      <v-btn> 发送</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    message:
      "HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey!",
    message2: "12312"
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    }
  }
};
</script>

<style>
</style>