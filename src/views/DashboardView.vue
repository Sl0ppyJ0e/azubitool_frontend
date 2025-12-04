<template>
  <div class="space-y-6">
    <!-- Header -->
    <section>
      <h1 class="text-3xl font-bold">Willkommen, Azubi Max</h1>
      <p class="text-gray-500 mt-1">Hier ist dein Überblick über deine Ausbildung</p>
    </section>

    <!-- 3 Karten NEBENEINANDER -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Offene Aufgaben -->
      <div class="bg-white rounded-xl border p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg text-neutral-900">Offene Aufgaben</h2>
          <i class="text-neutral-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-list-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg></i>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div>
              <p class="text-neutral-900 text-sm">Projektdokumentation</p>
              <p class="text-xs text-neutral-500">Fällig: 15.01.2025</p>
            </div>
            <span class="px-2 py-1 bg-neutral-100 text-neutral-800 text-xs rounded-full">Hoch</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div>
              <p class="text-neutral-900 text-sm">Wochenbericht</p>
              <p class="text-xs text-neutral-500">Fällig: 12.01.2025</p>
            </div>
            <span class="px-2 py-1 bg-neutral-100 text-neutral-800 text-xs rounded-full">Mittel</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div>
              <p class="text-neutral-900 text-sm">Schulungsnachweis</p>
              <p class="text-xs text-neutral-500">Fällig: 20.01.2025</p>
            </div>
            <span class="px-2 py-1 bg-neutral-100 text-neutral-800 text-xs rounded-full">Niedrig</span>
          </div>
        </div>
      </div>
      <!-- Nächste Termine (kombinierte Version) -->
      <div class="bg-white rounded-xl border p-4 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg text-neutral-900">Nächste Termine</h2>
          <CalendarDaysIcon class="w-5 h-5 text-neutral-400" />
        </div>

        <div class="space-y-3">
          <!-- Termin 1 -->
          <div class="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
            <div class="bg-neutral-800 text-white text-xs rounded px-2 py-1 min-w-[40px] text-center">
              10<br>JAN
            </div>
            <div>
              <p class="text-neutral-900 text-sm">Teammeeting</p>
              <p class="text-xs text-neutral-500">09:00 - 10:30</p>
            </div>
          </div>

          <!-- Termin 2 -->
          <div class="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
            <div class="bg-neutral-800 text-white text-xs rounded px-2 py-1 min-w-[40px] text-center">
              12<br>JAN
            </div>
            <div>
              <p class="text-neutral-900 text-sm">Ausbildergespräch</p>
              <p class="text-xs text-neutral-500">14:00 - 15:00</p>
            </div>
          </div>

          <!-- Termin 3 -->
          <div class="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
            <div class="bg-neutral-800 text-white text-xs rounded px-2 py-1 min-w-[40px] text-center">
              15<br>JAN
            </div>
            <div>
              <p class="text-neutral-900 text-sm">Berufsschule</p>
              <p class="text-xs text-neutral-500">08:00 - 15:30</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Letztes Feedback -->
      <!-- Letztes Feedback -->
      <div class="bg-white rounded-xl border p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold">Letztes Feedback</h2>
          <button class="text-gray-400 hover:text-gray-600">💬</button>
        </div>

        <!-- Container für mehrere Kommentare -->
        <ul class="space-y-4">
          <!-- Kommentar 1 -->
          <li class="flex items-start gap-3">
            <img
              class="w-10 h-10 rounded-full ring-1 ring-gray-200"
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=herr"
              alt="avatar"
            />
            <div class="flex-1">
              <div class="text-sm">
                <span class="font-medium">Herr Schmidt</span>
                <span class="text-gray-500"> vor 2 Tagen</span>
              </div>
              <p class="text-sm text-gray-700 mt-1">
                Sehr gute Arbeit bei der letzten Projektpräsentation. Besonders die strukturierte Herangehensweise war beeindruckend.
              </p>
              <div class="mt-2 flex items-center gap-1">
                <Star v-for="i in 5" :key="i" :filled="i <= 4" />
              </div>
            </div>
          </li>

          <!-- Kommentar 2 -->
          <li class="flex items-start gap-3">
            <img
              class="w-10 h-10 rounded-full ring-1 ring-gray-200"
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=herr"
              alt="avatar"
            />
            <div class="flex-1">
              <div class="text-sm">
                <span class="font-medium">Herr Müller</span>
                <span class="text-gray-500"> vor 4 Tagen</span>
              </div>
              <p class="text-sm text-gray-700 mt-1">
                Sehr gute Arbeit bei der letzten Projektpräsentation. Besonders die strukturierte Herangehensweise war beeindruckend.
              </p>
              <div class="mt-2 flex items-center gap-1">
                <Star v-for="i in 5" :key="i" :filled="i <= 4" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    
    <!-- Lernfortschritt (separat darunter) -->
    <section class="bg-white rounded-xl border p-6">
      
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg text-neutral-900">Lernfortschritt</h2>
        <span class="text-sm text-neutral-500">68% abgeschlossen</span>
      </div>
      <div class="space-y-4">
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-neutral-700">Gesamtfortschritt</span>
            <span class="text-sm text-neutral-500">68%</span>
          </div>
          <div class="w-full bg-neutral-200 rounded-full h-2">
            <div class="bg-neutral-800 h-2 rounded-full" style="width: 68%"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-neutral-600">Theorie</span>
              <span class="text-sm text-neutral-500">85%</span>
            </div>
            <div class="w-full bg-neutral-200 rounded-full h-1.5">
              <div class="bg-neutral-500 h-1.5 rounded-full" style="width: 85%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-neutral-600">Praxis</span>
              <span class="text-sm text-neutral-500">72%</span>
            </div>
            <div class="w-full bg-neutral-200 rounded-full h-1.5">
              <div class="bg-neutral-500 h-1.5 rounded-full" style="width: 72%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-neutral-600">Projekte</span>
              <span class="text-sm text-neutral-500">45%</span>
            </div>
            <div class="w-full bg-neutral-200 rounded-full h-1.5">
              <div class="bg-neutral-500 h-1.5 rounded-full" style="width: 45%"></div>
            </div>
          </div>
        </div>
      </div>
    
    </section>
  </div>
