// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user';
import { useCartStore } from '@/stores/cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取后端返回数据的函数action
  const getUserInfo = async ({account, password}) => {
    const res = await loginAPI({account, password})
    userInfo.value = res.result
  }

  // 用户退出登录，清空用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 退出登录，清空用户购物车
    cartStore.clearCart()
  }

  // 3.以对象的格式把state和action return 出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  persist: true,
})
