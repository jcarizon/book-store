<template>
  <div class="max-w-6xl mx-auto px-6 py-10 bg-gray-900 text-gray-100">
    <h1 class="text-4xl font-bold mb-8">📘 Book Detail</h1>

    <div v-if="loading" class="text-lg text-gray-400 flex items-center space-x-2">
      <svg
        class="animate-spin h-5 w-5 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 1 1 8 8A8 8 0 0 1 4 12z"
        />
      </svg>
      <span>Loading book...</span>
    </div>

    <div v-else-if="error" class="text-red-400 text-lg p-4 bg-red-800 rounded-md border border-red-600">
      <h3 class="font-semibold text-lg">Something went wrong!</h3>
      <p>{{ error }}</p>
      <button
        class="mt-3 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        @click="retryFetchData"
      >
        Retry
      </button>
    </div>

    <div
      v-else-if="purchaseSuccess"
      class="text-green-800 text-lg p-4 bg-green-100 rounded-md border border-green-400"
    >
      <h3 class="font-semibold text-lg">Success!</h3>
      <p>{{ message }}</p>
      <button
        class="mt-3 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        @click="retryFetchData"
      >
        Go Back
      </button>
    </div>

    <div v-else-if="!selectedItem?.book" class="text-lg text-gray-400">
      No book found.
    </div>

    <div v-else class="flex flex-col md:flex-row gap-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8">
      <div class="md:w-1/3 flex justify-center">
        <img
          :src="`https://picsum.photos/seed/book-${selectedItem.book.id}/400/550`"
          alt="Book cover"
          class="rounded-xl shadow-md object-cover w-full max-w-xs"
        >
      </div>

      <div class="md:w-2/3 flex flex-col justify-between">
        <div>
          <h2 class="text-3xl font-semibold text-gray-100 mb-3">{{ selectedItem?.book.title }}</h2>
          <ul class="space-y-1 text-gray-300 text-lg">
            <li><strong>👤 Author:</strong> {{ selectedItem.book.author }}</li>
            <li><strong>🔢 ISBN:</strong> {{ selectedItem.book.isbn }}</li>
            <li><strong>📚 Genre:</strong> {{ genre }}</li>
            <li><strong>📄 Pages:</strong> {{ pages }} pages</li>
            <li><strong>📅 Published:</strong> {{ publishedYear }}</li>
            <li>
              <strong>📦 Stock:</strong>
              <UBadge :color="selectedItem.book.availableStock > 0 ? 'success' : 'error'" class="ml-2">
                {{ selectedItem.book.availableStock > 0 ? 'In Stock' : 'Out of Stock' }}
              </UBadge>
            </li>
          </ul>

          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-200 mb-2">📖 Description</h3>
            <p class="text-gray-400 leading-relaxed text-md">{{ description }}</p>
          </div>
        </div>

        <div class="mt-8 flex justify-center md:justify-start">
          <UButton
            v-if="selectedItem.book.availableStock > 0 && !loading"
            color="primary"
            size="lg"
            class="w-full md:w-auto"
            :loading="isPurchasing"
            @click="handlePurchase"
          >
            Purchase Now — ${{ selectedItem.book.price.toFixed(2) }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookDetail } from '~/composables/useBookDetails'

const {
  id,
  selectedItem,
  loading,
  error,
  message,  
  isPurchasing,
  purchaseSuccess,
  handlePurchase,
  retryFetchData,
  getBookDetail,
  genre,
  description,
  pages,
  publishedYear
} = useBookDetail()

await useAsyncData(`book-${id}`, getBookDetail)
</script>

<style scoped>
.bg-gray-900 {
  background-color: #1a202c;
}

.text-gray-100 {
  color: #f7fafc;
}

.text-gray-400 {
  color: #a0aec0;
}

.text-gray-300 {
  color: #e2e8f0;
}

.bg-gray-800 {
  background-color: #2d3748;
}

.bg-red-800 {
  background-color: #c53030;
}

.bg-red-50 {
  background-color: #fff5f5;
}

.text-red-400 {
  color: #fc8181;
}

.text-blue-400 {
  color: #63b3ed;
}

.border-gray-700 {
  border-color: #4a5568;
}

.hover\:bg-red-600:hover {
  background-color: #c53030;
}

.hover\:bg-red-600:hover {
  background-color: #e53e3e;
}

@media (min-width: 768px) {
  .md\:flex-row {
    flex-direction: row;
  }

  .md\:w-1\/3 {
    width: 33.33%;
  }

  .md\:w-2\/3 {
    width: 66.66%;
  }
}

.p-8 {
  padding: 2rem;
}
</style>
