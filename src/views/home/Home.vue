<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <h2>主页</h2>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  name: "Home",
  components: {
    NavBar,
  },
};
</script>

<style>
.home-nav {
  background-color: #ff8198;
  color: #FFF;
}
</style>