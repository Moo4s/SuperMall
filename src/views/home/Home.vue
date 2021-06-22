<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- <h2>主页</h2> -->
    <home-swipers :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <goods-list :goods="showGoods" />
  </div>
</template>

<script>
import HomeSwipers from "./chilComps/HomeSwipers.vue";
import RecommendView from "./chilComps/RecommendView.vue";
import FeatureView from "./chilComps/FeatureView.vue";

import NavBar from "common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";
import GoodsList from '../../components/content/goods/GoodsList.vue';

import { getHomeMultidata, getHomeData } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwipers,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop'
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
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
      const page = this.goods[type].page + 1
      getHomeData(type, page).then((res) => {
        // console.log(res);
        this.goods[type].page = page
        this.goods[type].list.push(...res.data.list)
      })
      // console.log(this.goods[type]);
    }
  },
};
</script>

<style>
#home {
  padding: 44px 0 49px;
}

.home-nav {
  background-color: #ff8198;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>