import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref<string | null>(null)
  const type = ref<'success' | 'error' | 'info' | 'warning' | null>(null)
  const visible = ref<boolean>(false)

  let timeoutHandle: ReturnType<typeof setTimeout> | null = null

  const showToast = (
    msg: string,
    toastType: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 5000
  ) => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
      timeoutHandle = null
    }

    message.value = msg
    type.value = toastType
    visible.value = true

    timeoutHandle = setTimeout(hideToast, duration)
  }

  const hideToast = () => {
    visible.value = false
    message.value = null
    type.value = null
    timeoutHandle = null
  }

  return {
    message,
    type,
    visible,
    showToast,
    hideToast,
  }
})
