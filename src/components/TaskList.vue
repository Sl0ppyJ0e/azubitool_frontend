<template>
  <ul class="space-y-2">
    <li v-for="t in tasks" :key="t.id" class="bg-white p-3 rounded shadow flex justify-between items-start">
      <div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" v-model="t.completed" @change="$emit('toggle', t)" />
          <div>
            <div class="font-medium">{{ t.title }}</div>
            <div class="text-sm text-gray-500">{{ t.description }}</div>
            <div v-if="t.deadline" class="text-xs text-gray-400">Deadline: {{ formatDate(t.deadline) }}</div>
          </div>
        </div>
      </div>
      <div class="space-x-2 text-right">
        <button @click="$emit('edit', t)" class="text-sm text-blue-600">Bearbeiten</button>
        <button @click="$emit('delete', t)" class="text-sm text-red-600">Löschen</button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ tasks: { type: Array, default: () => [] } })

const formatDate = (iso) => {
  if (!iso) return ''
  try { return new Date(iso).toLocaleString() } catch { return iso }
}
</script>
