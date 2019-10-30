<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="admin_users">
      <el-table-column prop="username" label="用户名" width="100"></el-table-column>
      <el-table-column prop="password" label="密码" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editAdminUser(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeAdminUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin_users: []
    };
  },
  methods: {
    async fetchAdminUsers() {
      const res = await this.$http.get("rest/admin_users");
      this.admin_users = res.data;
    },
    editAdminUser(id) {
      this.$router.push(`/admin_users/edit/${id}`);
    },
    async removeAdminUser(admin_user) {
      this.$confirm(`是否确定要删除管理员 "${admin_user.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/admin_users/${admin_user._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchAdminUsers();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchAdminUsers();
  }
};
</script>