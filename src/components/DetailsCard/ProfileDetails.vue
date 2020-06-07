<template>
  <v-card min-height="600px" class="mx-auto">
    <v-card-title>
      <span>用户a的动态</span>
      <v-divider />
      <!-- <v-btn small> -->
      <v-avatar @click="$emit('closeUserHome')">
        <v-icon>mdi-close</v-icon>
      </v-avatar>
      <!-- </v-btn> -->
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-spacer />
          <div @click="followUser">
            <v-badge avatar bottom bordered overlap>
              <template v-slot:badge>
                <v-avatar>
                  <v-icon>mdi-plus</v-icon>
                </v-avatar>
              </template>
              <v-avatar color="teal" size="72">
                <img src="http://localhost:8090/img/aec52b5c8d69472cb641933a09fa90ae.jpg" />
              </v-avatar>
            </v-badge>
          </div>
          <v-spacer />
        </v-row>
        <v-row style="padding-top:20px">
          <v-spacer />
          <span>个性签名:他/她暂时没有填写个性签名哦</span>
          <v-spacer />
        </v-row>
        <v-card width="100%">
          <v-switch v-model="reverse" label="倒序"></v-switch>
          <v-timeline :reverse="reverse" :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item color="white" v-for="n in 4" :key="n">
              <template v-slot:icon>
                <v-avatar>
                  <v-icon color="red">mdi-heart</v-icon>
                  <!-- <v-icon color="green">mdi-star</v-icon> -->
                  <!-- <v-icon color="blue">mdi-message-text</v-icon> -->
                </v-avatar>
              </template>
              <span class="font-weight-bold" slot="opposite">2020.4.5 10:23</span>
              <v-card class="elevation-2">
                <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { getUserDynamic } from "@/api/index";
export default {
  props: ["uid"],
  data() {
    return {
      reverse: false,
      timeLineData:null,
    };
  },
  created() {
    getUserDynamic(this.uid).then(resp=>{
      
    })
  },
  methods: {
    followUser() {
      console.log(this.uid);
    }
  }
};
</script>

<style>
</style>
