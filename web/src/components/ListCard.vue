<template>
  <home-card :icon="icon" :title="title">
    <div class="nav display-flex justify-content-between">
      <div
        class="nav-item"
        :class="{ active:active === index }"
        v-for="(category,index) in categories"
        :key="index"
        @click="swiperTo(index)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <swiper class="mt-3" ref="list" @slide-change="slideChange" :options="swiperOption">
      <swiper-slide v-for="(category,index) in categories" :key="index">
        <slot name="items" :category="category"></slot>
      </swiper-slide>
    </swiper>
  </home-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0,
      swiperOption: {
        autoHeight: true
      }
    };
  },
  methods: {
    slideChange() {
      this.active = this.$refs.list.swiper.realIndex;
    },
    swiperTo(index) {
      this.$refs.list.swiper.slideTo(index);
    }
  }
};
</script>

<style>
</style>