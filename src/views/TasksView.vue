<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Meine Aufgaben</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <TaskCard v-for="t in myTasks" :key="t.id" :task="t" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useAuth } from '../store/auth'
import { mock } from '../api/mock'
import TaskCard from '../components/TaskCard.vue'
const auth = useAuth()
const myTasks = computed(()=> mock.tasksByUser[auth.user?.id] || [])
</script>
