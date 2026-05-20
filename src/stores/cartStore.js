// 封装购物车列表

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1.定义state管理数据
  const cartList = ref([])
  // 2.定义action获取接口方法
  const addCart = async (goods) => {
    const {skuId, count} = goods
    if(isLogin.value) {
      // 登录之后做的操作
      await insertCartAPI({skuId, count})
      const res = await findNewCartListAPI()
      cartList.value = res.result
    } else {
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
  }

  // 单选框功能
  const singleCheck = (skuId, selected) => {
    // 通过传过来的skuId找到选中的那一项，将那一项的选中状态与页面渲染的选中状态匹配
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 删除购物车
  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }

  // 计算属性
  // 计算总数和总价
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count * c.price , 0))

  // 已选择数量和已选择数量的价格
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    allCheck,
    addCart,
    delCart,
    singleCheck
  }
},{
  persist: true,
})
