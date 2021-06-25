<template>
  <div id="detail">
    <detail-nav-bar id="detaiNavBar" />
    <scroll class="detail-content" ref="scroll">
      <!-- 注意驼峰命名问题,相应要作出修改,出错注意检查 -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad="goodsImageLoad" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import { getDetail, getRecommend, Goods, Shop } from "network/detail";
import {itemListenerMixin} from "../../common/mixin"

import Scroll from "common/scroll/Scroll.vue";

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      commentInfo: {},
      recommends: []
    };
  },
  created() {
    // 动态路由 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 7.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    });
  
    // 3.获取推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  },
  methods: {
    goodsImageLoad() {
      this.$refs.scroll.refresh()
    }
  }
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
   height: calc(100% - 44px);
 }
</style>