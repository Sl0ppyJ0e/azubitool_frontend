<template>
  <header class="bg-white border-b relative">
    <div class="mx-auto max-w-screen-2xl px-4 h-14 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <AcademicCapIcon class="w-6 h-6 text-blue-600" />
        <span class="font-semibold">AusbildungsPro</span>
      </div>

      <div class="flex items-center gap-4">
        <!-- Glocke + Dropdown -->
        <div class="relative" @mouseenter="showNotif = true" @mouseleave="showNotif = false">
          <button class="relative">
            <BellIcon class="w-6 h-6 text-gray-500 hover:text-gray-700" />
            <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div v-if="showNotif" class="absolute right-24 mt-2 w-72 bg-white border shadow-lg rounded-lg p-2 z-20">
            <div v-for="n in notifications" :key="n.id" class="px-3 py-2 hover:bg-gray-50 rounded">
              <div class="text-sm">{{ n.title }}</div>
              <div class="text-xs text-gray-500">{{ n.time }}</div>
            </div>
          </div>
        </div>

        <!-- Avatar + Name + Menü -->
        <div class="relative" @mouseenter="showUser = true" @mouseleave="showUser = false">
          <button class="flex items-center gap-2" @click="gotoProfile">
            <img
              class="w-8 h-8 rounded-full ring-1 ring-gray-200"
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=max"
              alt="Avatar" />
            <span class="text-sm text-gray-700 hidden sm:block cursor-pointer">Max Mustermann</span>
          </button>
          <div v-if="showUser" class="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-lg py-2 z-20">
            <button class="w-full text-left px-4 py-2 hover:bg-gray-50" @click="gotoProfile">Mein Profil</button>
            <button class="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600" @click="doLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AcademicCapIcon, BellIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '../stores/auth'

const showNotif = ref(false)
const showUser  = ref(false)
const router = useRouter()
const auth = useAuth()

const notifications = ref([
  { id:1, title:'Aufgabe fällig: Wochenbericht', time:'Heute, 12:00' },
  { id:2, title:'Neues Feedback vom Ausbilder',  time:'Gestern' },
])

function gotoProfile(){
  showUser.value = false
  router.push({ name: 'profile' })
}
function doLogout(){
  showUser.value = false
  auth.logout()
  router.push({ name: 'login' })
}
</script>
