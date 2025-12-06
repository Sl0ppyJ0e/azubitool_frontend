<template>
  <div id="calendar-view" class="p-8 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold mb-1">Kalender</h1>
      <p class="text-gray-500 text-sm">
        Plane deine Termine und behalte den Überblick
      </p>
    </div>

    <!-- Stats oben -->
    <section
      id="calendar-stats"
      class="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <!-- Heute -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Termine heute</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ todayCount }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
          >
            <CalendarDaysIcon class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- Diese Woche -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Diese Woche</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ weekCount }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
          >
            <CalendarIcon class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <!-- Dieser Monat -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Diesen Monat</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ monthCount }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
          >
            <CalendarDaysIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </section>

    <!-- Hauptbereich: links Monats-Grid, rechts Formular + Heute -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Monatsübersicht (Mockup, aktuell noch statisch) -->
      <div
        id="calendar-month-view"
        class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 capitalize">
           {{ monthYearLabel }}
          </h3>
          <div class="flex items-center space-x-2">
            <button
              class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              @click="prevMonth"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              @click="goToday"
            >
              Heute
            </button>
            <button
              class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              @click="nextMonth"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Wochentage -->
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div
            v-for="d in ['Mo','Di','Mi','Do','Fr','Sa','So']"
            :key="d"
            class="text-center text-xs font-semibold text-gray-600 py-2"
          >
            {{ d }}
          </div>
        </div>

        <!-- Tage (rein visuelles Mockup, noch nicht mit events verknüpft) -->
        <div class="grid grid-cols-7 gap-2">
          <button
            v-for="day in calendarDays"
            :key="day.key"
            type="button"
            class="relative aspect-square p-2 text-center text-sm rounded-lg cursor-pointer transition-colors"
            :class="dayClasses(day)"
            @click="selectDate(day.date)"
          >
            <span>{{ day.date.getDate() }}</span>

            <!-- Punkt wenn es an diesem Tag Events gibt -->
            <div
              v-if="dayHasEvents(day.date)"
              class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              :class="eventDotClass(day.date)"
            ></div>
          </button>
        </div>

        <!-- Legende -->
        <div
          class="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200 text-xs text-gray-600"
        >
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Meeting</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span>Schulung</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Feedback</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>Prüfung</span>
          </div>
        </div>
      </div>

      <!-- Rechte Spalte: Neuer Termin + Heute -->
      <div class="space-y-6">
        <!-- Neuer Termin (dein createEvent + newEvent, nur hübscher) -->
        <div
          id="create-event-card"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Neuer Termin</h3>
            <button
              type="button"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <form @submit.prevent="createEvent" class="space-y-4">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Titel</label
              >
              <input
                id="title"
                v-model="newEvent.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Termin eingeben"
              />
            </div>

            <!-- Kategorie nur optisch, aktuell ohne Backend-Feld -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 mb-2"
                >Kategorie</label
              >
              <select
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Meeting</option>
                <option>Schulung</option>
                <option>Feedback</option>
                <option>Prüfung</option>
              </select>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 mb-2"
                >Startdatum &amp; Zeit</label
              >
              <input
                v-model="newEvent.start"
                type="datetime-local"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label
                class="block text-sm font-medium text-gray-700 mb-2"
                >Enddatum &amp; Zeit</label
              >
              <input
                v-model="newEvent.end"
                type="datetime-local"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <!-- Beschreibung (nur fürs Editieren im Backend vorgesehen, daher hier vorerst nur optischer Platzhalter)
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
              <textarea
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Optional"
              ></textarea>
            </div>
            -->

            <button
              type="submit"
              class="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <PlusIcon class="w-4 h-4 mr-2" />
              Erstellen
            </button>
          </form>
        </div>

        <!-- Heute (aus deinen Events herausgefiltert) -->
        <div
          id="today-events"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Heute
          </h3>

          <div v-if="todayEvents.length" class="space-y-3">
            <div
              v-for="e in todayEvents"
              :key="e.id"
              class="flex items-start space-x-3 p-3 rounded-lg border"
              :class="todayCardClass(e)"
            >
              <div class="w-1 h-full rounded-full" :class="todayBarClass(e)"></div>
              <div class="flex-1">
                <div class="flex items-start justify-between mb-1">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ e.title }}
                  </h4>
                  <span class="text-xs text-gray-500">
                    {{ formatTime(e.start) }}
                  </span>
                </div>
                <p class="text-xs text-gray-600">
                  {{ formatTime(e.start) }} - {{ formatTime(e.end) }}
                </p>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">
            Für heute sind keine Termine geplant.
          </p>
        </div>
      </div>
    </section>

    <!-- Liste / Bearbeiten der Termine (deine alte UL, nur hübscher) -->
    <section
      id="upcoming-events-section"
      class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Termine &amp; Bearbeitung
      </h3>

      <ul class="space-y-3">
        <li
          v-for="e in events"
          :key="e.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-100"
        >
          <!-- Ansicht -->
          <div v-if="editId !== e.id">
            <div class="flex items-center justify-between mb-1">
              <div>
                <div class="font-medium text-gray-900">
                  {{ e.title }}
                </div>
                <span
                  class="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                  :class="eventBadgeClass(e)"
                >
                  {{ categoryText(e) }}
                </span>
              </div>
              <span class="text-xs text-gray-500">
                {{ formatDate(e.start) }}
              </span>
            </div>

            <div class="text-xs text-gray-500 mb-1">
              {{ formatDate(e.start) }} → {{ formatDate(e.end) }}
            </div>
            <p
              v-if="e.description"
              class="text-xs text-gray-600 mt-1"
            >
              {{ e.description }}
            </p>
            <div class="mt-3 flex items-center justify-end gap-2">
              <button
                @click="startEdit(e)"
                class="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100"
              >
                Bearbeiten
              </button>
              <button
                @click="deleteEvent(e.id)"
                class="inline-flex items-center px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full hover:bg-red-100"
              >
                Löschen
              </button>
            </div>
          </div>

          <!-- Edit-Mode -->
          <div v-else>
            <div class="mb-2">
              <input
                v-model="editEvent.title"
                class="border border-gray-300 rounded-lg p-2 w-full text-sm"
                placeholder="Titel"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <input
                v-model="editEvent.start"
                type="datetime-local"
                class="border border-gray-300 rounded-lg p-2 text-sm"
              />
              <input
                v-model="editEvent.end"
                type="datetime-local"
                class="border border-gray-300 rounded-lg p-2 text-sm"
              />
            </div>
            <div class="mt-2">
              <textarea
                v-model="editEvent.description"
                class="border border-gray-300 rounded-lg p-2 w-full text-sm"
                rows="2"
                placeholder="Beschreibung"
              ></textarea>
            </div>
            <div class="mt-3 flex items-center justify-end gap-2">
              <button
                @click="saveEdit(e.id)"
                class="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700"
              >
                Speichern
              </button>
              <button
                @click="cancelEdit"
                class="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-200"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import http from '../api/http'
