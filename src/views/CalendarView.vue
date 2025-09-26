<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Kalender (Mock)</h1>
    <ul class="bg-white rounded shadow divide-y">
      <li v-for="e in events" :key="e.id" class="p-3">
        <div class="font-medium">{{ e.title }}</div>
        <div class="text-sm text-gray-500">{{ e.start }} → {{ e.end }}</div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { mock } from '../api/mock'
const events = ref([])
onMounted(()=>{ events.value = mock.events })
</script>
