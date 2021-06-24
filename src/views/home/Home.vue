<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="fixed"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swipers
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swipers>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwipers from "./chilComps/HomeSwipers.vue";
import RecommendView from "./chilComps/RecommendView.vue";
import FeatureView from "./chilComps/FeatureView.vue";

import NavBar from "common/navbar/NavBar";
import Scroll from "common/scroll/Scroll.vue";
import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList.vue";
import BackTop from "content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeData } from "network/home";
import { debounce } from "../../common/utils";

export default {
  name: "Home",
  components: {
    HomeSwipers,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  destroyed() {
    // console.log('home des');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  mounted() {
    // 1.监听item中图片加载完成
    const refresh = debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      300
    );
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      // 更改类目后,返回新类目的第一行商品
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 300);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop);
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1150;

      // TabControl是否吸顶的判断
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeData(this.currentType);
    },

    // 1.获取tabControl的offsetTop
    // 所有的组件都有一个属性$el: 用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        this.goods[type].page = page;
        this.goods[type].list.push(...res.data.list);
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding: 44px 0 49px; */
  height: 100vh;
}

.home-nav {
  background-color: #ff8198;
  color: #fff;
  font-weight: 700;

  /* 在使用原生滚动时使用 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999; */
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
</style>