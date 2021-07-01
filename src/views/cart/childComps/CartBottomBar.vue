<template>
  <div class="cart-bottom">
    <!-- 全选 -->
    <div class="cart-all-check">
      <check-button 
        :is-checked="isSelectAll" 
        class="cart-check" 
        @click.native="checkAll" 
      />
      <span>全选</span>
    </div>

    <!-- 合计金额 -->
    <div class="cart-total-price">合计: {{ totalPrice }}</div>

    <!-- 去结算 -->
    <div class="cart-calculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: { CheckButton },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((total, item) => {
            return total + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1.filter方法
      return !this.cartList.filter((item) => !item.checked).length;
      // 2.find
      // console.log(this.cartList.find(item => !item.checked));
      // return !this.cartList.find(item => !item.checked)
      // 3.普通遍历
    }
  },
  methods: {
      checkAll() {
        if (this.isSelectAll) { // 全部选中
          return this.cartList.forEach(item => item.checked = false);
        } else { //部分或全部不选中
          return this.cartList.forEach(item => item.checked = true);
        }
      }
    }
};
</script>

<style>
.cart-bottom {
  /* position: relative; */
  display: flex;
  background-color: rgb(233, 233, 233);
  height: 40px;
  line-height: 40px;
}

.cart-all-check {
  display: flex;
  align-items: center;
  width: 60px;
  margin: 0 20px 0 10px;
}

.cart-check {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.cart-total-price {
  flex: 1;
  text-align: left;
}

.cart-calculate {
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>