<template>
  <div v-if="article">
    <div class="display-flex py-3 border-bottom px-1">
      <div class="text-blue">返回</div>
      <strong class="flex-1 text-ellipsis px-2 text-blue">{{article.title}}</strong>
      <div class="text-grey-6 font-size-xs">{{article.created | date}}</div>
    </div>
    <div v-html="article.body" class="body px-3 font-size-lg border-bottom"></div>
    <div>
      <div class="display-flex align-item-center px-3 py-3">
        <i class="icon icon-related"></i>
        <div style="line-height:17px;" class="pl-2 font-size-lg text-blue">相关咨询</div>
      </div>
      <router-link
        tag="div"
        :to="`/articles/${item._id}`"
        v-for="item in article.related"
        :key="item._id"
        class="text-ellipsis px-3 py-2 font-size-lg"
      >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      article: null
    };
  },
  filters: {
    date(value) {
      return dayjs(value).format("YYYY-MM-DD");
    }
  },
  watch: {
    id: "fecthArticle"
  },
  methods: {
    async fecthArticle() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.article = res.data;
    }
  },
  created() {
    this.fecthArticle();
  }
};
</script>

<style lang="scss" scope>
.body {
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  .ql-align-center {
    text-align: center;
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>