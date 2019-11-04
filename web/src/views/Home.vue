<template>
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
</template>

<script>
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
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.home-pagination {
  /deep/ .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 2px;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
</style>