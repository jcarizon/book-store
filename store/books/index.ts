/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { useHandleFetch } from '~/composables/useHandleFetch'
import { useToastStore } from '../toast'

export const useItemsStore = defineStore('books', {
  state: () => ({
    items: [] as Array<any>,
    selectedItem: null,
    loading: false,
    error: null as string | null,
    message: null as string | null
  }),

  actions: {
    async fetchItems() {
      const toastStore = useToastStore()
      const config = useRuntimeConfig()
      const { data, error, loading } = await useHandleFetch(`${config.public.apiBase}/books`)

      this.loading = loading.value
      this.error = this.handleError(error.value)

      if (data.value?.books) {
        this.items = data.value.books
        this.message = "Successfully fetched books."
      } else {
        toastStore.showToast('Failed to fetch books.', 'error', 1000)
      }
    },

    async getItemDetail(id: number) {
      const toastStore = useToastStore()
      const config = useRuntimeConfig()
      const { data, error, loading } = await useHandleFetch(`${config.public.apiBase}/books/${id}`)

      this.loading = loading.value
      this.error = this.handleError(error.value)

      if (data.value) {
        this.selectedItem = data.value
        this.message = "Successfully fetched book details."
        toastStore.showToast('Book details fetched successfully!', 'success', 1000)
      } else {
        toastStore.showToast('Failed to fetch book details.', 'error', 1000)
      }
    },

    async purchaseItem(id: number) {
      const toastStore = useToastStore()
      const config = useRuntimeConfig()
      const { data, error, loading } = await useHandleFetch(`${config.public.apiBase}/books/${id}/purchase`, {
        method: 'POST'
      })

      this.loading = loading.value
      this.error = this.handleError(error.value)

      if (data.value) {
        const purchasedItem = this.items.find(item => item.id === id)
        if (purchasedItem) {
          purchasedItem.availableStock = purchasedItem.availableStock > 0 ? purchasedItem.availableStock - 1 : 0
          this.message = "Successfully purchased book."
          toastStore.showToast('Book purchased successfully!', 'success', 1000)
        }
      } else {
        toastStore.showToast('Failed to purchase the book.', 'error', 1000)
      }
    },

    async updateItem(id: number, updatedFields: any) {
      const toastStore = useToastStore()
      const config = useRuntimeConfig()
      const { data, error, loading } = await useHandleFetch(`${config.public.apiBase}/books/${id}`, {
        method: 'PUT',
        body: updatedFields
      })

      this.loading = loading.value
      this.error = this.handleError(error.value)

      if (data.value) {
        const index = this.items.findIndex(i => i.id === id)
        if (index !== -1) this.items[index] = data.value
        toastStore.showToast('Book information updated successfully!', 'success', 1000)
      } else {
        toastStore.showToast('Failed to update the book.', 'error', 1000)
      }
    },

    async deleteItem(id: number) {
      const toastStore = useToastStore()
      const config = useRuntimeConfig()
      const { error, loading } = await useHandleFetch(`${config.public.apiBase}/books/${id}`, {
        method: 'DELETE'
      })

      this.loading = loading.value
      this.error = this.handleError(error.value)

      if (!error.value) {
        this.items = this.items.filter(i => i.id !== id)
        toastStore.showToast('Book deleted successfully!', 'success', 1000)
      } else {
        toastStore.showToast('Failed to delete the book.', 'error', 1000)
      }
    },

    handleError(error: any): string | null {
      if (!error) return null

      if (error.response && error.response.status === 500) {
        return 'Internal server error. Please try again later.'
      }

      if (error.response && error.response.status === 404) {
        return 'Resource not found. Please check the details and try again.'
      }
      
      if (error.message) {
        return error.message
      }
      
      return 'Something went wrong. Please try again later.'
    },
    
    setError(message: string | null) {
      this.error = message
    },
    
    setMessage(message: string | null) {
      this.message = message
    },
  },

  getters: {
    getAllItems: (state) => state.items,
    getSelectedItem: (state) => state.selectedItem,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getMessage: (state) => state.message,
    hasNoItems: (state) => state.items.length === 0
  }
})
