<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="ads">
      <el-table-column prop="name" label="类别" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="editAd(scope.row._id)">编辑</el-button>
          <el-button type="text" size="medium" @click="removeAd(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: []
    };
  },
  methods: {
    async fetchAds() {
      const res = await this.$http.get("rest/ads");
      this.ads = res.data;
    },
    editAd(id) {
      this.$router.push(`/ads/edit/${id}`);
    },
    async removeAd(ad) {
      this.$confirm(`是否确定要删除分类 "${ad.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/ads/${ad._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchAds();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchAds();
  }
};
</script>