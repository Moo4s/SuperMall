<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
      :class="{ active: index === currentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      // console.log(index);
      this.currentIndex = index;
      this.$emit('tabClick', index)
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 35px;
  font-size: 15px;
  background-color: #fff;
  font-weight: bold;
  z-index: 9;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 3px;
}

.active {
  color: #ff5777;
}

.active span {
  border-bottom: 2px solid #ff5777;
}
</style>