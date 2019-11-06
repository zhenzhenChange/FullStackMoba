<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header pb-3 display-flex align-items-center">
      <i class="icon icon-news" :class="`icon-${icon}`"></i>
      <div class="font-size-xl flex-1 px-2">{{title}}</div>
      <i class="icon icon-more"></i>
    </div>
    <div class="card-body mt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>