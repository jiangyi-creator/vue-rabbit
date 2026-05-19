// 封装购物车列表

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  // 1.定义state管理数据
  const cartList = ref([])
  // 2.定义action获取接口方法
  const addCart = (goods) => {
    // 加入购物车
    // 添加过 count + 1
    // 未添加过 -直接push
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if(item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }

  return {
    cartList,
    addCart
  }
},{
  persist: true,
})
