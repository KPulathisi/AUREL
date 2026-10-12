<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Users, Maximize2, BedDouble, Eye, Expand, CalendarDays } from 'lucide-vue-next'
import MediaFrame from './MediaFrame.vue'
import RoomGallery from './RoomGallery.vue'
import { useData, money } from '../composables/useData.js'
import { gsap, reducedMotion } from '../composables/useMotion.js'

const props = defineProps({ initial: { type: String, default: '' }, syncRoute: Boolean })
const { rooms } = useData()
const router = useRouter()
const sel = ref(Math.max(0, rooms.findIndex((r) => r.id === props.initial)))
const room = computed(() => rooms[sel.value])
const stage = ref(null), info = ref(null), gallery = ref(null)
const shown = ref(room.value.media.hero)   // media currently on stage
const prev = ref(null)                     // media fading out underneath

watch(() => props.initial, (id) => { const i = rooms.findIndex((r) => r.id === id); if (i > -1) sel.value = i })

// New image wipes in over the previous one
async function swapTo(m) {
  if (m === shown.value) return
  prev.value = shown.value
  shown.value = m
  await nextTick()
  if (reducedMotion) { prev.value = null; return }
  gsap.fromTo(stage.value.querySelector('.st-new'), { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.1, ease: 'expo.inOut', onComplete: () => (prev.value = null) })
  gsap.fromTo(stage.value.querySelector('.st-new .mf-inner'), { scale: 1.15 }, { scale: 1, duration: 1.6, ease: 'expo.out' })
}
async function select(i) {
  if (i === sel.value) return
  sel.value = i
  if (props.syncRoute) router.replace(`/rooms/${rooms[i].id}`)
  await swapTo(rooms[i].media.hero)
  if (!reducedMotion) gsap.fromTo(info.value.children, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.05 })
}
function onKey(e, i) {
  const n = rooms.length
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((i + 1) % n); nextTick(() => document.getElementById(`tab-${rooms[(i + 1) % n].id}`)?.focus()) }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((i - 1 + n) % n); nextTick(() => document.getElementById(`tab-${rooms[(i - 1 + n) % n].id}`)?.focus()) }
}
function openGallery(i, e) { gallery.value.show(i, e.currentTarget.querySelector('.mf') || e.currentTarget) }
</script>

<template>
  <section class="explorer section" aria-labelledby="explorer-title">
    <div class="wrap">
      <div class="ex-head">
        <span class="kicker">Room explorer</span>
        <h2 id="explorer-title" v-split>Find your room</h2>
      </div>
      <div class="tabs" role="tablist" aria-label="Room categories">
        <button v-for="(r, i) in rooms" :id="`tab-${r.id}`" :key="r.id" role="tab" :aria-selected="sel === i" :aria-controls="`panel-${r.id}`" :tabindex="sel === i ? 0 : -1" :class="{ on: sel === i }" @click="select(i)" @keydown="onKey($event, i)">
          <span class="t-no">0{{ i + 1 }}</span>{{ r.name }}
        </button>
      </div>

      <div :id="`panel-${room.id}`" class="ex-body" role="tabpanel" :aria-labelledby="`tab-${room.id}`">
        <div ref="stage" class="stage" data-cursor="View" role="button" tabindex="0" :aria-label="`Open ${room.name} gallery`" @click="openGallery(room.media.gallery.indexOf(shown) > -1 ? room.media.gallery.indexOf(shown) : 0, $event)" @keydown.enter="openGallery(0, $event)">
          <div v-if="prev" class="st-old"><MediaFrame :id="prev" fill sizes="(min-width: 900px) 60vw, 100vw" /></div>
          <div :key="shown" class="st-new"><MediaFrame :id="shown" fill eager sizes="(min-width: 900px) 60vw, 100vw" /></div>
          <span class="st-hint"><Expand aria-hidden="true" /> Gallery</span>
        </div>

        <div ref="info" class="info">
          <p class="it tag">{{ room.tagline }}</p>
          <h3>{{ room.name }}</h3>
          <p class="desc">{{ room.longDescription }}</p>
          <dl class="specs">
            <div><dt><Users aria-hidden="true" />Guests</dt><dd>Up to {{ room.guests }} ({{ room.adults }} adults{{ room.children ? `, ${room.children} child${room.children > 1 ? 'ren' : ''}` : '' }})</dd></div>
            <div><dt><Maximize2 aria-hidden="true" />Size</dt><dd>{{ room.size }} m²</dd></div>
            <div><dt><BedDouble aria-hidden="true" />Beds</dt><dd>{{ room.bed }}</dd></div>
            <div><dt><Eye aria-hidden="true" />View</dt><dd>{{ room.view }}</dd></div>
          </dl>
          <ul class="amen"><li v-for="a in room.amenities" :key="a">{{ a }}</li></ul>
          <div class="foot">
            <p class="price">{{ money(room.price) }}<span> / night, indicative</span></p>
            <RouterLink :to="{ path: '/book', query: { room: room.id } }" class="btn solid"><CalendarDays aria-hidden="true" />Plan a stay</RouterLink>
          </div>
          <div class="thumbs" aria-label="Gallery">
            <button v-for="(m, i) in room.media.gallery" :key="m" :class="{ on: m === shown }" :aria-label="`Open image ${i + 1} of ${room.media.gallery.length}`" data-cursor="Open" @click="openGallery(i, $event)" @mouseenter="swapTo(m)" @focus="swapTo(m)">
              <MediaFrame :id="m" sizes="160px" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <RoomGallery ref="gallery" :items="room.media.gallery" :title="room.name" />
  </section>
