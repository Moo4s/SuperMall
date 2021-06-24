<template>
  <div class="detail">
    <detail-nav-bar/>
    {{iid}}
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
export default {
  name: 'Detail',
  components: {
    DetailNavBar

  },
  data() {
    return {
      iid: null
    }
  },
  created() {
    // 动态路由
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>
</style>