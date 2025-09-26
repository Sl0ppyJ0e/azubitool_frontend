<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Mein Profil</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Karte: Avatar & Account -->
      <section class="bg-white border rounded-xl p-6 space-y-4">
        <h2 class="font-semibold">Account</h2>

        <!-- Avatar-Upload -->
        <div class="flex items-center gap-4">
          <img
            class="w-20 h-20 rounded-full ring-1 ring-gray-200 object-cover"
            :src="profile.avatarDataUrl || 'https://api.dicebear.com/7.x/thumbs/svg?seed=max'"
            alt="Avatar"
          />

          <div class="space-y-2">
            <div class="text-sm text-gray-600">Avatar (PNG/JPG/WEBP, max. 2 MB)</div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                @click="openFileDialog"
              >
                Avatar hochladen
              </button>

              <button
                v-if="profile.avatarDataUrl"
                type="button"
                class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                @click="removeAvatar"
              >
                Entfernen
              </button>
            </div>

            <p v-if="fileError" class="text-sm text-red-600">{{ fileError }}</p>

            <!-- versteckter echter File-Input -->
            <input
              ref="fileInput"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              class="hidden"
              @change="onAvatarChange"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="text-sm text-gray-600">Name</label>
            <input v-model="profile.fullName" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-sm text-gray-600">E-Mail</label>
            <input v-model="profile.email" class="mt-1 w-full border rounded px-3 py-2 bg-gray-50" readonly />
          </div>
        </div>

        <div>
          <label class="text-sm text-gray-600">Über mich / Beschreibung</label>
          <textarea v-model="profile.bio" rows="4" class="mt-1 w-full border rounded px-3 py-2"></textarea>
        </div>

        <div class="pt-2">
          <button
            @click="saveProfile"
            :disabled="saving"
            class="bg-slate-900 text-white px-4 py-2 rounded hover:opacity-95 disabled:opacity-60"
          >
            {{ saving ? 'Speichern…' : 'Speichern' }}
          </button>
          <span class="ml-3 text-sm text-emerald-600" v-if="msg">{{ msg }}</span>
        </div>
      </section>

      <!-- Karte: Skills & Sprachen -->
      <section class="bg-white border rounded-xl p-6 space-y-4 lg:col-span-2">
        <h2 class="font-semibold">Skills & Wünsche</h2>

        <!-- Programmierung Slider -->
        <div>
          <div class="flex items-center justify-between">
            <label class="text-sm text-gray-600">Selbsteinschätzung (Programmierung)</label>
            <span class="text-sm font-medium">{{ profile.programmingScore }}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            v-model.number="profile.programmingScore"
            class="w-full accent-slate-900"
          />
        </div>

        <!-- Sprachen: Mehrfachauswahl (Checkboxes) -->
        <div>
          <div class="text-sm text-gray-600 mb-2">Ich kann (Sprachen – Mehrfachauswahl)</div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <label
              v-for="lang in LANGUAGES"
              :key="lang"
              class="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded"
            >
              <input
                type="checkbox"
                :value="lang"
                :checked="profile.languagesKnown.includes(lang)"
                @change="toggleInArray(profile.languagesKnown, lang)"
              />
              <span class="text-sm">{{ lang }}</span>
            </label>
          </div>
        </div>

        <!-- Fokus/Wünsche: Mehrfachauswahl -->
        <div>
          <div class="text-sm text-gray-600 mb-2">Ich will/fokussiere (Mehrfachauswahl)</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label
              v-for="f in FOCUS"
              :key="f"
              class="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded"
            >
              <input
                type="checkbox"
                :value="f"
                :checked="profile.focusWishes.includes(f)"
                @change="toggleInArray(profile.focusWishes, f)"
              />
              <span class="text-sm">{{ f }}</span>
            </label>
          </div>
        </div>

        <div class="pt-2">
          <button
            @click="saveProfile"
            :disabled="saving"
            class="bg-slate-900 text-white px-4 py-2 rounded hover:opacity-95 disabled:opacity-60"
          >
            {{ saving ? 'Speichern…' : 'Speichern' }}
          </button>
          <span class="ml-3 text-sm text-emerald-600" v-if="msg">{{ msg }}</span>
        </div>
      </section>

      <!-- Karte: Passwort ändern -->
      <section class="bg-white border rounded-xl p-6 space-y-4 lg:col-span-3">
        <h2 class="font-semibold">Passwort ändern</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="text-sm text-gray-600">Aktuelles Passwort</label>
            <input v-model="pw.current" type="password" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Neues Passwort</label>
            <input v-model="pw.next" type="password" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Wiederholen</label>
            <input v-model="pw.repeat" type="password" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="changePassword"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Passwort ändern
          </button>
          <span
            class="text-sm"
            :class="pwMsg.includes('geändert') ? 'text-emerald-600' : 'text-red-600'"
          >{{ pwMsg }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '../store/auth'

const auth = useAuth()
const userId = auth.user?.id ?? 0
const STORAGE_KEY = `profile_${userId}`

// Auswahl-Optionen
const LANGUAGES = [
  'JavaScript','TypeScript','Python','Java','C#','C++','Go','Rust','PHP','SQL','Kotlin','Swift','Dart'
]
const FOCUS = [
  'Frontend (Vue/React)',
  'Backend (Python/FastAPI)',
  'Backend (Node.js)',
  'Fullstack',
  'Mobile (Flutter/Swift/Kotlin)',
  'Data/AI',
  'DevOps',
  'QA/Testing'
]

// Formularstate
const profile = reactive({
  fullName: auth.user?.full_name || 'Max Mustermann',
  email: auth.user?.email || 'max@example.com',
  bio: '',
  programmingScore: 60,
  languagesKnown: [],
  focusWishes: [],
  avatarDataUrl: ''
})

// Passwort-Form
const pw = reactive({ current: '', next: '', repeat: '' })
const pwMsg = ref('')

// UI-Helfer
const saving = ref(false)
const msg = ref('')
const fileInput = ref(null)
const fileError = ref('')

// Laden (Mock: localStorage)
onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const obj = JSON.parse(raw)
      Object.assign(profile, obj)
    } else {
      profile.languagesKnown = ['JavaScript','Python']
      profile.focusWishes = ['Backend (Python/FastAPI)']
    }
  } catch { /* ignore */ }
})

