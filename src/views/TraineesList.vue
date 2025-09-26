<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Azubis</h1>
    <ul class="bg-white rounded shadow divide-y">
      <li v-for="t in trainees" :key="t.id" class="p-3 hover:bg-gray-50 cursor-pointer"
          @click="$router.push({name:'trainee-detail', params:{id:t.id}})">
        <div class="font-medium">{{ t.full_name }}</div>
        <div class="text-sm text-gray-500">{{ t.email }}</div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { mock } from '../api/mock'
const trainees = ref([])
onMounted(()=>{ trainees.value = mock.trainees })
</script>
