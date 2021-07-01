<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    showToast(message='默认文字', duration=2000) {
      // 给一个默认值(es6之前的方法)
      // duration = duration || 2000

      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scope>
  .toast {
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    border-radius: 8px;

    background-color: rgba(0, 0, 0, .7);
    color: #fff;
  }

</style>