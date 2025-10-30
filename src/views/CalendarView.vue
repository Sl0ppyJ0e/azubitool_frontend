<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Kalender</h1>

    <form @submit.prevent="createEvent" class="mb-4 space-y-2">
      <div>
        <input v-model="newEvent.title" placeholder="Titel" class="border p-2 w-full" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <DateTimePicker          
          ref="startRef"
          v-model="newEvent.start"
          :constrainFrom="null"
           min-date="today"
          placeholder="Startdatum & Uhrzeit"
          class="border p-2"
        />
        <DateTimePicker
          ref="endRef"
          v-model="newEvent.end"
          :constrainFrom="newEvent.start"
          min-date="today"
          :min-offset-minutes="5"
          placeholder="Enddatum & Uhrzeit"          
          class="border p-2"
        />
      </div>
      <div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Erstellen</button>
      </div>
    </form>

    <ul class="bg-white rounded shadow divide-y">
      <li v-for="e in events" :key="e.id" class="p-3">
        <div class="font-medium">{{ e.title }}</div>
        <div class="text-sm text-gray-500">{{ e.start }} → {{ e.end }}</div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import http from '../api/http'
import moment from 'moment'
import { useGlobalStore } from '../stores/globalStore'
import DateTimePicker from '../components/DateTimePicker.vue'


const globalStore = useGlobalStore()

const events = ref([])

const newEvent = ref({ title: '', start: '', end: '', user_id: 1 })

// Flatpickr Konfigurationen
const startRef = ref(null)
const endRef   = ref(null)

const fmt = 'Y-m-d\\TH:i' // ISO-ähnlich -> gut vergleichbar

function toDate(s) {
  return s ? new Date(s) : null
}



const fetchEvents = async () => {
  try {
    const res = await http.get('/calendar', { params: { user_id: globalStore.userId } })
    events.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const createEvent = async () => {
  console.group('createEvent start')
  console.log('New Event:', newEvent.value)
  try {

    if (!newEvent.value.title || !newEvent.value.start || !newEvent.value.end) {
      alert('Bitte alle Felder ausfüllen.')
      return
    }
    console.log('Creating event for user_id:', globalStore.userId)
    console.log('browser used:', globalStore.browser)

    const s = toDate(newEvent.value.start)
    const e = toDate(newEvent.value.end)
    if (s && e && e < s) {
      alert('Enddatum/Uhrzeit liegt vor dem Start – bitte korrigieren.')
      return
    }

    const payload = {
      user_id: globalStore.userId,
      title: newEvent.value.title,
      start: newEvent.value.start,
      end: newEvent.value.end,
      created: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    
    console.log('Payload:', payload)
    const res = await http.post('/calendar', payload)
    console.log('Response:', res.data)
    events.value.push(res.data)
    newEvent.value.title = ''
    newEvent.value.start = ''
    newEvent.value.end = ''
    console.groupEnd()

  } catch (err) {
    console.error(err)
  }
}

onMounted(()=>{ 
  fetchEvents() 
})
</script>