// Speichern (Mock)
function saveProfile(){
  saving.value = true
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  setTimeout(() => {
    saving.value = false
    msg.value = 'Profil gespeichert (Mock).'
    setTimeout(() => (msg.value = ''), 2000)
  }, 400)
  // später: http.put('/users/me', {...})
}

// Passwort-Validierung & Änderung (Mock)
function validatePassword(){
  pwMsg.value = ''
  if (!pw.current || !pw.next || !pw.repeat) {
    pwMsg.value = 'Bitte alle Felder ausfüllen.'
    return false
  }
  if (pw.next.length < 8) {
    pwMsg.value = 'Neues Passwort muss mind. 8 Zeichen lang sein.'
    return false
  }
  if (pw.next !== pw.repeat) {
    pwMsg.value = 'Passwörter stimmen nicht überein.'
    return false
  }
  return true
}
async function changePassword(){
  if (!validatePassword()) return
  pwMsg.value = 'Passwort geändert (Mock – keine echte Prüfung).'
  pw.current = pw.next = pw.repeat = ''
  setTimeout(() => (pwMsg.value = ''), 2000)
  // später: http.post('/auth/change-password', { current_password: pw.current, new_password: pw.next })
}

// Avatar-Upload
function openFileDialog() {
  fileError.value = ''
  fileInput.value?.click()
}
function removeAvatar() {
  profile.avatarDataUrl = ''
  if (fileInput.value) fileInput.value.value = ''
}
function onAvatarChange(e){
  const file = e.target.files?.[0]
  if (!file) return

  const valid = ['image/png','image/jpeg','image/webp']
  if (!valid.includes(file.type)) {
    fileError.value = 'Nur PNG, JPG oder WEBP erlaubt.'
    e.target.value = ''
    return
  }
  const max = 2 * 1024 * 1024 // 2 MB
  if (file.size > max) {
    fileError.value = 'Datei zu groß (max. 2 MB).'
    e.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => { profile.avatarDataUrl = reader.result }
  reader.readAsDataURL(file)

  // später: multipart Upload mit Backend
  // const fd = new FormData(); fd.append('file', file)
  // await http.post('/users/me/avatar', fd, { headers: {'Content-Type':'multipart/form-data'} })
}

// Mehrfachauswahl-Helper
function toggleInArray(arr, val){
  const i = arr.indexOf(val)
  if (i === -1) arr.push(val)
  else arr.splice(i, 1)
}
</script>
