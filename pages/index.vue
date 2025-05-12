<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h1 class="text-3xl font-bold text-gray-100">📚 Book List</h1>
      <div class="w-full md:w-72">
        <input
          type="text"
          placeholder="Search books..."
          class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
    </div>

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
      <span>Loading books...</span>
    </div>

    <div v-else-if="error" class="text-red-400 text-lg p-4 bg-red-50 rounded-md border border-red-200">
      <h3 class="font-semibold text-lg">Something went wrong!</h3>
      <p>We encountered an issue while fetching the books. Please try again later.</p>
      <button
        class="mt-3 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        @click="retryFetchData"
      >
        Retry
      </button>
    </div>

    <div v-else-if="!items.length" class="text-gray-400">
      <p>No books available.</p>
      <p class="mt-2 text-sm text-gray-500">
        Perhaps you can try again later or check for updates.
      </p>
    </div>

    <div v-else class="flex flex-wrap justify-center gap-6">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="`/${item.id}`"
        class="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      >
        <div
          class="rounded overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 w-full flex flex-col"
        >
          <div class="relative">
            <img
              :src="`https://picsum.photos/seed/book-${item.id}/300/420`"
              alt="Book cover"
              class="w-full h-[260px] object-cover"
            >

            <div class="absolute top-2 left-2">
              <UBadge
                :color="item.availableStock > 0 ? 'success' : 'error'"
                size="sm"
              >
                {{ item.availableStock > 0 ? 'In Stock' : 'Out of Stock' }}
              </UBadge>
            </div>

            <div
              class="absolute top-2 right-2 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md"
            >
              ${{ item.price.toFixed(2) }}
            </div>
          </div>

          <div class="p-3 flex-1">
            <h2
              class="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate"
            >
              {{ item.title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
              {{ item.author }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBooksList } from '#imports'
import { useAsyncData } from '#app'

const { items, loading, error, retryFetchData, fetchData } = useBooksList()

useAsyncData('booksList', fetchData)
</script>


<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.group {
  flex-grow: 1;
}

.w-full {
  width: 100%;
}

@media (max-width: 640px) {
  .w-full {
    width: 100%;
  }
}

@media (min-width: 640px) {
  .sm\:w-1\/2 {
    width: 50%;
  }
}

@media (min-width: 768px) {
  .md\:w-1\/3 {
    width: 33.33%;
  }
}

@media (min-width: 1024px) {
  .lg\:w-1\/4 {
    width: 25%;
  }
}

@media (min-width: 1280px) {
  .xl\:w-1\/5 {
    width: 20%;
  }
}
</style>
