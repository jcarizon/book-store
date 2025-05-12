<template>
  <footer class="bg-gray-800 text-gray-300 py-6 mt-10">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      
      <div class="flex items-center space-x-4 mb-4 md:mb-0">
        <span class="text-2xl font-semibold text-gray-100">Bookstore</span>
      </div>
      
      <div class="flex space-x-6 mb-4 md:mb-0">
        <a href="/" class="text-gray-400 hover:text-gray-100 transition">Home</a>
        <a href="/" class="text-gray-400 hover:text-gray-100 transition">Books</a>
        <a href="/" class="text-gray-400 hover:text-gray-100 transition">About</a>
      </div>

      <div class="flex space-x-6">
        <a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-gray-100 transition">
          <i class="fab fa-facebook-f"/>
        </a>
        <a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-gray-100 transition">
          <i class="fab fa-twitter"/>
        </a>
        <a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-gray-100 transition">
          <i class="fab fa-instagram"/>
        </a>
        <a href="https://linkedin.com" target="_blank" class="text-gray-400 hover:text-gray-100 transition">
          <i class="fab fa-linkedin-in"/>
        </a>
      </div>
    </div>

    <div class="text-center text-gray-500 mt-6">
      <p>&copy; 2025 Bookstore. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

footer {
  background-color: #2d3748;
}

footer a:hover {
  color: #edf2f7;
}

footer .text-gray-100 {
  color: #edf2f7;
}

footer .text-gray-400 {
  color: #cbd5e0;
}

footer .text-gray-500 {
  color: #a0aec0;
}

footer .hover\:text-gray-100:hover {
  color: #edf2f7;
}

footer .transition {
  transition: color 0.3s ease;
}
</style>
