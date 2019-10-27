<template>
  <div class="list">
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="title" label="文章标题" width="100"></el-table-column>
      <el-table-column prop="body" label="文章正文" width="100">
        <template slot-scope="scope">
          <div v-html="scope.row.body"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editItems(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeItems(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      body: []
    };
  },
  methods: {
    async fetchItems() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    editItems(itemsId) {
      this.$router.push(`/articles/edit/${itemsId}`);
    },
    async removeItems(items) {
      this.$confirm(`是否确定要删除文章 《 ${items.title} 》`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${items._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchItems();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>