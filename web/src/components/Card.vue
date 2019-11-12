<template>
  <div class="card bg-white p-3 mt-3">
    <div
      class="card-header display-flex align-items-center"
      :class="{'border-bottom':!plain,'pb-3':!plain}"
    >
      <i class="icon icon-news" :class="`icon-${icon}`"></i>
      <strong class="font-size-xl flex-1 px-2">{{title}}</strong>
      <i class="icon icon-more" v-if="!plain"></i>
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
    icon: { type: String, required: true },
    plain: { type: Boolean }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  border-bottom: 1px solid $border-color;
}
</style>