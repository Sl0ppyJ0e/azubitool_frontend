<template>
  <aside class="w-64 shrink-0">
    <nav class="bg-white border rounded-xl p-2 sticky top-4">
      <ul class="space-y-1">
        <li v-for="l in links" :key="l.to">
          <RouterLink
            :to="l.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition"
            :class="route.path === l.to
              ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
              : 'text-gray-700 hover:bg-gray-50'">
            <component :is="l.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ l.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<script setup>
import { RouterLink, useRoute } from 'vue-router'
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const links = [
  { to: '/',              text: 'Dashboard',        icon: ChartBarIcon },
  { to: '/tasks',         text: 'Aufgaben',         icon: ClipboardDocumentListIcon },
  { to: '/calendar',      text: 'Kalender',         icon: CalendarDaysIcon },
  { to: '/documents',     text: 'Dokumente',        icon: FolderIcon },
  { to: '/feedback',      text: 'Feedback',         icon: ChatBubbleLeftRightIcon },
  { to: '/trainees',      text: 'Azubis',           icon: ClipboardDocumentListIcon },
  { to: '/trainees/:id',  text: 'Azubi - Details',  icon: ChatBubbleLeftRightIcon },
]
</script>
