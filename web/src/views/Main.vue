<template>
  <div>
    <div class="topbar bg-black py-2 px-3 display-flex align-items-center">
      <div class="logo"></div>
      <div class="px-2 flex-1">
        <div class="text-white font-size-sm">王者荣耀</div>
        <div class="text-grey-6 font-size-xxs mt-1">团队成就更多</div>
      </div>
      <div class="downloadNow"></div>
    </div>
    <div class="nav bg-primary pt-3 pb-2">
      <div class="nav display-flex nav-inverse justify-content-around pb-1">
        <div class="nav-item active">
          <router-link tag="div" to="/" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.topbar {
  position: sticky;
  top: 0;
  z-index: 2;
}

.logo,
.downloadNow {
  background-image: url(../assets/images/index.png);
  background-repeat: no-repeat;
  background-size: 375px 455px;
}

.logo {
  width: 30px;
  height: 30px;
  background-position: 0 72.588%;
}

.downloadNow {
  width: 60px;
  height: 24px;
  background-position: 18.73% 71.694%;
}

.nav {
  .nav-item {
    border-bottom: 3px solid transparent;
    padding-bottom: 0.2rem;

    &.active {
      color: map-get($colors, "primary");
      border-bottom-color: map-get($colors, "primary");
    }
  }
  .nav-inverse {
    .nav-item {
      color: map-get($colors, "white");
      &.active {
        border-bottom-color: map-get($colors, "white");
      }
    }
  }
}
</style>