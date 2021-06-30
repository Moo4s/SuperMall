<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    // 通过类名(class)拿取,因为整个项目中可能会出现重复的类名,指不定拿到哪一个
    // 改为通过ref拿,查找的时候通过:this.$refs.wrapper
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
    });

    // 2.监听滚动的位置
    if (this.probeType === 1 || this.probeType === 2 || this.probeType === 3)  {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
    }

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('daodibu');
        this.$emit('pullingUp')
      })
    } 
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      console.log(this.scroll.y);
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>