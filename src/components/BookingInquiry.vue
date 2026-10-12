<script setup>
/**
 * Client-side booking inquiry. Calculates nights and an indicative total in the browser.
 * Nothing is sent or reserved: the visitor can copy, print or email the summary themselves.
 */
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Minus, Plus, Copy, Printer, Mail, Check, RotateCcw } from 'lucide-vue-next'
import { useData, money } from '../composables/useData.js'
import { gsap, reducedMotion } from '../composables/useMotion.js'

const props = defineProps({ tone: { type: String, default: 'light' } })
const { rooms, resort } = useData()
const route = useRoute()
const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
const today = iso(new Date())
const plus = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return iso(d) }

const f = reactive({ arrival: plus(today, 14), departure: plus(today, 18), adults: 2, children: 0, room: rooms.find((r) => r.id === route.query.room)?.id || rooms[0].id })
const room = computed(() => rooms.find((r) => r.id === f.room))
watch(() => route.query.room, (id) => { if (rooms.some((r) => r.id === id)) f.room = id })
const nights = computed(() => {
  const a = new Date(f.arrival + 'T00:00:00'), d = new Date(f.departure + 'T00:00:00')
  return Math.round((d - a) / 86400000)
})
const total = computed(() => (nights.value > 0 ? nights.value * room.value.price : 0))

const errors = computed(() => {
  const e = {}
  if (!f.arrival) e.arrival = 'Choose an arrival date.'
  else if (f.arrival < today) e.arrival = 'Arrival can’t be in the past.'
  if (!f.departure) e.departure = 'Choose a departure date.'
  else if (nights.value < 1) e.departure = 'Departure must be after arrival.'
  else if (nights.value > 30) e.departure = 'For stays over 30 nights, please contact us directly.'
  if (f.adults < 1) e.adults = 'At least one adult is required.'
  if (f.adults > room.value.adults) e.adults = `The ${room.value.name} sleeps up to ${room.value.adults} adults.`
  if (f.children > room.value.children) e.children = `The ${room.value.name} has space for up to ${room.value.children} child${room.value.children === 1 ? '' : 'ren'}.`
  if (f.adults + f.children > room.value.guests) e.guests = `Maximum ${room.value.guests} guests for this room.`
  return e
})
const valid = computed(() => Object.keys(errors.value).length === 0)
const touched = ref(false)
const summary = ref(null)
const copied = ref(false)
const panel = ref(null)

const fmtDate = (s) => new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
const ref6 = () => 'AUR-' + Math.random().toString(36).slice(2, 8).toUpperCase()

