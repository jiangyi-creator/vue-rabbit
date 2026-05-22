import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  const start = (currentTime) => {
    // 先清除之前的定时器，防止重复调用泄漏
    if (timer) clearInterval(timer)
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
      // 倒计时到 0 自动停止
      if (time.value <= 0) {
        clearInterval(timer)
        timer = null
        time.value = 0
      }
    }, 1000)
  }

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}
