<template>
  <div id="app">
    <router-view/>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'
import TabBar from './components/common/tabbar/TabBar.vue'
import TabBarItem from './components/common/tabbar/TabBarItem.vue'
import NavBar from './components/common/navbar/NavBar.vue'


export default {
  name: 'App',
  components: {
    MainTabBar,
    TabBar,
    TabBarItem,
    NavBar
  }
}
</script>

<style>
@import url(assets/css/base.css);
</style>
