<template>
  <div v-if="hero" class="hero-details">
    <div class="topbar bg-black py-2 px-3 display-flex align-items-center text-white">
      <div class="logo"></div>
      <div class="px-2 flex-1">
        <span class="font-size-sm">王者荣耀</span>
        <span class="font-size-sm ml-3">攻略站</span>
      </div>
      <routerLink to="/" tag="div">更多英雄 &gt;</routerLink>
    </div>
    <div class="top" :style="{'background-image':`url(${hero.banner})`}">
      <div class="info text-white px-3 display-flex flex-column h-100 justify-content-end pb-3">
        <div class="font-size-sm">{{hero.title}}</div>
        <h2 class="my-2">{{hero.name}}</h2>
        <div class="font-size-xs mb-1">{{hero.categories.map(position => position.name).join("/")}}</div>
        <div class="display-flex justify-content-between">
          <div class="scores display-flex align-items-center" v-if="hero.scores">
            <span>难度</span>
            <span class="badge bg-primary font-size-xxs">{{hero.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1 font-size-xxs">{{hero.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger font-size-xxs">{{hero.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark-2 font-size-xxs">{{hero.scores.survive}}</span>
          </div>
          <routerLink to="/" tag="span">皮肤 &gt;</routerLink>
        </div>
      </div>
    </div>
    <div>
      <div class="px-3 bg-white">
        <div class="nav display-flex justify-content-around border-bottom py-3 pb-2">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper class="bg-white">
        <swiper-slide class="w-100">
          <div class="bg-white-e">
            <div class="p-3 bg-white border-bottom">
              <div class="display-flex">
                <router-link to="/" tag="button" class="btn btn-lg flex-1">
                  <i class="icon icon-news"></i>
                  英雄介绍视频
                </router-link>
                <router-link to="/" tag="button" class="btn btn-lg flex-1 ml-2">
                  <i class="icon icon-news"></i>
                  一图识别英雄
                </router-link>
              </div>
              <div class="skills mt-4">
                <div class="display-flex justify-content-around">
                  <img
                    :src="skill.icon"
                    v-for="(skill,index) in hero.skills"
                    :key="index"
                    :class="{active : currentSkillIndex === index}"
                    @click="currentSkillIndex = index"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="display-flex align-items-center">
                    <h3>{{currentSkill.name}}</h3>
                    <span
                      class="text-grey-9 font-size-sm ml-2"
                    >（冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}}）</span>
                  </div>
                  <div class="pb-3 border-bottom line-height-1">{{currentSkill.description}}</div>
                  <div class="text-grey-9 pt-3">小提示：{{currentSkill.tips}}</div>
                </div>
              </div>
            </div>
            <home-card plain icon="news" title="出装推荐" class="hero-items">
              <div class="font-size-xl">顺风出装</div>
              <div class="display-flex justify-content-around border-bottom pb-4">
                <div class="pt-3" v-for="(item,index) in hero.withItems" :key="index">
                  <img :src="item.icon" />
                  <div class="font-size-xs text-center pt-1">{{item.name}}</div>
                </div>
              </div>
              <div class="font-size-xl pt-3">逆风出装</div>
              <div class="display-flex justify-content-around">
                <div class="pt-3" v-for="(item,index) in hero.againstItems" :key="index">
                  <img :src="item.icon" />
                  <div class="font-size-xs text-center pt-1">{{item.name}}</div>
                </div>
              </div>
            </home-card>
            <home-card plain icon="news" title="使用技巧">
              <p class="m-0">{{hero.useSkills}}</p>
            </home-card>
            <home-card plain icon="news" title="对抗技巧">
              <p class="m-0">{{hero.combatSkills}}</p>
            </home-card>
            <home-card plain icon="news" title="团战思路">
              <p class="m-0">{{hero.meleeIdeas}}</p>
            </home-card>
            <home-card plain icon="news" title="英雄关系" class="partnerShip">
              <strong class="font-size-xl py-2">最佳搭档</strong>
              <div class="display-flex pt-3" v-for="item in hero.partnerShip" :key="item._id">
                <img :src="item.hero.via" />
                <p class="pl-2 flex-1 m-0">{{item.description}}</p>
              </div>
              <div class="border-bottom mt-3"></div>
            </home-card>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      hero: null,
      currentSkillIndex: 0
    };
  },
  methods: {
    async fetchHeroData() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.hero = res.data;
    }
  },
  created() {
    this.fetchHeroData();
  },
  computed: {
    currentSkill() {
      return this.hero.skills[this.currentSkillIndex];
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/scss/_variables.scss";
.top {
  height: 50vw;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: auto 100%;
}

.info {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  .scores {
    .badge {
      width: 1rem;
      height: 1rem;
      display: inline-block;
      border-radius: 50%;
      line-height: 1rem;
      text-align: center;
      margin: 0 0.3rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.skills {
  img {
    width: 70px;
    border: 3px solid transparent;
    &.active {
      border-color: map-get($colors, "primary");
      border-radius: 50%;
    }
  }
}

.partnerShip {
  img {
    width: 50px;
    height: 50px;
  }
}
.hero-items {
  img {
    width: 45px;
    border-radius: 50%;
  }
}
</style>