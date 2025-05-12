<template>
  <div
    v-if="isMounted && toastStore.visible"
    class="fixed bottom-4 right-4 p-4 rounded-md"
    :class="{
      'bg-green-500 text-white': toastStore.type === 'success',
      'bg-red-500 text-white': toastStore.type === 'error',
      'bg-yellow-500 text-white': toastStore.type === 'warning',
      'bg-blue-500 text-white': toastStore.type === 'info',
      'bg-opacity-50': true,
    }"
  >
    <p>{{ toastStore.message }}</p>
  </div>
</template>

<script setup>
import { useToastStore } from '~/store/toast'
import { onMounted, ref } from 'vue'

const toastStore = useToastStore()

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped></style>
