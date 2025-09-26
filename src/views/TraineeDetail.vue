<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Azubi #{{ id }}</h1>
    <section class="grid md:grid-cols-2 gap-4">
      <div class="bg-white rounded shadow p-4">
        <h2 class="font-semibold mb-2">Neue Aufgabe (Mock)</h2>
        <form @submit.prevent="createTask" class="space-y-2">
          <input v-model="task.title" placeholder="Titel" class="w-full border p-2 rounded">
          <textarea v-model="task.description" placeholder="Beschreibung" class="w-full border p-2 rounded"/>
          <input v-model="task.due_date" type="date" class="w-full border p-2 rounded">
          <select v-model="task.priority" class="w-full border p-2 rounded">
            <option>low</option><option selected>normal</option><option>high</option>
          </select>
          <button class="bg-blue-600 text-white px-3 py-2 rounded">Anlegen</button>
        </form>
      </div>
      <div class="bg-white rounded shadow p-4">
        <h2 class="font-semibold mb-2">Dokument hochladen (Mock)</h2>
        <form @submit.prevent="uploadDoc" class="space-y-2">
          <input v-model="doc.title" placeholder="Titel" class="w-full border p-2 rounded">
          <select v-model="doc.type" class="w-full border p-2 rounded">
            <option value="report">Berichtsheft</option>
            <option value="certificate">Zertifikat</option>
            <option value="attest">Attest</option>
            <option value="other">Sonstiges</option>
          </select>
          <input type="file" @change="onFile" />
          <button class="bg-green-600 text-white px-3 py-2 rounded">Hochladen</button>
        </form>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { mock } from '../api/mock'
const route = useRoute()
const id = Number(route.params.id)

const task = ref({ title:'', description:'', due_date:'', priority:'normal' })
function createTask(){
  const arr = mock.tasksByUser[id] || (mock.tasksByUser[id] = [])
  const nextId = Math.max(0, ...arr.map(t=>t.id)) + 1
  arr.push({ id: nextId, title: task.value.title, status: 'open', progress: 0 })
  alert('Task angelegt (Mock).')
}

const doc = ref({ title:'', type:'report', file:null })
function onFile(e){ doc.value.file = e.target.files?.[0] }
function uploadDoc(){
  if(!doc.value.file){ alert('Bitte Datei wählen'); return }
  alert(`Mock-Upload: ${doc.value.title} (${doc.value.type}) → ${doc.value.file.name}`)
}
</script>
