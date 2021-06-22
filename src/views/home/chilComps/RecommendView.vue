<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    width: 100%;
    padding: 5px 5px 10px 5px;
    border-bottom: 5px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
  }

</style>