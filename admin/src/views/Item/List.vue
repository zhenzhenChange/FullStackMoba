<template>
  <div class="list">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="name" label="物品名称" width="100"></el-table-column>
      <el-table-column prop="icon" label="物品图标" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.icon" width="50" />
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
      items: []
    };
  },
  methods: {
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    editItems(itemsId) {
      this.$router.push(`/items/edit/${itemsId}`);
    },
    async removeItems(items) {
      this.$confirm(`是否确定要删除物品 "${items.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/items/${items._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetchItems();
      });
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>