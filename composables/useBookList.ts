import { storeToRefs } from 'pinia'
import { useItemsStore } from '~/store/books'

export function useBooksList() {
  const store = useItemsStore()
  const { items, loading, error } = storeToRefs(store)

  // Use async function to fetch data
  const fetchData = async () => {
    try {
      await store.fetchItems()
      return items.value  // Ensure the items are returned after fetch is complete
    } catch (e) {
      console.error('Error fetching books:', e)
      store.setError('An error occurred while fetching the books. Please try again later.')
      return []  // Return an empty array in case of an error
    }
  }

  const retryFetchData = async () => {
    store.setError(null)
    await fetchData()
  }

  return {
    items,
    loading,
    error,
    retryFetchData,
    fetchData
  }
}
