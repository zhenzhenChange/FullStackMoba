<template>
  <div>
    <h1>{{id ? "修改" : "创建"}}英雄{{id ? "信息" : ""}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="baseInfo">
        <el-tab-pane label="基本信息" name="baseInfo">
          <el-row>
            <el-col :span="2">
              <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  :action="uploadURL"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="uploadViaSuccess"
                >
                  <img v-if="Hero.via" :src="Hero.via" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <el-upload
                  class="avatar-uploader banner"
                  :action="uploadURL"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="uploadBannerSuccess"
                >
                  <img v-if="Hero.banner" :src="Hero.banner" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="英雄名称">
                <el-input v-model="Hero.name" class="w-100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="英雄称号">
                <el-input v-model="Hero.title" class="w-100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="英雄定位">
                <el-select v-model="Hero.categories" multiple>
                  <el-option
                    v-for="position in categories"
                    :key="position._id"
                    :label="position.name"
                    :value="position._id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="难度评分">
                <el-rate :max="9" show-score v-model="Hero.scores.difficult" class="scores-rate"></el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="技能评分">
                <el-rate :max="9" show-score v-model="Hero.scores.skills" class="scores-rate"></el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="攻击评分">
                <el-rate :max="9" show-score v-model="Hero.scores.attack" class="scores-rate"></el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生存评分">
                <el-rate :max="9" show-score v-model="Hero.scores.survive" class="scores-rate"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="顺风出装">
            <el-select v-model="Hero.withItems" multiple class="checkItem">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="Hero.againstItems" multiple class="checkItem">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="Hero.useSkills"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="Hero.combatSkills"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="Hero.meleeIdeas"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能管理" name="skills">
          <el-row>
            <el-button @click="Hero.skills.push({})">
              <i class="el-icon-plus"></i> 添加技能
            </el-button>
          </el-row>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col class="mt-1" :md="12" v-for="(skill, index) in Hero.skills" :key="index">
              <el-form-item label="技能名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadURL"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(skill, 'icon', res.url)"
                >
                  <img v-if="skill.icon" :src="skill.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="skill.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="skill.cost"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="skill.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="Hero.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partnerShip">
          <el-row>
            <el-button @click="Hero.partnerShip.push({})">
              <i class="el-icon-plus"></i> 添加英雄
            </el-button>
          </el-row>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col class="mt-1" :md="12" v-for="(item, index) in Hero.partnerShip" :key="index">
              <el-form-item>
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="Hero.partnerShip.splice(index,1)">删除</el-button>
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
      Hero: {
        name: "",
        via: "",
        scores: {
          difficult: 0
        },
        skills: [],
        partnerShip: []
      },
      categories: [],
      items: [],
      heroes: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.Hero);
      } else {
        await this.$http.post("rest/heroes", this.Hero);
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
      this.Hero = Object.assign({}, this.Hero, res.data);
    },
    uploadViaSuccess(res) {
      this.Hero.via = res.url;
      // 显示赋值，icon属性事先未定义
      // this.$set(this.Hero, "via", res.url);
    },
    uploadBannerSuccess(res) {
      this.$set(this.Hero, "banner", res.url);
    },
    async fetchPosition() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchHeroes();
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

.checkItem {
  width: 100%;
}

.w-100 >>> .el-input__inner {
  width: 10rem;
}

.banner >>> .el-upload {
  max-width: 20rem;
}
</style>