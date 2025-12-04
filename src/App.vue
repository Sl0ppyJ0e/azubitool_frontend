<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <template v-if="auth.isAuthenticated">
      <NavBar />

      <div class="mx-auto max-w-screen-2xl px-4">
        <div class="flex pt-4">
          <SideBar />
          <main class="flex-1 pl-4">
            <router-view />
          </main>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'

import { useAuth } from './store/auth'

const auth = useAuth()
</script>
