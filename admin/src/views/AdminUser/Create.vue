<template>
  <div>
    <h1>{{id ? "编辑" : "新增"}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="Category.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="Category.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      Category: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.Category);
      } else {
        await this.$http.post("rest/admin_users", this.Category);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.Category = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>