<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Aufgaben Dashboard</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-1 space-y-4">
        <Timer @start="onTimerStart" @stop="onTimerStop" />
        <ProgressBarChart :tasks="tasks" />
        <div class="bg-white p-4 rounded shadow">
          <div class="flex justify-between items-center mb-2">
            <div class="font-medium">Neue Aufgabe</div>
            <button @click="showForm = !showForm" class="text-sm text-blue-600">{{ showForm ? 'Schliessen' : 'Neu' }}</button>
          </div>
          <div v-if="showForm">
            <TaskForm @save="createTask" @cancel="showForm=false" />
          </div>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white p-4 rounded shadow mb-4">
          <div class="flex justify-between items-center">
            <div class="font-medium">Aufgaben Liste</div>
            <div class="text-sm text-gray-500">Gesamt: {{ tasks.length }}</div>
          </div>
        </div>

        <TaskList :tasks="tasks" @edit="onEdit" @delete="onDelete" @toggle="onToggle" />

        <div v-if="editing" class="mt-4">
          <div class="bg-white p-4 rounded shadow">
            <div class="font-medium mb-2">Aufgabe bearbeiten</div>
            <TaskForm :task="editing" @save="saveEdit" @cancel="cancelEdit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '../api/http'
import { useGlobalStore } from '../store/globalStore'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import Timer from '../components/Timer.vue'
import ProgressBarChart from '../components/ProgressBarChart.vue'

const globalStore = useGlobalStore()

const tasks = ref([])
const showForm = ref(false)
const editing = ref(null)

const STORAGE_KEY = 'azubi_tasks_v1'

const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    tasks.value = raw ? JSON.parse(raw) : []
  } catch (e) { tasks.value = [] }
}

const saveTasks = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
}

onMounted(()=> loadTasks())

const createTask = async (payload) => {
  const id = Date.now()
  const t = { id, title: payload.title, description: payload.description, deadline: payload.deadline, completed: false }
  // if deadline provided, create calendar event
  if (t.deadline) {
    try {
      const userId = globalStore.userId ?? 1
      const eventPayload = {
        user_id: userId,
        title: `Deadline: ${t.title}`,
        description: t.description || '',
        start: t.deadline,
        end: new Date(new Date(t.deadline).getTime() + 60*60*1000).toISOString(),
        created: new Date().toISOString()
      }
      const res = await http.post('/calendar', eventPayload)
      t.calendarEventId = res.data.id
  } catch (err) { console.error('calendar create failed', err); alert('Fehler: Kalendereintrag konnte nicht erstellt werden (siehe Konsole).') }
  }
  tasks.value.unshift(t)
  saveTasks()
  showForm.value = false
}

const onEdit = (t) => { editing.value = { ...t } }
const cancelEdit = () => { editing.value = null }

const saveEdit = async (payload) => {
  try {
    const taskId = editing.value.id
    // update calendar event if exists or create if new deadline
    if (editing.value.calendarEventId) {
      // if deadline removed, delete calendar event
      if (!payload.deadline) {
        try { await http.delete(`/calendar/${editing.value.calendarEventId}`, { params: { user_id: globalStore.userId ?? 1 } }) } catch(e){ console.error('delete calendar failed', e) }
        delete editing.value.calendarEventId
      } else {
        // update event
        const eventPayload = {
          user_id: globalStore.userId ?? 1,
          title: `Deadline: ${payload.title}`,
          description: payload.description || '',
          start: payload.deadline,
          end: new Date(new Date(payload.deadline).getTime() + 60*60*1000).toISOString()
        }
        try { await http.put(`/calendar/${editing.value.calendarEventId}`, eventPayload) } catch(e){ console.error('calendar update failed', e) }
      }
    } else if (payload.deadline) {
      // create calendar event for new deadline
      try {
        const eventPayload = {
          user_id: globalStore.userId ?? 1,
          title: `Deadline: ${payload.title}`,
          description: payload.description || '',
          start: payload.deadline,
          end: new Date(new Date(payload.deadline).getTime() + 60*60*1000).toISOString(),
          created: new Date().toISOString()
        }
        const res = await http.post('/calendar', eventPayload)
        editing.value.calendarEventId = res.data.id
      } catch(e){ console.error('calendar create failed', e) }
    }

    // apply changes locally
    const idx = tasks.value.findIndex(x => x.id === taskId)
    if (idx !== -1) {
      tasks.value[idx] = { ...tasks.value[idx], ...payload, id: taskId, calendarEventId: editing.value.calendarEventId }
    }
    saveTasks()
    editing.value = null
  } catch (err) {
    console.error('saveEdit failed', err)
  }
}

const onDelete = async (t) => {
  if (t.calendarEventId) {
    try { await http.delete(`/calendar/${t.calendarEventId}`, { params: { user_id: globalStore.userId ?? 1 } }) } catch(e){ console.error('calendar delete failed', e) }
  }
  tasks.value = tasks.value.filter(x => x.id !== t.id)
  saveTasks()
}

const onToggle = (t) => {
  const idx = tasks.value.findIndex(x => x.id === t.id)
  if (idx !== -1) { tasks.value[idx].completed = t.completed; saveTasks() }
}

// Timer hooks (optional integration)
const onTimerStart = () => { /* could mark current task etc. */ }
const onTimerStop = () => { }

</script>
