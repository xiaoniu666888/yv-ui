import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
const useCilckOutside = (
  element: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (element.value && e.target) {
      if (!element.value?.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })
}

export default useCilckOutside
