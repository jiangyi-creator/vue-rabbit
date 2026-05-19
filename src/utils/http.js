// axios基础封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from "@/router";
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1.从pinia中获取token数据
  const useStore = useUserStore()
  const token = useStore.userInfo.token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 2.按照后端要求拼接字符串
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const useStore = useUserStore()
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })

  // 401token失效处理
  // 1.清除本地用户数据
  // 2.跳转到登录页面
  if(e.response.status === 401) {
    useStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance
