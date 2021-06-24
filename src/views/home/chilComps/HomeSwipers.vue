<template>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "common/swiper"

export default {
  name: "HomeSwipers",
  props: {
    banners: {
      typr: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
    }
  },
  methods: {
    // 为计算高度,只需要发出一次即可,
    // 设定一个isLoad优化,实现只发出一次
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>