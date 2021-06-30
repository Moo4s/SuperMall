<template>
  <div id="detail">
    <detail-nav-bar id="detaiNavBar" @titleClick="titleClick" ref="detailNav" />
    <scroll class="detail-content" ref="scroll" @scroll="detaiScroll" :probe-type="3">
      <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
      </ul> -->
      <!-- <div>{{$store.state.cartList.length}}</div> -->
      <!-- 注意驼峰命名问题,相应要作出修改,出错注意检查 -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @goodsImageLoad="goodsImageLoad"
      />
      <detail-param-info :paramInfo="paramInfo" ref="detailParam" />
      <detail-comment-info :comment-info="commentInfo" ref="detailComment" />
      <goods-list :goods="recommends" ref="detailRecommend" />

    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { itemListenerMixin, backTopMixin } from "../../common/mixin";

import Scroll from "common/scroll/Scroll.vue";
import GoodsList from "content/goods/GoodsList.vue";
// import BackTop from "content/backTop/BackTop.vue";  // 混入

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue';

export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,
    // BackTop,  // 抽取混入
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      // isShowBackTop: false, // 抽取
    };
  },
  created() {
    // 动态路由 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 2.1.获取结果
      // console.log(res);
      const data = res.result;
      // 2.2.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5.获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.7.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      };

      // 1.第一次获取,值不对
      // 值不对的原因: this.$refs.detailParam.$el没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      // this.$nextTick(() => {
      //   // 2.第二次获取,值依然不对
      //   // 值不对原因: 图片没有计算在内
      //   // 根据最新的数据,对应的DOM是已经被渲染出来了
      //   // 但是图片依然没有加载完成(目前或得到的offsetTop是不包含其中图片的)
      //   // 一般情况下,offsetTop值不对都是因为图片问题
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });

    // 3.获取推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    goodsImageLoad() {
      this.$refs.scroll.refresh();

      // 注意:课程中老师对下面操作加了防抖,原因是解决方案不同(p206)
      // 此处包裹操作的goodsImageLoad函数已经被我们做了处理,只会回调一次,所以不需要再增加防抖
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    detaiScroll(position) {
      let positionY = -position.y
      for (let i = 0; i < this.themeTopYs.length-1; i++) {
        // for in遍历出来的i是字符串类型,可以类型转化,此处改用另一种遍历
        // i = parseInt(i)
        // console.log(i+1);
        /**
         * [0, a, b, c, max]
         * 
         */
        if (this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex
          // console.log(i);
        }
      }

      // 显示回到顶部的按钮
      this.isShowBackTop = -position.y > 1150;
    },
    // 抽取backTop
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 200);
    // },
    addToCart() {
      // console.log('----');
      // 1.获取商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid

      // 2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
    }

  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}

#detaiNavBar {
  background-color: #fff;
}

.detail-content {
  height: calc(100% - 44px - 58px);
}
</style>