<template>
  <div class="p-8 space-y-6">
    <!-- Header -->
    <header class="mb-2">
      <h1 class="text-2xl font-bold text-gray-900">Aufgaben Dashboard</h1>
      <p class="text-gray-600">Verwalte deine Aufgaben und tracke deine Zeit</p>
    </header>

    <!-- Obere 3 Karten -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <!-- TIMER CARD -->
      <section
        id="timer-card"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-900">Timer</h3>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ClockIcon class="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div class="text-center mb-4">
          <div class="text-4xl font-bold text-gray-900 mb-3 font-mono">
            {{ formattedTime }}
          </div>
          <div class="px-3 py-2 bg-gray-50 rounded-lg">
            <p class="text-xs text-gray-500 mb-1">
              {{ timerStatusLabel }}
            </p>
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ timerTaskLabel }}
            </p>
          </div>
        </div>

        <div class="mt-auto flex space-x-2">
          <button
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
            :class="[
              'text-white',
              tasks.length === 0 || timerRunning
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            ]"
            :disabled="tasks.length === 0 || timerRunning"
            @click="startTimer"
          >
            <PlayIcon class="w-4 h-4 mr-2" />
            Start
          </button>

          <button
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
            :class="[
              'text-white',
              !timerRunning ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
            ]"
            :disabled="!timerRunning"
            @click="stopTimer"
          >
            <PauseIcon class="w-4 h-4 mr-2" />
            Stopp
          </button>

          <button
            class="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
            @click="resetTimer"
          >
            <ArrowPathIcon class="w-4 h-4" />
          </button>
        </div>
      </section>

      <!-- PROGRESS CARD -->
      <section
        id="progress-card"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-900">Fortschrittsübersicht</h3>
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <ChartPieIcon class="w-5 h-5 text-purple-600" />
          </div>
        </div>

        <div class="space-y-5">
          <!-- Abgeschlossen -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Abgeschlossen</span>
              <span class="text-sm font-semibold text-green-600">
                {{ completedTasks }} Aufgaben
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="bg-green-600 h-3 rounded-full transition-all duration-300"
                :style="{ width: completedPercent + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ completedPercent }}% der Gesamtaufgaben
            </p>
          </div>

          <!-- Offen -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Offen</span>
              <span class="text-sm font-semibold text-orange-600">
                {{ openTasks }} Aufgaben
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="bg-orange-600 h-3 rounded-full transition-all duration-300"
                :style="{ width: openPercent + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ openPercent }}% noch zu erledigen
            </p>
          </div>
        </div>
      </section>

      <!-- NEUE AUFGABE CARD -->
      <section
        id="new-task-card"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-900">Neue Aufgabe</h3>
          <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <PlusIcon class="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          Erstelle eine neue Aufgabe und beginne mit der Arbeit
        </p>

        <button
          class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          @click="openNewTaskModal"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          Neue Aufgabe erstellen
        </button>
      </section>
    </div>

    <!-- FILTER & SEARCH -->
    <section
      id="filter-section"
      class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4"
    >
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Filter Buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            class="filter-btn px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center"
            :class="activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'"
            @click="activeFilter = 'all'"
          >
            Alle
            <span
              class="ml-1.5 px-1.5 py-0.5 rounded text-xs"
              :class="activeFilter === 'all' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'"
            >
              {{ totalTasks }}
            </span>
          </button>

          <button
            class="filter-btn px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center"
            :class="activeFilter === 'open'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'"
            @click="activeFilter = 'open'"
          >
            Offen
            <span
              class="ml-1.5 px-1.5 py-0.5 rounded text-xs"
              :class="activeFilter === 'open' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'"
            >
              {{ openTasks }}
            </span>
          </button>

          <button
            class="filter-btn px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center"
            :class="activeFilter === 'in_progress'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'"
            @click="activeFilter = 'in_progress'"
          >
            In Bearbeitung
            <span
              class="ml-1.5 px-1.5 py-0.5 rounded text-xs"
              :class="activeFilter === 'in_progress'
                ? 'bg-white/20'
                : 'bg-gray-200 text-gray-700'"
            >
              {{ inProgressTasks }}
            </span>
          </button>

          <button
            class="filter-btn px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center"
            :class="activeFilter === 'done'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'"
            @click="activeFilter = 'done'"
          >
            Abgeschlossen
            <span
              class="ml-1.5 px-1.5 py-0.5 rounded text-xs"
              :class="activeFilter === 'done' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'"
            >
              {{ completedTasks }}
            </span>
          </button>
        </div>

        <!-- Search + Sort -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Aufgaben suchen..."
              class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <MagnifyingGlassIcon
              class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="default">Sortieren nach</option>
            <option value="deadline">Fälligkeitsdatum</option>
            <option value="priority">Priorität</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </section>

    <!-- TASK LIST -->
    <section
      id="task-list-section"
      class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Aufgabenliste</h3>
        <div class="flex items-center space-x-2">
          <button
            class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ListBulletIcon class="w-5 h-5" />
          </button>
          <button
            class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Squares2X2Icon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-8"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Titel
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Priorität
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Fälligkeitsdatum
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Fortschritt
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="task in filteredTasks"
              :key="task.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Checkbox -->
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  v-model="task.completed"
                  @change="onToggle(task)"
                />
              </td>

              <!-- Titel + Beschreibung -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    :class="iconWrapperClass(task)"
                  >
                    <DocumentTextIcon class="w-4 h-4" :class="iconColorClass(task)" />
                  </div>
                  <div>
                    <div
                      class="text-sm font-medium text-gray-900"
                      :class="{ 'line-through text-gray-400': task.completed }"
                    >
                      {{ task.title }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ task.description }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 text-xs font-medium rounded-full"
                  :class="statusChipClass(task)"
                >
                  {{ statusLabel(task) }}
                </span>
              </td>

              <!-- Priorität -->
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 text-xs font-medium rounded-full"
                  :class="priorityChipClass(task.priority)"
                >
                  {{ task.priority || 'Mittel' }}
                </span>
              </td>

              <!-- Deadline -->
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ formatDate(task.deadline) || '—' }}
              </td>

              <!-- Fortschritt -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      class="bg-blue-500 h-2 rounded-full"
                      :style="{ width: progressValue(task) + '%' }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-600">
                    {{ progressValue(task) }}%
                  </span>
                </div>
              </td>

              <!-- Aktionen -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    class="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    @click="startTimerForTask(task)"
                  >
                    <PlayIcon class="w-4 h-4" />
                  </button>
                  <button
                    class="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    @click="onEdit(task)"
                  >
                    <PencilSquareIcon class="w-4 h-4" />
                  </button>
                  <button
                    class="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    @click="onDelete(task)"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>

            <!-- Keine Aufgaben -->
            <tr v-if="filteredTasks.length === 0">
              <td colspan="7" class="px-6 py-6 text-center text-sm text-gray-500">
                Keine Aufgaben gefunden.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- EDIT-FORMULAR UNTER DER LISTE -->
    <section v-if="editing" class="mt-4">
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div class="font-medium mb-2">Aufgabe bearbeiten</div>
        <TaskForm :task="editing" @save="saveEdit" @cancel="cancelEdit" />
      </div>
    </section>
  </div>

  <!-- MODAL: Neue Aufgabe (Teleport in den Body) -->
  <teleport to="body">
    <div
      v-if="showNewTaskForm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="closeNewTaskModal"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative">
        <!-- Header -->
        <div class="flex items-start justify-between p-4 border-b border-gray-100">
          <div>
            <h3 class="text-base font-semibold text-gray-900">Neue Aufgabe</h3>
            <p class="text-xs text-gray-500">
              Erstelle eine neue Aufgabe und beginne mit der Arbeit.
            </p>
          </div>
          <button
            type="button"
            class="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            @click="closeNewTaskModal"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Formular-Inhalt -->
        <form class="p-4 space-y-3" @submit.prevent="submitNewTask">
          <!-- Titel -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titel</label>
            <div class="relative">
              <input
                v-model="newTask.title"
                type="text"
                class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <!-- Beschreibung -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <textarea
              v-model="newTask.description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
            ></textarea>
          </div>

          <!-- Priorität -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priorität</label>
            <div class="relative">
              <select
                v-model="newTask.priority"
                class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-9 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <div class="relative">
              <input
                v-model="newTask.deadline"
                type="datetime-local"
                class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-9 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              @click="closeNewTaskModal"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              :disabled="!newTask.title.trim()"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import http from '../api/http'
