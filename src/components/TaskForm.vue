<template>
  <form @submit.prevent="onSubmit" class="space-y-3 bg-white p-4 rounded shadow">
    <div>
      <label class="block text-sm font-medium text-gray-700">Titel</label>
      <input v-model="local.title" class="mt-1 block w-full border p-2 rounded" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Beschreibung</label>
      <textarea v-model="local.description" class="mt-1 block w-full border p-2 rounded" rows="3"></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Deadline</label>
      <input v-model="local.deadline" type="datetime-local" class="mt-1 block w-full border p-2 rounded" />
    </div>
    <div class="flex space-x-2 justify-end">
      <button type="button" @click="$emit('cancel')" class="px-3 py-1 rounded bg-gray-200">Abbrechen</button>
      <button type="submit" class="px-3 py-1 rounded bg-blue-600 text-white">Speichern</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({ task: { type: Object, default: null } })
const emit = defineEmits(['save','cancel'])

const local = reactive({ title: '', description: '', deadline: '' })

if (props.task) {
  local.title = props.task.title || ''
  local.description = props.task.description || ''
  // convert ISO to datetime-local if present
  if (props.task.deadline) {
    const d = new Date(props.task.deadline)
    const tzOffset = d.getTimezoneOffset()
    const localIso = new Date(d.getTime() - tzOffset * 60000).toISOString().slice(0,16)
    local.deadline = localIso
  }
}

const onSubmit = () => {
  const out = {
    title: local.title,
    description: local.description,
    deadline: local.deadline ? new Date(local.deadline).toISOString() : null
  }
  emit('save', out)
}
</script>
