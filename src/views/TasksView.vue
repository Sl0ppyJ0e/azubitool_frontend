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

const fetchTasks = async () => {
  try {
    const userId = globalStore.userId ?? 1
    const res = await http.get('/tasks', { params: { user_id: userId } })
    tasks.value = res.data || []
  } catch (err) {
    console.error('Failed to fetch tasks', err)
    tasks.value = []
  }
}

onMounted(()=> fetchTasks())

const createTask = async (payload) => {
  try {
    const userId = globalStore.userId ?? 1
    const createPayload = {
      user_id: userId,
      title: payload.title,
      description: payload.description,
      deadline: payload.deadline || null,
      completed: false,
    }
    const res = await http.post('/tasks', createPayload)
    tasks.value.unshift(res.data)
    showForm.value = false
  } catch (err) {
    console.error('Failed to create task', err)
    alert('Fehler beim Erstellen der Aufgabe')
  }
}

const onEdit = (t) => { editing.value = { ...t } }
const cancelEdit = () => { editing.value = null }

const saveEdit = async (payload) => {
  try {
    const taskId = editing.value.id
    const updatePayload = {
      title: payload.title,
      description: payload.description,
      deadline: payload.deadline || null,
      completed: payload.completed ?? false,
    }
    const res = await http.put(`/tasks/${taskId}`, updatePayload)
    const idx = tasks.value.findIndex(x => x.id === taskId)
    if (idx !== -1) tasks.value[idx] = res.data
    editing.value = null
  } catch (err) {
    console.error('saveEdit failed', err)
    alert('Fehler beim Speichern der Aufgabe')
  }
}

const onDelete = async (t) => {
  try {
    await http.delete(`/tasks/${t.id}`)
    tasks.value = tasks.value.filter(x => x.id !== t.id)
  } catch (err) {
    console.error('Failed to delete task', err)
    alert('Fehler beim Löschen der Aufgabe')
  }
}

const onToggle = async (t) => {
  try {
    const updatePayload = { completed: t.completed }
    const res = await http.put(`/tasks/${t.id}`, updatePayload)
    const idx = tasks.value.findIndex(x => x.id === t.id)
    if (idx !== -1) tasks.value[idx] = res.data
  } catch (err) {
    console.error('Failed to toggle task', err)
    alert('Fehler beim Aktualisieren des Aufgabestatus')
  }
}

// Timer hooks (optional integration)
const onTimerStart = () => { /* could mark current task etc. */ }
const onTimerStop = () => { }

</script>
