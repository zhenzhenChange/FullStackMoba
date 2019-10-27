<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="categories">
      <el-table-column prop="username" label="用户名" width="100"></el-table-column>
      <el-table-column prop="password" label="密码" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editCategory(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeCategory(scope.row)">删除</el-button>
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
      const res = await this.$http.get("rest/admin_users");
      this.categories = res.data;
    },
    editCategory(id) {
      this.$router.push(`/admin_users/edit/${id}`);
    },
    async removeCategory(category) {
      this.$confirm(`是否确定要删除管理员 "${category.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/admin_users/${category._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchCategories();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>