async function prepare() {
  touched.value = true
  if (!valid.value) return
  summary.value = { ref: ref6(), room: room.value.name, arrival: f.arrival, departure: f.departure, nights: nights.value, adults: f.adults, children: f.children, rate: room.value.price, total: total.value }
  await nextTick()
  if (!reducedMotion) gsap.from(panel.value.querySelector('.summary'), { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out' })
}
const summaryText = computed(() => {
  const s = summary.value
  if (!s) return ''
  return [
    `AUREL stay estimate (${s.ref})`,
    `Room: ${s.room}`,
    `Arrival: ${fmtDate(s.arrival)}`,
    `Departure: ${fmtDate(s.departure)}`,
    `Nights: ${s.nights}`,
    `Guests: ${s.adults} adult${s.adults > 1 ? 's' : ''}${s.children ? `, ${s.children} child${s.children > 1 ? 'ren' : ''}` : ''}`,
    `Indicative nightly rate: ${money(s.rate)}`,
    `Indicative total: ${money(s.total)} (taxes and service not included)`,
    '',
    'Estimate only. Availability is not confirmed and no booking has been made. AUREL is a fictional resort.'
  ].join('\n')
})
const mailto = computed(() => `mailto:${resort.contact.email}?subject=${encodeURIComponent(`Stay inquiry ${summary.value?.ref || ''}`)}&body=${encodeURIComponent(summaryText.value + '\n\nName:\nMessage:\n')}`)

async function copy() {
  try { await navigator.clipboard.writeText(summaryText.value) } catch {
    const ta = document.createElement('textarea'); ta.value = summaryText.value; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove()
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2200)
}
function print() {
  document.body.classList.add('print-summary')
  window.print()
  setTimeout(() => document.body.classList.remove('print-summary'), 500)
}
function reset() { summary.value = null; touched.value = false }
const step = (k, d, min, max) => { f[k] = Math.min(max, Math.max(min, f[k] + d)) }
</script>

<template>
  <div ref="panel" :class="['booking', tone]">
    <form v-if="!summary" class="form" novalidate @submit.prevent="prepare">
      <fieldset class="rooms-pick">
        <legend>Room</legend>
        <label v-for="r in rooms" :key="r.id" :class="['rp', { on: f.room === r.id }]">
          <input v-model="f.room" type="radio" name="room" :value="r.id" class="sr-only" />
          <span class="rp-n">{{ r.name }}</span>
          <span class="rp-p">{{ money(r.price) }} / night · up to {{ r.guests }}</span>
        </label>
      </fieldset>

      <div class="row2">
        <label class="fld"><span>Arrival</span><input v-model="f.arrival" type="date" :min="today" :aria-invalid="touched && !!errors.arrival" aria-describedby="err-arr" /></label>
        <label class="fld"><span>Departure</span><input v-model="f.departure" type="date" :min="plus(f.arrival || today, 1)" :aria-invalid="touched && !!errors.departure" aria-describedby="err-dep" /></label>
      </div>
      <p v-if="touched && errors.arrival" id="err-arr" class="err">{{ errors.arrival }}</p>
      <p v-if="touched && errors.departure" id="err-dep" class="err">{{ errors.departure }}</p>

      <div class="row2">
        <div class="fld"><span id="lbl-ad">Adults</span>
          <div class="stepper" role="group" aria-labelledby="lbl-ad">
            <button type="button" aria-label="Fewer adults" @click="step('adults', -1, 1, 8)"><Minus /></button>
            <output aria-live="polite">{{ f.adults }}</output>
            <button type="button" aria-label="More adults" @click="step('adults', 1, 1, 8)"><Plus /></button>
          </div>
        </div>
        <div class="fld"><span id="lbl-ch">Children</span>
          <div class="stepper" role="group" aria-labelledby="lbl-ch">
            <button type="button" aria-label="Fewer children" @click="step('children', -1, 0, 6)"><Minus /></button>
            <output aria-live="polite">{{ f.children }}</output>
            <button type="button" aria-label="More children" @click="step('children', 1, 0, 6)"><Plus /></button>
          </div>
        </div>
      </div>
      <p v-for="k in ['adults', 'children', 'guests']" v-show="errors[k]" :key="k" class="err" role="alert">{{ errors[k] }}</p>

      <div class="calc" aria-live="polite">
        <div><span>Nightly rate</span><strong>{{ money(room.price) }}</strong></div>
        <div><span>Nights</span><strong>{{ nights > 0 ? nights : '–' }}</strong></div>
        <div class="tot"><span>Estimated total</span><strong>{{ total ? money(total) : '–' }}</strong></div>
      </div>
      <button type="submit" class="btn solid wide" :disabled="touched && !valid">Prepare my estimate</button>
      <p class="fine">Indicative prices only. Availability is not checked and nothing is reserved. Taxes and service are not included.</p>
    </form>

    <div v-else class="summary">
      <p class="s-ref">Estimate reference {{ summary.ref }}</p>
      <h3>Your stay at AUREL</h3>
      <dl>
        <div><dt>Room</dt><dd>{{ summary.room }}</dd></div>
        <div><dt>Arrival</dt><dd>{{ fmtDate(summary.arrival) }}</dd></div>
        <div><dt>Departure</dt><dd>{{ fmtDate(summary.departure) }}</dd></div>
        <div><dt>Nights</dt><dd>{{ summary.nights }}</dd></div>
        <div><dt>Guests</dt><dd>{{ summary.adults }} adult{{ summary.adults > 1 ? 's' : '' }}<template v-if="summary.children">, {{ summary.children }} child{{ summary.children > 1 ? 'ren' : '' }}</template></dd></div>
        <div><dt>Nightly rate</dt><dd>{{ money(summary.rate) }}</dd></div>
        <div class="tot"><dt>Indicative total</dt><dd>{{ money(summary.total) }}</dd></div>
      </dl>
      <p class="fine strong">This is an estimate, not a booking. Availability is not confirmed and no inquiry has been sent. AUREL is a fictional resort.</p>
      <div class="actions no-print">
        <button type="button" class="btn" @click="copy"><component :is="copied ? Check : Copy" aria-hidden="true" />{{ copied ? 'Copied' : 'Copy summary' }}</button>
        <button type="button" class="btn" @click="print"><Printer aria-hidden="true" />Print</button>
        <a :href="mailto" class="btn solid"><Mail aria-hidden="true" />Write an email</a>
        <button type="button" class="reset link-line" @click="reset"><RotateCcw aria-hidden="true" />Change details</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.booking { background: var(--paper); color: var(--charcoal); padding: clamp(1.5rem, 3vw, 2.6rem); border: 1px solid var(--line); }
.form { display: grid; gap: 1.1rem; }
legend, .fld > span { font-size: .75rem; letter-spacing: .06em; color: var(--ink-soft); margin-bottom: .45rem; display: block; padding: 0; }
.rooms-pick { border: 0; padding: 0; margin: 0; display: grid; gap: .5rem; }
.rp { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; padding: .85rem 1rem; border: 1px solid var(--line); cursor: pointer; transition: border-color .3s, background .3s; }
.rp.on { border-color: var(--charcoal); background: var(--ivory); }
.rp:focus-within { outline: 2px solid var(--olive); outline-offset: 2px; }
.rp-n { font-family: var(--serif); font-size: var(--step-1); }
.rp-p { font-size: .78rem; color: var(--ink-soft); }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.fld input { width: 100%; padding: .8rem .9rem; border: 1px solid var(--line); background: var(--ivory); border-radius: 0; font-size: var(--step-0); }
.fld input[aria-invalid='true'] { border-color: #8c3b2a; }
.stepper { display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--line); background: var(--ivory); }
.stepper button { width: 46px; height: 46px; border: 0; background: none; cursor: pointer; display: grid; place-items: center; color: var(--charcoal); }
.stepper button:hover { background: var(--sand); }
.stepper svg { width: 16px; }
.stepper output { font-family: var(--serif); font-size: var(--step-1); }
.err { color: #8c3b2a; font-size: .82rem; margin: -.4rem 0 0; }
.calc { display: grid; grid-template-columns: 1fr 1fr 1.4fr; gap: 1rem; padding: 1rem 0; border-block: 1px solid var(--line); }
.calc div { display: grid; gap: .1rem; }
.calc span { font-size: .72rem; color: var(--ink-soft); }
.calc strong { font-family: var(--serif); font-weight: 400; font-size: var(--step-1); }
.calc .tot strong { font-size: var(--step-2); }
.wide { justify-content: center; width: 100%; }
.fine { font-size: .74rem; color: var(--ink-soft); margin: 0; }
.fine.strong { color: var(--charcoal); margin: 1rem 0; }
.summary h3 { font-size: var(--step-3); }
.s-ref { font-size: .78rem; color: var(--olive); margin-bottom: .4rem; letter-spacing: .04em; }
.summary dl { margin: 1rem 0; }
.summary dl div { display: flex; justify-content: space-between; gap: 1rem; padding: .6rem 0; border-bottom: 1px solid var(--line); }
.summary dt { color: var(--ink-soft); font-size: var(--step--1); }
.summary dd { margin: 0; text-align: right; }
.summary .tot dd { font-family: var(--serif); font-size: var(--step-2); }
.actions { display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; }
.actions .btn { padding: .8rem 1.1rem; }
.reset { background: none; border: 0; cursor: pointer; display: inline-flex; gap: .4rem; align-items: center; font: inherit; font-size: var(--step--1); color: var(--ink-soft); margin-left: .4rem; }
.reset svg { width: 14px; }
@media (max-width: 560px) { .row2, .calc { grid-template-columns: 1fr; } }
</style>

<style>
@media print {
  body.print-summary * { visibility: hidden; }
  body.print-summary .summary, body.print-summary .summary * { visibility: visible; }
  body.print-summary .summary { position: absolute; left: 0; top: 0; width: 100%; padding: 2cm; }
}
</style>
