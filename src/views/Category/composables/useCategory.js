// 封装分类数据业务逻辑

import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';


export function useCategory() {
  // 获取分类数据
  const categoryData = ref({})
  const route = useRoute()

  const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id)
    categoryData.value = res.result
  }

  onMounted(() => getCategory())
  watch(() => route.params.id, () => getCategory())

  return {
    categoryData
  }

}
