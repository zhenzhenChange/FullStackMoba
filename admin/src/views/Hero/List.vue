<template>
  <div class="list">
    <h1>英雄列表</h1>
    <el-table :data="heroes">
      <el-table-column prop="name" label="英雄名称" width="90"></el-table-column>
      <el-table-column prop="title" label="英雄称号" width="90"></el-table-column>
      <el-table-column prop="via" label="英雄头像" width="90">
        <template slot-scope="scope">
          <img :src="scope.row.via" width="50" />
        </template>
      </el-table-column>
      <el-table-column prop="categories" label="英雄定位" width="100"></el-table-column>
      <el-table-column prop="scores.difficult" label="难度评分" width="90"></el-table-column>
      <el-table-column prop="scores.skills" label="技能评分" width="90"></el-table-column>
      <el-table-column prop="scores.attack" label="攻击评分" width="90"></el-table-column>
      <el-table-column prop="scores.survive" label="生存评分" width="90"></el-table-column>
      <el-table-column prop="withItems" label="顺风出装" width="150"></el-table-column>
      <el-table-column prop="againstItems" label="逆风出装" width="150"></el-table-column>
      <el-table-column prop="useSkills" label="使用技巧" width="150"></el-table-column>
      <el-table-column prop="combatSkills" label="对抗技巧" width="150"></el-table-column>
      <el-table-column prop="meleeIdeas" label="团战思路" width="150"></el-table-column>
      <el-table-column label="操作" width="100">
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
      heroes: []
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    },
    editData(id) {
      this.$router.push(`/heroes/edit/${id}`);
    },
    async removeData(rowData) {
      this.$confirm(`是否确定要删除分类 "${rowData.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/heroes/${rowData._id}`);
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