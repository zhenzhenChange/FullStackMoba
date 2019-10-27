<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="Category.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-row>
          <el-button @click="Category.ads.push({})">
            <i class="el-icon-plus"></i> 添加广告
          </el-button>
        </el-row>
        <el-row type="flex" style="flex-wrap:wrap;">
          <el-col class="mt-1" :md="24" v-for="(ad, index) in Category.ads" :key="index">
            <el-form-item label="跳转链接(URL)" >
              <el-input v-model="ad.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" class="mt-1">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="res => $set(ad, 'image', res.url)"
              >
                <img v-if="ad.image" :src="ad.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="Category.ads.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      Category: {
        ads: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.Category);
      } else {
        await this.$http.post("rest/ads", this.Category);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.Category = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>