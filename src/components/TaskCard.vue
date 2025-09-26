<template>
  <div class="p-4 bg-white rounded shadow">
    <div class="font-medium">{{ task.title }}</div>
    <div class="text-sm text-gray-500">Status: {{ task.status }} • Progress: {{ task.progress }}%</div>
  </div>
</template>


<script setup>
defineProps({ task: { type: Object, required: true } })
</script>
