<template>
  <div>
    <h1>{{id ? "修改" : "创建"}}英雄{{id ? "信息" : ""}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="uploadSuccess"
            >
              <img v-if="model.via" :src="model.via" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="英雄定位">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="position in categories"
                :key="position._id"
                :label="position.name"
                :value="position._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度评分">
            <el-rate :max="9" show-score v-model="model.scores.difficult" class="scores-rate"></el-rate>
          </el-form-item>
          <el-form-item label="技能评分">
            <el-rate :max="9" show-score v-model="model.scores.skills" class="scores-rate"></el-rate>
          </el-form-item>
          <el-form-item label="攻击评分">
            <el-rate :max="9" show-score v-model="model.scores.attack" class="scores-rate"></el-rate>
          </el-form-item>
          <el-form-item label="生存评分">
            <el-rate :max="9" show-score v-model="model.scores.survive" class="scores-rate"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.withItems" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.againstItems" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.useSkills"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.combatSkills"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.meleeIdeas"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能管理" name="skills">
          <el-row>
            <el-button @click="model.skills.push({})">
              <i class="el-icon-plus"></i> 添加技能
            </el-button>
          </el-row>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col class="mt-1" :md="12" v-for="(skill, index) in model.skills" :key="index">
              <el-form-item label="技能名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(skill, 'icon', res.url)"
                >
                  <img v-if="skill.icon" :src="skill.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="skill.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" class="mt-1">保存</el-button>
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
      model: {
        name: "",
        via: "",
        scores: {
          difficult: 0
        },
        skills: []
      },
      categories: [],
      items: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // 难点
      this.model = Object.assign({}, this.model, res.data);
    },
    uploadSuccess(res) {
      this.model.via = res.url;
      // 显示赋值，icon属性事先未定义
      // this.$set(this.model, "via", res.url);
    },
    async fetchPosition() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchPosition();
    this.id && this.fetch();
  }
};
</script>
<style scoped>
.scores-rate {
  margin-top: 0.64rem;
}

.el-col.el-col-24.el-col-md-12 {
  border-bottom: 0.1rem #bfc1c4 dotted;
}
</style>