import { useGlobalStore } from '../store/globalStore'
import TaskForm from '../components/TaskForm.vue'

import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  ClockIcon,
  ChartPieIcon,
  PlusIcon,
  ListBulletIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
} from '@heroicons/vue/24/outline'

const globalStore = useGlobalStore()

// --- State ---
const tasks = ref([])
const editing = ref(null)
const showNewTaskForm = ref(false)

// Formular-State für neue Aufgabe
const newTask = reactive({
  title: '',
  description: '',
  priority: 'Mittel',
  deadline: '',
})

// Filter / Suche / Sortierung
const activeFilter = ref('all') // 'all' | 'open' | 'in_progress' | 'done'
const searchQuery = ref('')
const sortBy = ref('default')

// Timer-State
const timerRunning = ref(false)
const timerSeconds = ref(0)
const timerIntervalId = ref(null)
const activeTask = ref(null)

// --- Backend ---
const fetchTasks = async () => {
  try {
    const userId = globalStore.userId ?? 1
    const res = await http.get('/tasks', { params: { user_id: userId } })
    tasks.value = res.data || []

    if (!tasks.value.length) {
      resetTimer()
      activeTask.value = null
    }
  } catch (err) {
    console.error('Failed to fetch tasks', err)
    tasks.value = []
  }
}

