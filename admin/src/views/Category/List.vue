<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="categories">
      <el-table-column prop="parents.name" label="上级分类" width="100"></el-table-column>
      <el-table-column prop="name" label="类别" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editCategories(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeCategories(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    };
  },
  methods: {
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    editCategories(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
    async removeCategories(categories) {
      this.$confirm(`是否确定要删除分类 "${categories.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/categories/${categories._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetchCategories();
      });
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>