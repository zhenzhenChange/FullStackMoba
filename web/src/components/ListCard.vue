<template>
  <home-card :icon="icon" :title="title">
    <div class="nav display-flex justify-content-between">
      <div
        class="nav-item"
        :class="{ active:active === index }"
        v-for="(category,index) in categories"
        :key="index"
        @click="$refs.list.swiper.slideTo(index)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <swiper class="mt-3" ref="list" @slide-change="()=>active=$refs.list.swiper.realIndex">
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
      active: 0
    };
  }
};
</script>

<style>
</style>