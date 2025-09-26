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
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold">Offene Aufgaben</h2>
          <button class="text-gray-400 hover:text-gray-600">⋮</button>
        </div>
        <ul class="space-y-3">
          <TaskItem title="Projektdokumentation" due="15.01.2025" prio="Hoch" />
          <TaskItem title="Wochenbericht"       due="12.01.2025" prio="Mittel" />
          <TaskItem title="Schulungsnachweis"   due="20.01.2025" prio="Niedrig" />
        </ul>
      </div>

      <!-- Nächste Termine -->
      <div class="bg-white rounded-xl border p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold">Nächste Termine</h2>
          <CalendarDaysIcon class="w-5 h-5 text-gray-400" />
        </div>
        <ul class="space-y-3">
          <EventItem day="10" month="JAN" title="Teammeeting"        time="09:00 - 10:30" />
          <EventItem day="12" month="JAN" title="Ausbildergespräch"  time="14:00 - 15:00" />
          <EventItem day="15" month="JAN" title="Berufsschule"       time="08:00 - 15:30" />
        </ul>
      </div>

      <!-- Letztes Feedback -->
      <div class="bg-white rounded-xl border p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold">Letztes Feedback</h2>
          <button class="text-gray-400 hover:text-gray-600">💬</button>
        </div>
        <div class="flex items-start gap-3">
          <img class="w-10 h-10 rounded-full ring-1 ring-gray-200" src="https://api.dicebear.com/7.x/thumbs/svg?seed=herr" alt="avatar" />
          <div class="flex-1">
            <div class="text-sm">
              <span class="font-medium">Herr Schmidt</span>
              <span class="text-gray-500"> vor 2 Tagen</span>
            </div>
            <p class="text-sm text-gray-700 mt-1">
              Sehr gute Arbeit bei der letzten Projektpräsentation. Besonders die strukturierte Herangehensweise war beeindruckend.
            </p>
            <div class="mt-2 flex items-center gap-1">
              <Star v-for="i in 5" :key="i" :filled="i<=4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lernfortschritt (separat darunter) -->
    <section class="bg-white rounded-xl border p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold">Lernfortschritt</h2>
        <div class="text-sm text-gray-500"><span class="font-medium">{{ overall }}%</span> abgeschlossen</div>
      </div>

      <Progress label="Gesamtfortschritt" :value="overall" class="mb-6" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Progress label="Theorie"  :value="85" />
        <Progress label="Praxis"   :value="72" />
        <Progress label="Projekte" :value="45" />
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