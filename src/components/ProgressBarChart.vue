<template>
  <div class="bg-white p-4 rounded shadow">
    <div class="flex items-center justify-between mb-3">
      <div class="font-medium">Fortschritt Übersicht</div>
      <div class="text-sm text-gray-500">{{ total }} Aufgaben</div>
    </div>
    <div v-for="(v, k) in buckets" :key="k" class="mb-2">
      <div class="flex justify-between text-xs mb-1"><div>{{ k }}</div><div>{{ v.count }}</div></div>
      <div class="w-full bg-gray-100 h-3 rounded overflow-hidden">
        <div :style="{ width: (v.count/total*100)+'%' }" class="h-3 bg-green-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ tasks: { type: Array, default: () => [] } })

const total = computed(() => props.tasks.length || 1)

const buckets = computed(() => {
  const done = props.tasks.filter(t => t.completed).length
  const open = props.tasks.filter(t => !t.completed).length
  return { 'Abgeschlossen': { count: done }, 'Offen': { count: open } }
})
</script>
