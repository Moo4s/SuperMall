<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- 外面套一层div,原因是插槽是会被替换的,绑定的属性都不会起效 -->
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 获取谁处于活跃状态
    isActive() {
      // $route谁处于活跃状态,$route就是谁
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 动态绑定活跃状态文字的颜色(可以外部传入)
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log(this.path);
      this.$router.replace(this.path)
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;

  padding-top: 2px;
}

.tab-bar-item img {
  height: 24px;
  width: 24px;
}
</style>