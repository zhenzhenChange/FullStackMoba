<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img
          src="//ossweb-img.qq.com/upload/adw/image/20191104/fd2f601e753cfad90c2d293844c6bcdf.jpeg"
          class="w-100"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="//ossweb-img.qq.com/upload/adw/image/20191104/ebacbddb9cd37c6d848a8ee20584e9ce.jpeg"
          class="w-100"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="//ossweb-img.qq.com/upload/adw/image/20191104/ae208cd5237513a25cf3dd080b9b17dd.jpeg"
          class="w-100"
        />
      </swiper-slide>
      <div class="swiper-pagination home-pagination text-right pb-2 pr-3" slot="pagination"></div>
    </swiper>
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-2">
      <div class="display-flex flex-wrap">
        <div class="nav-item mb-3 pt-1" v-for="(icon,index) in icons" :key="index">
          <i :class="icon.class" class="icon"></i>
          <div class="py-2">{{icon.title}}</div>
        </div>
      </div>
      <div class="py-2 bg-light-f">
        <i class="icon icon-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <home-list-card icon="news" title="新闻资讯" :categories="newCats">
      <template #items="{category}">
        <router-link
          :to="`/articles/${item._id}`"
          tag="div"
          v-for="(item,index) in category.newList"
          :key="index"
          class="py-2 display-flex"
        >
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="font-size-xs text-grey-9">{{item.created | date}}</span>
        </router-link>
      </template>
    </home-list-card>
    <home-list-card icon="heroes" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="display-flex flex-wrap m--5">
          <div v-for="(item,index) in category.heroList" :key="index" class="px-2 text-center w-20">
            <div class="pb-3">
              <img :src="item.via" class="w-100 pb-1" />
              <div>{{item.name}}</div>
            </div>
          </div>
        </div>
      </template>
    </home-list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".home-pagination"
        },
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 3000
        },
        speed: 1000
      },
      icons: [
        { class: "icon-fact", title: "爆料站" },
        { class: "icon-story", title: "故事站" },
        { class: "icon-mall", title: "周边商城" },
        { class: "icon-serving", title: "体验服" },
        { class: "icon-couple", title: "新人专区" },
        { class: "icon-glory", title: "荣耀·传承" },
        { class: "icon-data", title: "模拟站资料库" },
        { class: "icon-camp", title: "王者营地" },
        { class: "icon-public", title: "公众号" },
        { class: "icon-version", title: "版本介绍" },
        { class: "icon-game", title: "对局环境" },
        { class: "icon-king", title: "无限王者团" }
      ],
      newCats: [],
      heroCats: []
    };
  },
  filters: {
    date(value) {
      return dayjs(value).format("MM/DD");
    }
  },
  methods: {
    async fetchDataList() {
      const newsRes = await this.$http.get("/news/list");
      const heroesRes = await this.$http.get("/heroes/list");
      this.newCats = newsRes.data;
      this.heroCats = heroesRes.data;
    }
  },
  created() {
    this.fetchDataList();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.home-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 2px;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-of-type(4n) {
      border-right: 0;
    }
  }
}

.m--5 {
  margin: 0 -0.5rem;
}
</style>