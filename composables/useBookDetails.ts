import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useItemsStore } from '~/store/books'
import type { Book } from '~/types/Book'

export function useBookDetail() {
  const route = useRoute()
  const id = Number(route.params.id)
  const isPurchasing = ref(false)
  const purchaseSuccess = ref(false)

  const store = useItemsStore()
  const { selectedItem, loading, error, message } = storeToRefs(store) as {
    selectedItem: Ref<{ book: Book } | null>
    loading: Ref<boolean>
    error: Ref<string | null>
    message: Ref<string | null>
  }

  const handlePurchase = async () => {
    if (!id || isPurchasing.value) return

    isPurchasing.value = true
    await store.purchaseItem(id)

    if (!store.error) {
      await store.getItemDetail(id)
      store.setError(null)
      store.setMessage('Purchase Successful')
      purchaseSuccess.value = true
    } else {
      store.setError(store.error || 'Something went wrong.')
    }

    isPurchasing.value = false
  }

  const retryFetchData = async () => {
    store.setError(null)
    purchaseSuccess.value = false
    await store.getItemDetail(id)
  }

  const genres = ['Fiction', 'Mystery', 'Sci-Fi', 'Non-fiction', 'Biography', 'Fantasy', 'Historical', 'Thriller']
  const descriptions = [
    'A captivating journey through time, friendship, and resilience that follows a group of unlikely companions as they navigate the echoes of history, confront painful memories, and discover the unbreakable bonds that shape their destinies.',
    'An exploration of human nature wrapped in a thrilling mystery that delves deep into the shadows of a quiet town where secrets simmer beneath the surface, challenging perceptions of truth, morality, and trust.',
    'A heartwarming tale of love, loss, and self-discovery that spans generations and continents, illustrating how one woman’s courage to face her past unlocks a future filled with healing, hope, and second chances.',
    'An adrenaline-fueled adventure across distant galaxies where a rogue pilot, a curious scientist, and an exiled alien prince must unite to stop an ancient threat that could consume the entire universe.',
    'A mind-bending story that challenges reality and reason as a brilliant mathematician becomes entangled in a surreal conspiracy that blurs the line between dreams and memory, forcing her to question everything she believes to be true.',
    'An intimate portrait of a life lived against the odds, following the emotional and inspiring journey of a young artist as he overcomes poverty, prejudice, and personal tragedy to find his voice and leave an indelible mark on the world.',
    'A richly imagined world filled with magic and danger where kingdoms teeter on the brink of war, ancient prophecies awaken, and a reluctant heroine must master forbidden powers to save her people and rewrite the fate of her realm.',
    'A dark and suspenseful psychological thriller that unravels the terrifying descent of a brilliant criminal profiler whose pursuit of a cunning serial killer leads him to the darkest corners of his own mind — where the real horror may lie.'
  ]

  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  return {
    id,
    selectedItem,
    loading,
    error,
    message,
    isPurchasing,
    purchaseSuccess,
    handlePurchase,
    retryFetchData,
    getBookDetail: async () => {
      await store.getItemDetail(id)
      return store.selectedItem
    },
    genre: getRandom(genres),
    description: getRandom(descriptions),
    pages: Math.floor(Math.random() * 300 + 150),
    publishedYear: Math.floor(Math.random() * 21) + 2003
  }
}