import { useGlobalStore } from '../store/globalStore'
import {
  CalendarDaysIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline'

const globalStore = useGlobalStore()

// === deine bestehenden Refs / Logik ===
const events = ref([])
const newEvent = ref({ title: '', start: '', end: '', user_id: 1 })

const fetchEvents = async () => {
  try {
    const userId = globalStore.userId ?? 1
    const res = await http.get('/calendar', { params: { user_id: userId } })
    events.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const eventBadgeClass = (event) => {
  const cat = getEventCategory(event)
  const s = categoryStyles[cat] || categoryStyles.default
  return `${s.badgeBg} ${s.badgeText}`
}


const createEvent = async () => {
  console.group('createEvent start')
  console.log('New Event:', newEvent.value)
  try {
    if (!newEvent.value.title || !newEvent.value.start || !newEvent.value.end) {
      alert('Bitte alle Felder ausfüllen.')
      return
    }

    const userId = globalStore.userId ?? 1
    const payload = {
      user_id: userId,
      title: newEvent.value.title,
      start: new Date(newEvent.value.start).toISOString(),
      end: new Date(newEvent.value.end).toISOString(),
      created: new Date().toISOString(),
    }
    console.log('Payload:', payload)
    const res = await http.post('/calendar', payload)
    console.log('Response:', res.data)
    events.value.push(res.data)
    newEvent.value.title = ''
    newEvent.value.start = ''
    newEvent.value.end = ''
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchEvents()
})

const deleteEvent = async (id) => {
  try {
    const userId = globalStore.userId ?? 1
    await http.delete(`/calendar/${id}`, { params: { user_id: userId } })
    events.value = events.value.filter((e) => e.id !== id)
  } catch (err) {
    console.error('Error deleting event', err)
    alert('Fehler beim Löschen des Ereignisses.')
  }
}

const formatDate = (iso) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString()
  } catch (e) {
    return iso
  }
}

// Edit handling
const editId = ref(null)
const editEvent = ref({ title: '', start: '', end: '', description: '' })

const toLocalDateTimeInput = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const tzOffset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - tzOffset * 60000)
  return local.toISOString().slice(0, 16)
}

