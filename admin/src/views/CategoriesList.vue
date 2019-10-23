<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="parents.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="类别"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editData(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    editData(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
    async removeData(rowData) {
      this.$confirm(`是否确定要删除分类 "${rowData.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/categories/${rowData._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetchData();
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>