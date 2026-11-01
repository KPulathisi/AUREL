<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { gsap, reducedMotion, stopScroll } from '../composables/useMotion.js'
import MediaFrame from './MediaFrame.vue'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const hidden = ref(false)
let lastY = 0

const links = [
  { to: '/rooms', label: 'Rooms', media: 'room-ocean-1' },
  { to: '/experiences', label: 'Experiences', media: 'exp-yoga' },
  { to: '/dining', label: 'Dining', media: 'dining-1' },
  { to: '/resort', label: 'The Resort', media: 'arch-2' },
  { to: '/book', label: 'Plan your stay', media: 'cta-poster' }
]
const hoverMedia = ref(links[0].media)
const overHero = computed(() => route.meta.darkHero && !scrolled.value && !open.value)

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > window.innerHeight * 0.7
  hidden.value = y > 300 && y > lastY + 4 && !open.value
  if (y < lastY - 4) hidden.value = false
  lastY = y
}
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { open.value = false; nextTick(onScroll) })

const panel = ref(null)
watch(open, async (v) => {
  stopScroll(v)
  document.body.style.overflow = v ? 'hidden' : ''
  if (v && !reducedMotion) {
    await nextTick()
    gsap.from(panel.value.querySelectorAll('.mlink'), { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.15, clearProps: 'transform' })
  }
})
const onKey = (e) => { if (e.key === 'Escape') open.value = false }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header :class="['hdr', 'no-print', { light: overHero, solid: scrolled && !open, hide: hidden, open }]">
    <div class="bar">
      <RouterLink to="/" class="mark" aria-label="AUREL, home">AUREL</RouterLink>
      <nav class="desk" aria-label="Main">
        <RouterLink v-for="l in links.slice(0, 4)" :key="l.to" :to="l.to" class="link-line">{{ l.label }}</RouterLink>
      </nav>
      <div class="right">
        <RouterLink to="/book" class="btn small" :class="{ light: overHero }">Plan your stay</RouterLink>
        <button class="menu" :aria-expanded="open" aria-controls="menu-panel" @click="open = !open">
          <span class="bars" aria-hidden="true"><i></i><i></i></span>
          <span class="mlabel">{{ open ? 'Close' : 'Menu' }}</span>
        </button>
      </div>
    </div>

    <Transition name="panel">
      <div v-if="open" id="menu-panel" ref="panel" class="panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="panel-media" aria-hidden="true">
          <Transition name="xfade"><MediaFrame :key="hoverMedia" :id="hoverMedia" fill /></Transition>
        </div>
        <nav class="panel-nav" aria-label="Menu">
          <RouterLink to="/" class="mrow"><span class="mlink"><span class="mtxt">Home</span></span></RouterLink>
          <RouterLink v-for="(l, i) in links" :key="l.to" :to="l.to" class="mrow" @mouseenter="hoverMedia = l.media" @focus="hoverMedia = l.media">
            <span class="mlink"><span class="mtxt"><small>0{{ i + 1 }}</small>{{ l.label }}</span></span>
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hdr { position: fixed; inset: 0 0 auto 0; z-index: 100; color: var(--charcoal); transition: transform .6s var(--ease), background-color .5s, color .5s; }
.hdr.hide { transform: translateY(-100%); }
.hdr.solid { background: rgba(242, 236, 224, .88); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
.hdr.light { color: var(--paper); }
.bar { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 1.1rem var(--gutter); position: relative; z-index: 2; }
.mark { font-family: var(--serif); font-size: 1.55rem; letter-spacing: .32em; text-decoration: none; font-weight: 500; justify-self: start; }
.desk { display: flex; gap: 2.2rem; font-size: var(--step--1); letter-spacing: .02em; }
.desk a { text-decoration: none; }
.desk a.router-link-active::after { transform: scaleX(1); }
.right { justify-self: end; display: flex; align-items: center; gap: 1rem; }
.btn.small { padding: .75rem 1.2rem; }
.hdr.light .btn.small:not(:hover) { color: var(--paper); }
.menu { display: flex; align-items: center; gap: .6rem; background: none; border: 0; color: inherit; cursor: pointer; font: 500 var(--step--1)/1 var(--sans); padding: .4rem; }
.bars { width: 26px; height: 10px; position: relative; display: block; }
.bars i { position: absolute; left: 0; right: 0; height: 1.5px; background: currentColor; transition: transform .5s var(--ease), top .5s var(--ease); }
.bars i:first-child { top: 0; } .bars i:last-child { top: 8px; }
.open .bars i:first-child { top: 4px; transform: rotate(45deg); }
.open .bars i:last-child { top: 4px; transform: rotate(-45deg); }
.hdr.open { color: var(--paper); }
.hdr.open .btn.small { --b: var(--paper); }
.panel { position: fixed; inset: 0; background: var(--sea-deep); display: grid; grid-template-columns: 1fr 1.1fr; z-index: 1; }
.panel-media { position: relative; overflow: hidden; }
.panel-media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 60%, var(--sea-deep)); }
.panel-nav { display: flex; flex-direction: column; justify-content: center; padding: 6rem var(--gutter) 3rem; gap: .2rem; }
.mrow { overflow: hidden; text-decoration: none; color: var(--paper); }
/* .mlink is GSAP's reveal target; the hover nudge lives on .mtxt so a CSS transform transition never fights the tween */
.mlink { display: block; font-family: var(--serif); font-size: clamp(2.4rem, 1.4rem + 4vw, 5rem); line-height: 1.12; }
.mtxt { display: inline-flex; align-items: baseline; gap: 1.2rem; transition: color .4s, transform .6s var(--ease); }
.mlink small { font: 400 .8rem/1 var(--sans); color: var(--sand); letter-spacing: .1em; }
.mrow:hover .mtxt, .mrow:focus-visible .mtxt { color: var(--sand); transform: translateX(14px); }
.mrow.router-link-exact-active .mlink { font-style: italic; }
.panel-enter-active, .panel-leave-active { transition: clip-path .9s var(--ease); }
.panel-enter-from, .panel-leave-to { clip-path: inset(0 0 100% 0); }
.xfade-enter-active, .xfade-leave-active { transition: opacity .7s; }
.xfade-enter-from, .xfade-leave-to { opacity: 0; }
.xfade-leave-active { position: absolute; inset: 0; }
@media (max-width: 960px) {
  .desk { display: none; }
  .bar { grid-template-columns: 1fr auto; }
  .panel { grid-template-columns: 1fr; }
  .panel-media { position: absolute; inset: 0; opacity: .35; }
}
@media (max-width: 520px) { .btn.small { display: none; } .mark { font-size: 1.3rem; } }
</style>