const startEdit = (e) => {
  editId.value = e.id
  editEvent.value.title = e.title || ''
  editEvent.value.start = toLocalDateTimeInput(e.start)
  editEvent.value.end = toLocalDateTimeInput(e.end)
  editEvent.value.description = e.description || ''
}

const cancelEdit = () => {
  editId.value = null
  editEvent.value = { title: '', start: '', end: '', description: '' }
}

const saveEdit = async (id) => {
  try {
    const userId = globalStore.userId ?? 1
    if (!editEvent.value.title || !editEvent.value.start || !editEvent.value.end) {
      alert('Bitte Titel, Start und Ende ausfüllen.')
      return
    }
    const payload = {
      user_id: userId,
      title: editEvent.value.title,
      description: editEvent.value.description,
      start: new Date(editEvent.value.start).toISOString(),
      end: new Date(editEvent.value.end).toISOString(),
    }
    const res = await http.put(`/calendar/${id}`, payload)
    events.value = events.value.map((ev) => (ev.id === id ? res.data : ev))
    cancelEdit()
  } catch (err) {
    console.error('Error updating event', err)
    alert('Fehler beim Aktualisieren des Ereignisses.')
  }
}

// === Zusätzliche Helfer für Mockup-Funktionalität ===

// gleiche Tag?
const isSameDay = (a, b) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const today = computed(() => new Date())

// === Kalender-Logik (Monatsnavigation & Auswahl) ===
const currentDate = ref(new Date())      // aktueller Monat, der angezeigt wird
const selectedDate = ref(new Date())     // der aktuell ausgewählte Tag

const monthYearLabel = computed(() =>
  currentDate.value.toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  })
)

// Erzeugt alle Zellen (inkl. graue Tage aus Vormonat/Nachmonat)
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const lastOfMonth = new Date(year, month + 1, 0)

  // Wochentag von 0–6, Montag = 0
  const weekdayOfFirst = (firstOfMonth.getDay() + 6) % 7

  const days = []

  // Tage aus Vormonat auffüllen
  for (let i = weekdayOfFirst - 1; i >= 0; i--) {
    const d = new Date(year, month, 1)
    d.setDate(d.getDate() - (i + 1))
    days.push({
      key: `prev-${d.getTime()}`,
      date: d,
      outside: true,
    })
  }

  // Tage des aktuellen Monats
  for (let day = 1; day <= lastOfMonth.getDate(); day++) {
    const d = new Date(year, month, day)
    days.push({
      key: `cur-${d.getTime()}`,
      date: d,
      outside: false,
    })
  }

  // Tage des nächsten Monats auffüllen, bis Grid voll ist (ganze Wochen)
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1].date
    const d = new Date(last)
    d.setDate(d.getDate() + 1)
    days.push({
      key: `next-${d.getTime()}`,
      date: d,
      outside: true,
    })
  }

  return days
})

// Navigation
const prevMonth = () => {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() - 1)
  currentDate.value = d
}

const nextMonth = () => {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() + 1)
  currentDate.value = d
}

