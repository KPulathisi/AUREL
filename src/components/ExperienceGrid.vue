<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { X, Clock, CalendarDays } from 'lucide-vue-next'
import MediaFrame from './MediaFrame.vue'
import { useData } from '../composables/useData.js'
import { gsap, Flip, reducedMotion, stopScroll } from '../composables/useMotion.js'

defineProps({ heading: { type: Boolean, default: true } })
const { experiences } = useData()
const active = ref(null)
const detailMedia = ref(null), closeBtn = ref(null)
let origin = null

async function open(e, x) {
  origin = e.currentTarget
  const state = reducedMotion ? null : Flip.getState(origin.querySelector('.xg-media'))
  active.value = x
  stopScroll(true)
  await nextTick()
  if (state) {
    Flip.from(state, { targets: detailMedia.value, duration: 1, ease: 'expo.inOut', absolute: true, scale: true })
    gsap.from('.xd-text > *', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: 0.45 })
  }
  closeBtn.value?.focus()
}
async function close() {
  if (!reducedMotion && detailMedia.value) await gsap.to('.xdetail', { opacity: 0, duration: 0.4 })
  active.value = null
  stopScroll(false)
  origin?.focus()
}
const onKey = (e) => { if (e.key === 'Escape' && active.value) close() }
window.addEventListener('keydown', onKey)
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section class="xp section" aria-labelledby="xp-title">
    <div v-if="heading" class="wrap head">
      <span class="kicker">Curated experiences</span>
      <h2 id="xp-title" v-split>Days shaped by the coast</h2>
    </div>
    <div class="wrap xgrid">
      <button v-for="x in experiences" :key="x.id" :class="['xg', x.shape]" data-cursor="Discover" :aria-label="`${x.title}: ${x.short}`" @click="open($event, x)">
        <div v-reveal.center class="xg-media"><MediaFrame :id="x.media" fill sizes="(min-width: 900px) 40vw, 100vw" /></div>
        <div class="xg-cap">
          <span class="xg-when it">{{ x.when }}</span>
          <h3>{{ x.title }}</h3>
          <p class="xg-short">{{ x.short }}</p>
        </div>
      </button>
    </div>

    <Teleport to="body">
      <div v-if="active" class="xdetail" role="dialog" aria-modal="true" :aria-labelledby="`xd-${active.id}`" @click.self="close">
        <div class="xd-inner">
          <div ref="detailMedia" class="xd-media"><MediaFrame :id="active.media" fill sizes="(min-width: 900px) 50vw, 100vw" /></div>
          <div class="xd-text">
            <span class="kicker">{{ active.when }}</span>
            <h3 :id="`xd-${active.id}`">{{ active.title }}</h3>
            <p class="lede">{{ active.short }}</p>
            <p>{{ active.long }}</p>
            <ul class="xd-facts"><li><Clock aria-hidden="true" />{{ active.duration }}</li><li><CalendarDays aria-hidden="true" />{{ active.when }}</li></ul>
            <RouterLink to="/book" class="btn" @click="close">Ask about this experience</RouterLink>
          </div>
          <button ref="closeBtn" class="xd-close" aria-label="Close" @click="close"><X /></button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.head { margin-bottom: clamp(3rem, 6vw, 5rem); }
.xgrid { display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: clamp(140px, 13vw, 210px); gap: clamp(1rem, 2vw, 1.6rem); grid-auto-flow: dense; }
.xg { position: relative; padding: 0; border: 0; background: var(--sand); cursor: pointer; text-align: left; color: var(--paper); overflow: hidden; font: inherit; }
.xg.tall { grid-column: span 2; grid-row: span 4; }
.xg.wide { grid-column: span 4; grid-row: span 2; }
.xg.square { grid-column: span 2; grid-row: span 2; }
.xg-media { position: absolute; inset: 0; }
.xg-media :deep(.mf-inner) { transition: transform 1.6s var(--ease); }
.xg:hover .xg-media :deep(.mf-inner), .xg:focus-visible .xg-media :deep(.mf-inner) { transform: scale(1.07); }
.xg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(20, 39, 41, .78)); transition: opacity .6s; }
.xg-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: clamp(1rem, 2vw, 1.6rem); z-index: 2; }
.xg-when { font-size: var(--step--1); color: var(--sand); }
.xg h3 { font-size: var(--step-2); margin: .2rem 0 0; color: var(--paper); }
.xg-short { margin: 0; max-height: 0; opacity: 0; overflow: hidden; font-size: var(--step--1); color: rgba(248, 244, 236, .88); transition: max-height .7s var(--ease), opacity .5s, margin .7s var(--ease); }
.xg:hover .xg-short, .xg:focus-visible .xg-short { max-height: 6em; opacity: 1; margin-top: .5rem; }
.xdetail { position: fixed; inset: 0; z-index: 250; background: rgba(20, 39, 41, .55); backdrop-filter: blur(6px); display: grid; place-items: center; padding: 3vh 3vw; }
.xd-inner { position: relative; width: min(1200px, 100%); max-height: 94vh; background: var(--ivory); display: grid; grid-template-columns: 1.1fr 1fr; overflow: hidden; }
.xd-media { position: relative; min-height: 70vh; }
.xd-text { padding: clamp(2rem, 4vw, 4rem); overflow-y: auto; align-self: center; }
.xd-text h3 { font-size: var(--step-4); }
.xd-facts { list-style: none; padding: 0; display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: var(--step--1); margin: 1.4rem 0 2rem; }
.xd-facts li { display: inline-flex; align-items: center; gap: .4rem; }
.xd-facts svg { width: 1em; color: var(--olive); }
.xd-close { position: absolute; top: 1rem; right: 1rem; width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--line); background: var(--ivory); cursor: pointer; display: grid; place-items: center; }
.xd-close svg { width: 20px; }
@media (max-width: 900px) {
  .xgrid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
  .xg.wide { grid-column: span 2; grid-row: span 2; }
  .xg.tall { grid-column: span 1; grid-row: span 2; }
  .xg.square { grid-column: span 1; grid-row: span 2; }
  .xg-short { max-height: none; opacity: 1; margin-top: .4rem; display: none; }
  .xd-inner { grid-template-columns: 1fr; overflow-y: auto; }
  .xd-media { min-height: 40vh; }
}
</style>