</template>


<script setup>
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'

const overall = 68

const TaskItem = {
  props: { title: String, due: String, prio: String },
  computed: {
    chipClass(){
      const map = {
        'Hoch':   'bg-red-50 text-red-700 ring-red-100',
        'Mittel': 'bg-amber-50 text-amber-700 ring-amber-100',
        'Niedrig':'bg-emerald-50 text-emerald-700 ring-emerald-100'
      }
      return `px-2 py-0.5 text-xs rounded-full ring-1 ${map[this.prio] || 'bg-gray-50 text-gray-700 ring-gray-200'}`
    }
  },
  template: `
    <li class="bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3">
      <div class="flex items-center justify-between">
        <div class="font-medium">{{ title }}</div>
        <span :class="chipClass">{{ prio }}</span>
      </div>
      <div class="text-xs text-gray-500 mt-1">Fällig: {{ due }}</div>
    </li>
  `
}

const EventItem = {
  props: { day: String, month: String, title: String, time: String },
  template: `
    <li class="bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3 flex items-center gap-3">
      <div class="w-12 text-center rounded-md bg-slate-900 text-white">
        <div class="text-[10px] tracking-widest pt-1">{{ month }}</div>
        <div class="text-lg font-bold -mt-1">{{ day }}</div>
      </div>
      <div class="flex-1">
        <div class="font-medium">{{ title }}</div>
        <div class="text-xs text-gray-500">{{ time }}</div>
      </div>
    </li>
  `
}

const Star = {
  props: { filled: Boolean },
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
         :class="filled ? 'fill-yellow-400' : 'fill-gray-300'"
         class="w-4 h-4">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
    </svg>
  `
}

const Progress = {
  props: { label: String, value: Number },
  template: `
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm text-gray-600">{{ label }}</span>
        <span class="text-sm font-medium text-gray-800">{{ value }}%</span>
      </div>
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-slate-900 rounded-full" :style="{ width: value + '%' }"></div>
      </div>
    </div>
  `
}
</script>