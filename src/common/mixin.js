import { debounce } from "./utils";
import BackTop from 'content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    itemImgListener: null
  },
  mounted() {
    // 1.监听item中图片加载完成
    let refresh = debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      100
    );
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log('我是混入');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 200);
    }
  }
}