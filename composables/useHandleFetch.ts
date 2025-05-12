/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'

export async function useHandleFetch(url: string, options: any = {}) {
  const loading = ref(true)
  const error = ref<string | null>(null)
  const data = ref<any>(null)

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  try {
    const res = await useFetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      },
      // credentials: 'include'
    })

    if (res.error.value) throw res.error.value
    data.value = res.data.value
  } catch (err: any) {
    error.value = err.message || 'Unexpected error'
  } finally {
    loading.value = false
  }

  return { data, error, loading }
}
