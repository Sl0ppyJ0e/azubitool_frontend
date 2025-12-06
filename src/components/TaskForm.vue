<template>
  <form @submit.prevent="onSubmit" class="space-y-3">
    <!-- Titel -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Titel
      </label>
      <input
        v-model="local.title"
        type="text"
        class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
    </div>

    <!-- Beschreibung -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Beschreibung
      </label>
      <textarea
        v-model="local.description"
        rows="3"
        class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
      ></textarea>
    </div>

    <!-- Priorität -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Priorität
      </label>
      <div class="relative">
        <select
          v-model="local.priority"
          class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-9
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="Hoch">Hoch</option>
          <option value="Mittel">Mittel</option>
          <option value="Niedrig">Niedrig</option>
        </select>
        <ExclamationTriangleIcon
          class="w-4 h-4 text-yellow-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>

    <!-- Deadline -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Deadline
      </label>
      <div class="relative">
        <input
          v-model="local.deadlineLocal"
          type="datetime-local"
          class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-9
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <CalendarDaysIcon
          class="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>

    <!-- Buttons -->
    <div class="pt-2 flex justify-end space-x-2">
      <button
        type="button"
        class="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        @click="$emit('cancel')"
      >
        Abbrechen
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700
               disabled:opacity-60"
        :disabled="!local.title.trim()"
      >
        Speichern
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import {
  ExclamationTriangleIcon,
  CalendarDaysIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['save', 'cancel'])

const local = reactive({
  title: '',
  description: '',
  priority: 'Mittel',
  // datetime-local Format (YYYY-MM-DDTHH:mm)
  deadlineLocal: '',
})

const fillFromTask = (t) => {
  if (!t) {
    local.title = ''
    local.description = ''
    local.priority = 'Mittel'
    local.deadlineLocal = ''
    return
  }

  local.title = t.title || ''
  local.description = t.description || ''
  local.priority = t.priority || 'Mittel'

  if (t.deadline) {
    const d = new Date(t.deadline)
    const offset = d.getTimezoneOffset()
    const localIso = new Date(d.getTime() - offset * 60000)
      .toISOString()
      .slice(0, 16)
    local.deadlineLocal = localIso
  } else {
    local.deadlineLocal = ''
  }
}

// Initial befüllen
fillFromTask(props.task)

// Bei Änderungen der übergebenen Task neu befüllen (z.B. beim Wechsel der Edit-Aufgabe)
watch(
  () => props.task,
  (val) => fillFromTask(val),
  { deep: true }
)

const onSubmit = () => {
  const payload = {
    title: local.title.trim(),
    description: local.description.trim(),
    priority: local.priority,
    deadline: local.deadlineLocal
      ? new Date(local.deadlineLocal).toISOString()
      : null,
  }
  emit('save', payload)
}
</script>
