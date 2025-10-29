<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Kalender</h1>

    <form @submit.prevent="createEvent" class="mb-4 space-y-2">
      <div>
        <input v-model="newEvent.title" placeholder="Titel" class="border p-2 w-full" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <input v-model="newEvent.start" type="datetime-local" class="border p-2" />
        <input v-model="newEvent.end" type="datetime-local" class="border p-2" />
      </div>
      <div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded">
        Erstellen
        </button>
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
import { ref, onMounted } from 'vue'
import http from '../api/http'
const globalStore = useGlobalStore()

const events = ref([])
const newEvent = ref({ title: '', start: '', end: '', user_id: 1 })
// clean init and test scrum/JIRA ticket
const fetchEvents = async () => {
  try {
    const res = await http.get('/calendar', { params: { user_id: 1 } })
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

    // convert local datetime-local string to ISO if needed
    const payload = {

      user_id: globalStore.userId,

      title: newEvent.value.title,
      start: new Date(newEvent.value.start).toISOString(),
      end: new Date(newEvent.value.end).toISOString(),
      created: new Date().toISOString()
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

onMounted(()=>{ fetchEvents() })
</script>