onMounted(fetchTasks)

const createTask = async (payload) => {
  try {
    const userId = globalStore.userId ?? 1
    const createPayload = {
      user_id: userId,
      title: payload.title,
      description: payload.description,
      deadline: payload.deadline || null,
      completed: false,
      priority: payload.priority || 'Mittel',
    }
    const res = await http.post('/tasks', createPayload)
    tasks.value.unshift(res.data)
  } catch (err) {
    console.error('Failed to create task', err)
    alert('Fehler beim Erstellen der Aufgabe')
  }
}

const resetNewTask = () => {
  newTask.title = ''
  newTask.description = ''
  newTask.priority = 'Mittel'
  newTask.deadline = ''
}

const submitNewTask = async () => {
  if (!newTask.title.trim()) return
  const payload = {
    title: newTask.title.trim(),
    description: newTask.description.trim(),
    priority: newTask.priority,
    deadline: newTask.deadline ? new Date(newTask.deadline).toISOString() : null,
  }
  await createTask(payload)
  resetNewTask()
  closeNewTaskModal()
}

const onEdit = (t) => {
  editing.value = { ...t }
}

const cancelEdit = () => {
  editing.value = null
}

const saveEdit = async (payload) => {
  try {
    const taskId = editing.value.id
    const updatePayload = {
      title: payload.title,
      description: payload.description,
      deadline: payload.deadline || null,
      completed: payload.completed ?? editing.value.completed ?? false,
      priority: payload.priority || editing.value.priority || 'Mittel',
    }
    const res = await http.put(`/tasks/${taskId}`, updatePayload)
    const idx = tasks.value.findIndex((x) => x.id === taskId)
    if (idx !== -1) tasks.value[idx] = res.data
    if (activeTask.value && activeTask.value.id === taskId) {
      activeTask.value = res.data
    }
    editing.value = null
  } catch (err) {
    console.error('saveEdit failed', err)
    alert('Fehler beim Speichern der Aufgabe')
  }
}

const onDelete = async (t) => {
  try {
    await http.delete(`/tasks/${t.id}`)
    tasks.value = tasks.value.filter((x) => x.id !== t.id)
    if (activeTask.value && activeTask.value.id === t.id) {
      resetTimer()
      activeTask.value = null
    }
  } catch (err) {
    console.error('Failed to delete task', err)
    alert('Fehler beim Löschen der Aufgabe')
  }
}

const onToggle = async (t) => {
  try {
    const updatePayload = { completed: t.completed }
    const res = await http.put(`/tasks/${t.id}`, updatePayload)
    const idx = tasks.value.findIndex((x) => x.id === t.id)
    if (idx !== -1) tasks.value[idx] = res.data

    if (res.data.completed && activeTask.value?.id === t.id) {
      stopTimer()
    }
  } catch (err) {
    console.error('Failed to toggle task', err)
    alert('Fehler beim Aktualisieren des Aufgabestatus')
  }
}

// --- Timer-Logik ---
const startTimerInternal = () => {
  if (timerRunning.value) return
  timerRunning.value = true
  timerIntervalId.value = setInterval(() => {
    timerSeconds.value++
  }, 1000)
}

const startTimer = () => {
  if (!tasks.value.length) return
  if (!activeTask.value) {
    activeTask.value =
      tasks.value.find((t) => !t.completed) || tasks.value[0] || null
  }
  startTimerInternal()
}

const startTimerForTask = (task) => {
  if (!task) return
  activeTask.value = task
  resetTimer()
  startTimerInternal()
}

