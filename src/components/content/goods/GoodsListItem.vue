<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      typr: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
};
</script>

<style>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 47%;
}

.goods-item img {
  border-radius: 5px;
  /* 不建议固定宽度,设置百分比可以适配不同显示屏 */
  width: 100%;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  /* overflow: hidden; */
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: #ff5777;
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  top: 0;
  left: -15px;
  width: 14px;
  height: 14px;
}
</style>