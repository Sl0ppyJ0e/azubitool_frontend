<template>
  <div class="bg-white p-4 rounded shadow flex items-center justify-between">
    <div>
      <div class="text-sm text-gray-500">Timer</div>
      <div class="text-2xl font-mono">{{ formatTime(elapsed) }}</div>
      <div class="text-xs text-gray-400">Aktiv: {{ currentTitle || '—' }}</div>
    </div>
    <div class="space-x-2">
      <button @click="toggle" class="px-3 py-1 rounded bg-blue-600 text-white">{{ running ? 'Stop' : 'Start' }}</button>
      <button @click="reset" class="px-3 py-1 rounded bg-gray-200">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
const props = defineProps({ task: { type: Object, default: null } })
const emit = defineEmits(['tick','start','stop'])

const running = ref(false)
const elapsed = ref(0)
const currentTitle = ref(props.task?.title || null)
let timer = null

watch(()=>props.task, (v) => { currentTitle.value = v?.title || null })

const tick = () => {
  elapsed.value += 1
  emit('tick', elapsed.value)
}

const toggle = () => {
  if (running.value) {
    running.value = false
    clearInterval(timer)
    emit('stop', elapsed.value)
  } else {
    running.value = true
    timer = setInterval(tick, 1000)
    emit('start')
  }
}

const reset = () => { elapsed.value = 0 }

const formatTime = (s) => {
  const h = Math.floor(s/3600).toString().padStart(2,'0')
  const m = Math.floor((s%3600)/60).toString().padStart(2,'0')
  const sec = (s%60).toString().padStart(2,'0')
  return `${h}:${m}:${sec}`
}

onUnmounted(()=> clearInterval(timer))
</script>
