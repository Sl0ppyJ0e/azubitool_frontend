<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form @submit.prevent="submit" class="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
      <h1 class="text-xl font-semibold">Login</h1>
      <input v-model="email" type="email" placeholder="E-Mail" class="w-full border p-2 rounded" required>
      <input v-model="password" type="password" placeholder="Passwort" class="w-full border p-2 rounded" required>
      <button class="w-full bg-blue-600 text-white py-2 rounded">Anmelden</button>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      <p class="text-xs text-gray-500">Tipp: E-Mail enthält „trainer“ → Rolle Trainer, sonst Trainee (Mock).</p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const email = ref('trainer@example.com')
const password = ref('secret')
const error = ref('')
const router = useRouter()
const auth = useAuth()

async function submit(){
  try{ await auth.login(email.value, password.value); router.push({ name: 'dashboard' }) }
  catch(e){ error.value = e?.response?.data?.detail || 'Login fehlgeschlagen' }
}
</script>
