// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user';

export const useUserStore = defineStore('user', () => {
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取后端返回数据的函数action
  const getUserInfo = async ({account, password}) => {
    const res = await loginAPI({account, password})
    userInfo.value = res.result
  }

  // 3.以对象的格式把state和action return 出去
  return {
    userInfo,
    getUserInfo
  }
})
