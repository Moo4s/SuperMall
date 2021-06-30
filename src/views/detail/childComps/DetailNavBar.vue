<template>
  <nav-bar>
    <div slot="left" class="detail-img">
      <img @click="backClick" src="~assets/img/detail/back.svg" alt="" />
    </div>
    <div slot="center" class="detail-title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        @click="currentTitle(index)"
        :class="{ active: currentIndex === index }"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "common/navbar/NavBar.vue";

export default {
  name: "DetailNav",
  components: {
    NavBar,
  },
  props: {
    detailIndex: {
      type: Number
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    currentTitle(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  },
};
</script>

<style scoped>
.detail-img {
  margin: 7px;
}

.detail-img img {
  width: 30px;
  height: 30px;
}

.detail-title {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
}

.active {
  color: #ff5777;
}
</style>