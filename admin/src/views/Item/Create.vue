<template>
  <div>
    <h1>{{id ? "修改" : "新增"}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="Item.name"></el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="uploadSuccess"
        >
          <img v-if="Item.icon" :src="Item.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      Item: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.Item);
      } else {
        await this.$http.post("rest/items", this.Item);
      }
      this.$router.push("/items/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.Item = res.data;
    },
    uploadSuccess(res) {
      // this.model.icon = res.url;
      // 显示赋值，icon属性事先未定义
      this.$set(this.Item, "icon", res.url);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>