</template>

<style scoped>
.explorer { background: var(--paper); }
.ex-head { margin-bottom: 2rem; }
.tabs { display: flex; gap: .5rem; border-bottom: 1px solid var(--line); margin-bottom: clamp(2rem, 4vw, 3.5rem); overflow-x: auto; }
.tabs button { background: none; border: 0; padding: 1rem 1.4rem 1.1rem; font: 400 var(--step-1)/1 var(--serif); color: var(--ink-soft); cursor: pointer; position: relative; white-space: nowrap; display: inline-flex; gap: .7rem; align-items: baseline; }
.t-no { font: 400 .75rem/1 var(--sans); color: var(--olive); }
.tabs button::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--charcoal); transform: scaleX(0); transition: transform .6s var(--ease); }
.tabs button.on { color: var(--charcoal); }
.tabs button.on::after, .tabs button:hover::after { transform: scaleX(1); }
.tabs button:hover:not(.on)::after { background: var(--sand-deep); }
.ex-body { display: grid; grid-template-columns: 1.35fr 1fr; gap: clamp(2rem, 4vw, 4rem); align-items: start; }
.stage { position: relative; aspect-ratio: 4 / 3; overflow: hidden; cursor: pointer; position: sticky; top: 90px; }
.st-old, .st-new { position: absolute; inset: 0; }
.st-hint { position: absolute; right: 1rem; bottom: 1rem; display: inline-flex; gap: .4rem; align-items: center; font-size: .78rem; background: rgba(248, 244, 236, .9); padding: .45rem .8rem; border-radius: 999px; z-index: 2; }
.st-hint svg { width: 14px; height: 14px; }
.tag { color: var(--olive); font-size: var(--step-1); margin: 0 0 .3rem; }
.info h3 { font-size: var(--step-4); margin-bottom: 1rem; }
.desc { color: var(--ink-soft); }
.specs { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 2rem; margin: 1.6rem 0; padding: 1.4rem 0; border-block: 1px solid var(--line); }
.specs div { display: grid; gap: .2rem; }
.specs dt { display: flex; gap: .45rem; align-items: center; font-size: .78rem; color: var(--ink-soft); letter-spacing: .03em; }
.specs dt svg { width: 14px; height: 14px; color: var(--olive); }
.specs dd { margin: 0; }
.amen { list-style: none; padding: 0; margin: 0 0 1.6rem; display: flex; flex-wrap: wrap; gap: .5rem; font-size: var(--step--1); }
.amen li { padding: .4rem .85rem; border: 1px solid var(--line); border-radius: 999px; }
.foot { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.price { font-family: var(--serif); font-size: var(--step-3); margin: 0; }
.price span { font: 400 var(--step--1) var(--sans); color: var(--ink-soft); }
.thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: .7rem; margin-top: 2rem; }
.thumbs button { padding: 0; border: 0; background: none; cursor: pointer; position: relative; overflow: hidden; opacity: .6; transition: opacity .4s; }
.thumbs button.on, .thumbs button:hover, .thumbs button:focus-visible { opacity: 1; }
.thumbs button::after { content: ''; position: absolute; inset: 0; border: 2px solid var(--charcoal); opacity: 0; transition: opacity .4s; }
.thumbs button.on::after { opacity: 1; }
.thumbs :deep(.mf) { aspect-ratio: 4 / 3 !important; }
@media (max-width: 960px) { .ex-body { grid-template-columns: 1fr; } .stage { position: relative; top: 0; } }
</style>
