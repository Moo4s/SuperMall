<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />
    
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 1.常用
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }

    // 2.把Vuex中getters直接转成组件中的计算属性来用
    // `mapGetters`辅助函数:仅仅是将store中的getter映射到局部计算属性
    // 两种语法
    // 语法一
    // ...mapGetters(['cartLength', 'cartList'])
    // 语法二: 如果你想将一个getter属性另取一个名字,使用此对象形式
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style>
.cart {
  height: 100vh;
}

.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>