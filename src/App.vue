<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <NavBar />

    <div class="mx-auto max-w-screen-2xl px-4">
      <div class="flex pt-4">
        <SideBar />
        <main class="flex-1 pl-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
</script>
