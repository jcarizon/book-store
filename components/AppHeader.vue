<template>
  <header class="w-full bg-white dark:bg-gray-900 shadow-sm p-[20px] flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-lg font-semibold text-gray-800 dark:text-white">BookStore</span>
    </div>

    <nav class="hidden md:flex gap-4 text-sm text-gray-600 dark:text-gray-300">
      <NuxtLink to="/" class="hover:text-primary font-medium">Home</NuxtLink>
      <NuxtLink to="/" class="hover:text-primary font-medium">Books</NuxtLink>
      <NuxtLink to="/" class="hover:text-primary font-medium">About</NuxtLink>
    </nav>

    <div class="flex items-center gap-3">
      <UButton color="primary" variant="solid" size="sm">Login</UButton>
      <UAvatar size="sm" src="https://i.pravatar.cc/40" alt="User Avatar" />
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
