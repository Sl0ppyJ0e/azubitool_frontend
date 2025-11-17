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
        <div v-if="editId !== e.id">
          <div class="font-medium">{{ e.title }}</div>
          <div class="text-sm text-gray-500">{{ formatDate(e.start) }} → {{ formatDate(e.end) }}</div>
          <div class="mt-2 space-x-2">
            <button @click="startEdit(e)" class="text-sm text-blue-600 hover:underline">Bearbeiten</button>
            <button @click="deleteEvent(e.id)" class="text-sm text-red-600 hover:underline">Löschen</button>
          </div>
        </div>
        <div v-else>
          <div class="font-medium">
            <input v-model="editEvent.title" class="border p-1 w-full" />
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <input v-model="editEvent.start" type="datetime-local" class="border p-1" />
            <input v-model="editEvent.end" type="datetime-local" class="border p-1" />
          </div>
          <div class="mt-2">
            <textarea v-model="editEvent.description" class="border p-1 w-full" rows="2"></textarea>
          </div>
          <div class="mt-2 space-x-2">
            <button @click="saveEdit(e.id)" class="bg-green-600 text-white px-3 py-1 rounded">Speichern</button>
            <button @click="cancelEdit" class="bg-gray-200 text-black px-3 py-1 rounded">Abbrechen</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import http from '../api/http'
import { useGlobalStore } from '../store/globalStore'
const globalStore = useGlobalStore()

const events = ref([])
const newEvent = ref({ title: '', start: '', end: '', user_id: 1 })
// clean init and test scrum/JIRA ticket
const fetchEvents = async () => {
  try {
    const userId = globalStore.userId ?? 1
    const res = await http.get('/calendar', { params: { user_id: userId } })
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
    const userId = globalStore.userId ?? 1
    const payload = {
      user_id: userId,
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

const deleteEvent = async (id) => {
  try {
    const userId = globalStore.userId ?? 1
    await http.delete(`/calendar/${id}`, { params: { user_id: userId } })
    events.value = events.value.filter(e => e.id !== id)
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
  // adjust to local offset so datetime-local shows local time
  const tzOffset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - tzOffset * 60000)
  return local.toISOString().slice(0,16)
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
    // update local list
    events.value = events.value.map(ev => ev.id === id ? res.data : ev)
    cancelEdit()
  } catch (err) {
    console.error('Error updating event', err)
    alert('Fehler beim Aktualisieren des Ereignisses.')
  }
}
</script>