const goToday = () => {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

// Tag auswählen
const selectDate = (date) => {
  selectedDate.value = new Date(date)
}

// Styling der einzelnen Zellen
const dayClasses = (day) => {
  const classes = []

  if (day.outside) {
    classes.push('text-gray-400')
  } else {
    classes.push('text-gray-900')
  }

  // Heute umranden
  if (isSameDay(day.date, today.value)) {
    classes.push('border border-indigo-200')
  }

  // Ausgewählter Tag
  if (selectedDate.value && isSameDay(day.date, selectedDate.value)) {
    classes.push('bg-indigo-600 text-white shadow-sm')
  } else {
    classes.push('hover:bg-gray-50')
  }

  return classes.join(' ')
}



const eventDotClass = (date) => {
  const eventForDay = events.value.find((e) => {
    if (!e.start) return false
    return isSameDay(new Date(e.start), date)
  })

  if (!eventForDay) return categoryStyles.default.dot

  const cat = getEventCategory(eventForDay)
  const s = categoryStyles[cat] || categoryStyles.default
  return s.dot
}

// Gibt es an diesem Tag Events?
const dayHasEvents = (date) => {
  return events.value.some((e) => {
    if (!e.start) return false
    return isSameDay(new Date(e.start), date)
  })
}



// Farbe des Punkts für Events an einem Tag
// Wenn du später Kategorien aus der API hast, kannst du hier switch/case machen



// Events heute
const todayEvents = computed(() =>
  events.value.filter((e) => {
    if (!e.start) return false
    try {
      return isSameDay(new Date(e.start), today.value)
    } catch {
      return false
    }
  })
)

// Zählungen
const todayCount = computed(() => todayEvents.value.length)

const weekCount = computed(() => {
  const now = today.value
  const day = now.getDay() || 7 // Montag = 1 ... Sonntag = 7
  const monday = new Date(now)
  monday.setDate(now.getDate() - (day - 1))
  monday.setHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  return events.value.filter((e) => {
    if (!e.start) return false
    const d = new Date(e.start)
    return d >= monday && d <= sunday
  }).length
})

const monthCount = computed(() => {
  const now = today.value
  const month = now.getMonth()
  const year = now.getFullYear()
  return events.value.filter((e) => {
    if (!e.start) return false
    const d = new Date(e.start)
    return d.getMonth() === month && d.getFullYear() === year
  }).length
})

const formatTime = (iso) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}


// === Kategorie-Helfer (Farben für Meeting / Schulung / Feedback / Prüfung) ===

// Mapping der Styles pro Kategorie
const categoryStyles = {
  meeting: {
    dot: 'bg-blue-500',
    todayBg: 'bg-[#EEF4FF]',
    todayBorder: 'border-blue-200',
    todayBar: 'bg-blue-500',
    badgeBg: 'bg-[#EEF4FF]',
    badgeText: 'text-[#1E40AF]',
  },
  schulung: {
    dot: 'bg-purple-500',
    todayBg: 'bg-[#F5E9FF]',
    todayBorder: 'border-purple-200',
    todayBar: 'bg-purple-500',
    badgeBg: 'bg-[#F5E9FF]',
    badgeText: 'text-[#6B21A8]',
  },
  feedback: {
    dot: 'bg-green-500',
    todayBg: 'bg-[#E8FCEB]',
    todayBorder: 'border-green-200',
    todayBar: 'bg-green-500',
    badgeBg: 'bg-[#E8FCEB]',
    badgeText: 'text-[#166534]',
  },
  pruefung: {
    dot: 'bg-red-500',
    todayBg: 'bg-[#FEECEC]',
    todayBorder: 'border-red-200',
    todayBar: 'bg-red-500',
    badgeBg: 'bg-[#FEECEC]',
    badgeText: 'text-[#991B1B]',
  },
  default: {
    dot: 'bg-gray-300',
    todayBg: 'bg-gray-50',
    todayBorder: 'border-gray-200',
    todayBar: 'bg-gray-400',
    badgeBg: 'bg-gray-100',
    badgeText: 'text-gray-700',
  },
}

// Versucht, aus Titel (oder später category/type) die Kategorie zu erkennen
const getEventCategory = (e) => {
  const text = `${e.category || ''} ${e.type || ''} ${e.title || ''}`.toLowerCase()

  if (text.includes('schulung') || text.includes('training')) return 'schulung'
  if (text.includes('feedback')) return 'feedback'
  if (text.includes('prüfung') || text.includes('pruefung') || text.includes('exam')) return 'pruefung'
  if (text.includes('meeting') || text.includes('besprechung') || text.includes('termin')) return 'meeting'

  return 'default'
}

// Text für Badge
const categoryText = (e) => {
  const cat = getEventCategory(e)
  switch (cat) {
    case 'meeting':
      return 'Meeting'
    case 'schulung':
      return 'Schulung'
    case 'feedback':
      return 'Feedback'
    case 'pruefung':
      return 'Prüfung'
    default:
      return 'Termin'
  }
}



// Farben für "Heute"-Karten anhand der Kategorie
const todayCardClass = (event) => {
  const cat = getEventCategory(event)
  const s = categoryStyles[cat] || categoryStyles.default
  return `${s.todayBg} ${s.todayBorder}`
}

const todayBarClass = (event) => {
  const cat = getEventCategory(event)
  const s = categoryStyles[cat] || categoryStyles.default
  return s.todayBar
}

</script>