const stopTimer = () => {
  if (timerIntervalId.value) {
    clearInterval(timerIntervalId.value)
    timerIntervalId.value = null
  }
  timerRunning.value = false
}

const resetTimer = () => {
  stopTimer()
  timerSeconds.value = 0
}

// --- Modal-Steuerung ---
const openNewTaskModal = () => {
  resetNewTask()
  showNewTaskForm.value = true
}

const closeNewTaskModal = () => {
  showNewTaskForm.value = false
}

// --- Helper / Anzeige ---
const formattedTime = computed(() => {
  const h = Math.floor(timerSeconds.value / 3600)
  const m = Math.floor((timerSeconds.value % 3600) / 60)
  const s = timerSeconds.value % 60
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
})

const timerStatusLabel = computed(() => {
  if (!tasks.value.length) return 'Inaktiv'
  return timerRunning.value ? 'Aktiv' : 'Bereit'
})

const timerTaskLabel = computed(() => {
  if (!tasks.value.length) return 'Keine Aufgaben'
  if (!activeTask.value) return 'Keine aktive Aufgabe'
  return activeTask.value.title || 'Unbenannte Aufgabe'
})

const statusKey = (task) => {
  if (activeTask.value?.id === task.id && timerRunning.value) return 'in_progress'
  return task.completed ? 'done' : 'open'
}

const statusLabel = (task) => {
  const key = statusKey(task)
  if (key === 'in_progress') return 'In Bearbeitung'
  if (key === 'done') return 'Abgeschlossen'
  return 'Offen'
}

// Statistik
const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() =>
  tasks.value.filter((t) => !!t.completed).length,
)
const openTasks = computed(
  () => totalTasks.value - completedTasks.value,
)
const inProgressTasks = computed(() =>
  tasks.value.filter((t) => statusKey(t) === 'in_progress').length,
)

const completedPercent = computed(() =>
  totalTasks.value ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0,
)
const openPercent = computed(() => 100 - completedPercent.value)

// Filtered tasks
const filteredTasks = computed(() => {
  let list = [...tasks.value]

  list = list.filter((t) => {
    const key = statusKey(t)
    if (activeFilter.value === 'all') return true
    if (activeFilter.value === 'open') return key === 'open'
    if (activeFilter.value === 'in_progress') return key === 'in_progress'
    if (activeFilter.value === 'done') return key === 'done'
    return true
  })

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (t) =>
        (t.title || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q),
    )
  }

  if (sortBy.value === 'deadline') {
    list.sort((a, b) => {
      const da = a.deadline || ''
      const db = b.deadline || ''
      return da.localeCompare(db)
    })
  } else if (sortBy.value === 'priority') {
    const order = { Hoch: 0, Mittel: 1, Niedrig: 2 }
    list.sort(
      (a, b) =>
        (order[a.priority || 'Mittel'] ?? 99) -
        (order[b.priority || 'Mittel'] ?? 99),
    )
  } else if (sortBy.value === 'status') {
    const order = { in_progress: 0, open: 1, done: 2 }
    list.sort((a, b) => order[statusKey(a)] - order[statusKey(b)])
  }

  return list
})

const formatDate = (iso) => {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    return d.toLocaleDateString()
  } catch {
    return iso
  }
}

const progressValue = (task) => {
  if (typeof task.progress === 'number') return task.progress
  return task.completed ? 100 : 0
}

// Chip-Klassen
const priorityChipClass = (prio) => {
  const p = prio || 'Mittel'
  if (p === 'Hoch') {
    return 'bg-red-100 text-red-700'
  } else if (p === 'Niedrig') {
    return 'bg-green-100 text-green-700'
  }
  return 'bg-yellow-100 text-yellow-700'
}

const statusChipClass = (task) => {
  const key = statusKey(task)
  if (key === 'in_progress') return 'bg-yellow-100 text-yellow-700'
  if (key === 'done') return 'bg-green-100 text-green-700'
  return 'bg-blue-100 text-blue-700'
}

const iconWrapperClass = (task) => {
  const key = statusKey(task)
  if (key === 'done') return 'bg-purple-100'
  if (key === 'in_progress') return 'bg-yellow-100'
  return 'bg-blue-50'
}

const iconColorClass = (task) => {
  const key = statusKey(task)
  if (key === 'done') return 'text-purple-600'
  if (key === 'in_progress') return 'text-yellow-600'
  return 'text-blue-600'
}
</script>
