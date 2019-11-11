<template>
  <div class="list">
    <h1>文章列表</h1>
    <el-table :data="articles">
      <el-table-column prop="title" label="文章标题" width="550"></el-table-column>
      <!-- <el-table-column prop="body" label="文章正文" width="550">
        <template slot-scope="scope">
          <div v-html="scope.row.body"></div>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editArticle(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      body: []
    };
  },
  methods: {
    async fetchArticles() {
      const res = await this.$http.get("rest/articles");
      this.articles = res.data;
    },
    editArticle(id) {
      this.$router.push(`/articles/edit/${id}`);
    },
    async removeArticle(article) {
      this.$confirm(`是否确定要删除文章 《 ${article.title} 》`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${article._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchArticles();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>
<style scoped>
/* .el-table td,
.el-table th {
  text-align: left !important;
} */
</style>