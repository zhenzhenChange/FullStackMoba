<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>请先登录</span>
      </div>
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="userData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: "admin",
        password: "admin"
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.userData);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    }
  }
};
</script>

<style>
.box-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>