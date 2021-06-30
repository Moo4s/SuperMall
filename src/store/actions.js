import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    // 1.判断商品是否已添加
    // 遍历方法
    // let oldProduct = null
    // for(let item in state.cartList) {
    //   if(item.iid == payload.iid) {
    //     oldProduct = item;
    //   }
    // }

    // find方法
    let oldProduct = context.state.cartList.find(function(item) {
      return item.iid === payload.iid
    })

    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }

    // indexOf方法,较麻烦
    // let index = state.cartList.indexOf(payload)
    // if(index !== -1) {
    //   let oldProduct = state.cartList[index]
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
  }
}