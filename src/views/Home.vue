<template>
  <div class="home">
    <div style="padding-top:0px;">
      <v-toolbar dense>
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <div>
              <v-carousel height="234" cycle hide-delimiter-background :show-arrows="false">
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="display-3">{{ slide }} Slide</div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
            <v-row dense>
              <v-col v-for="card in cards" :key="card.label" cols="6">
                <BookCard v-bind:book="card"></BookCard>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import BookCard from "../components/BookCard";
export default {
  name: "Home",
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      cards: [
        {
          title: "第二十二条军规",
          src: 'twenty',
          flex: 6
        },
                {
          title: "第二十二条军规",
          src: 'twenty',
          flex: 6
        },
                {
          title: "第二十二条军规",
          src: 'twenty',
          flex: 6
        },
                {
          title: "第二十二条军规",
          src: 'twenty',
          flex: 6
        },
        {
          title: "小妇人",
          src: '',
          flex: 6
        }
      ],
      tab: null,
      items: [
        { tab: "新书资讯", content: "Tab 1 Content" },
        { tab: "最高评分", content: "Tab 2 Content" },
        { tab: "随机推荐", content: "Tab 3 Content" }
      ]
    };
  },
  components: {
    BookCard
  }
};
</script>
