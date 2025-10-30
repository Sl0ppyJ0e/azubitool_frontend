<template>
  <flat-pickr
    ref="flatPickrRef"
    v-model="modelProxy"
    :config="config"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
</template>


<script setup>
import { computed, ref, watch } from 'vue'
import flatpickr from 'flatpickr'
import { German as deLocale } from 'flatpickr/dist/l10n/de.js'
const LOCALE_LOADERS = {
  de: async () => (await import('flatpickr/dist/l10n/de.js')).German,
  en: async () => undefined, // en = built-in
  fr: async () => (await import('flatpickr/dist/l10n/fr.js')).French,
  it: async () => (await import('flatpickr/dist/l10n/it.js')).Italian,
  es: async () => (await import('flatpickr/dist/l10n/es.js')).Spanish,
  nl: async () => (await import('flatpickr/dist/l10n/nl.js')).Dutch,
  pl: async () => (await import('flatpickr/dist/l10n/pl.js')).Polish,
}

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: { type: [String, Date, null], default: null },
  minDate:    { type: [String, Date, null], default: 'today' },
  constrainFrom: { type: [String, Date, null], default: null }, // z.B. Start
  minOffsetMinutes: { type: Number, default: 0 },               // z.B. 5 Minuten nach Start
  locale: { type: [String, Object], default: 'de' },              

  // Anzeige-Format
  enableTime: { type: Boolean, default: true },
  dateFormat: { type: String,  default: 'Y-m-d\\TH:i' },
  altFormat:  { type: String,  default: 'F j, Y – H:i' },
  altInput:   { type: Boolean, default: true },
  time24hr:   { type: Boolean, default: true },

  placeholder: { type: String, default: '' },
})

const localeObj = ref(deLocale)
async function resolveLocale(val) {
  if (!val) { localeObj.value = deLocale; return }
  if (typeof val === 'object') { localeObj.value = val; return }
  const loader = LOCALE_LOADERS[(val || '').toLowerCase()]
  localeObj.value = loader ? await loader() : deLocale
}
watch(() => props.locale, resolveLocale, { immediate: true })

const emit = defineEmits(['update:modelValue', 'change'])
const flatPickrRef = ref(null) // <flat-pickr> instance

const toDate = (v) => {
  if (!v) return null
  if (v instanceof Date) return v
  return flatpickr.parseDate(v, props.dateFormat) || new Date(v)
}
const sameDay = (a, b) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const anchorRaw = computed(() => toDate(props.constrainFrom))
const anchorPlusOffset = computed(() => {
  const a = anchorRaw.value
  if (!a) return null
  return new Date(a.getTime() + props.minOffsetMinutes * 60000)
})
const minDateForCalendar = computed(() => {
  // wenn offset in den nächsten Tag rollt -> dessen Datum als minDate
  const g = anchorPlusOffset.value
  if (g) return new Date(g.getFullYear(), g.getMonth(), g.getDate())
  return props.minDate
})

const modelProxy = computed({
  get: () => props.modelValue,
  set: (v) => { emit('update:modelValue', v); emit('change', v) }
})

// Guards anwenden (constrainFrom + minOffsetMinutes)
function applyGuards(fp) {
  //  alles vor (anchor+offset)-Tag sperren
  fp.set('minDate', minDateForCalendar.value ?? props.minDate)

  // Uhrzeit: nur einschränken, wenn ausgewählter Tag == (anchor+offset)-Tag
  const guard = anchorPlusOffset.value
  const sel   = fp.selectedDates?.[0] || toDate(props.modelValue)
  if (!guard) { fp.set('minTime', null); return }

  if (sel && sameDay(sel, guard)) {
    fp.set('minTime', flatpickr.formatDate(guard, 'H:i'))
  } else {
    // Falls kein Datum gewählt ist, aber der Kalender auf den Guard-Tag gesetzt wird,
    // greifen wir in onOpen/onReady/onChange unten.
    fp.set('minTime', null)
  }
}

const config = computed(() => ({
  enableTime: props.enableTime,
  time_24hr:  props.time24hr,
  altInput:   props.altInput,
  altFormat:  props.altFormat,
  dateFormat: props.dateFormat,
  locale: localeObj.value,

  // Basis-Minimum (wird in applyGuards ggf. dynamisch verschärft)
  minDate: minDateForCalendar.value ?? props.minDate,

  onOpen:  (_sel, _str, fp) => applyGuards(fp),
  onReady: (_sel, _str, fp) => applyGuards(fp),
  onChange:(_sel, _str, fp) => applyGuards(fp),
}))


// Reagiere auf Änderungen von constrainFrom/minOffsetMinutes
watch([anchorPlusOffset, minDateForCalendar], () => {
  const fp = flatPickrRef.value?.fp
  if (fp) applyGuards(fp)
})
</script>
