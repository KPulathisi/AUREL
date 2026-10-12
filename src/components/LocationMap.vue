<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MapPin, Plane, Sun } from 'lucide-vue-next'
import OceanLines from './OceanLines.vue'
import { useData } from '../composables/useData.js'
import { gsap, reducedMotion } from '../composables/useMotion.js'

const { location: loc } = useData()
const hover = ref(-1)
const root = ref(null)
// Narrow screens get a tighter crop of the coast so labels stay legible
const narrow = ref(window.matchMedia('(max-width: 700px)').matches)
const vb = () => (narrow.value ? '130 90 740 340' : '0 120 1000 330')
const coast = 'M' + loc.coast.map((p) => p.join(',')).join(' L')
const land = `M0,0 L1000,0 L1000,${loc.coast.at(-1)[1] - 60} L${loc.coast.at(-1).join(',')} ` + [...loc.coast].reverse().slice(1).map((p) => 'L' + p.join(',')).join(' ') + ` L0,${loc.coast[0][1] - 20} Z`
// Curved routes from the resort to each place
const route = (a) => {
  const { x, y } = loc.resort, mx = (x + a.x) / 2, my = Math.min(y, a.y) - Math.abs(a.x - x) * 0.18 - 20
  return `M${x},${y} Q${mx},${my} ${a.x},${a.y}`
}
let ctx
onMounted(() => {
  if (reducedMotion) return
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.map', start: 'top 75%', once: true } })
    tl.from('.coast', { drawSVG: '0%', duration: 2.2, ease: 'power2.inOut' })
      .from('.land', { opacity: 0, duration: 1 }, 0.4)
      .fromTo('.route', { drawSVG: '0%', strokeDasharray: 'none' }, { drawSVG: '100%', duration: 1.4, ease: 'power2.out', stagger: 0.12, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.9)
      .from('.pin', { scale: 0, transformOrigin: 'center', duration: 0.6, ease: 'back.out(2)', stagger: 0.08 }, 1.2)
      .from('.resort-pin', { scale: 0, transformOrigin: 'center', duration: 0.8, ease: 'back.out(2)' }, 0.8)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="loc section" aria-labelledby="loc-title">
    <OceanLines />
    <div class="wrap grid">
      <div class="copy">
        <span class="kicker">Location</span>
        <h2 id="loc-title" v-split>The deep south of Sri Lanka</h2>
        <p class="lede" v-fade>{{ loc.intro }}</p>
        <ol class="places">
          <li v-for="(a, i) in loc.attractions" :key="a.name" :class="{ on: hover === i }" tabindex="0" @mouseenter="hover = i" @mouseleave="hover = -1" @focus="hover = i" @blur="hover = -1">
            <span class="pl-name">{{ a.name }}</span><span class="pl-dist">{{ a.distance }}</span><span class="pl-note">{{ a.note }}</span>
          </li>
        </ol>
      </div>
      <figure class="map">
        <svg :viewBox="vb()" role="img" aria-label="Stylised map of Sri Lanka's southern coast, showing the fictional AUREL resort near Tangalle and nearby places from Galle Fort to Yala National Park.">
          <defs>
            <linearGradient id="landfade" x1="0" y1="1" x2="0" y2="0"><stop offset="0.7" stop-color="#fff" /><stop offset="1" stop-color="#fff" stop-opacity="0.15" /></linearGradient>
            <linearGradient id="landfadeX" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0" /><stop offset="0.12" stop-color="#fff" /><stop offset="0.88" stop-color="#fff" /><stop offset="1" stop-color="#fff" stop-opacity="0" /></linearGradient>
            <mask id="landmaskY" maskContentUnits="userSpaceOnUse"><rect x="0" y="90" width="1000" height="380" fill="url(#landfade)" /></mask>
            <mask id="landmask" maskContentUnits="userSpaceOnUse"><rect x="0" y="0" width="1000" height="500" fill="url(#landfadeX)" /></mask>
          </defs>
          <g mask="url(#landmask)"><path class="land" :d="land" mask="url(#landmaskY)" /></g>
          <g class="hills" aria-hidden="true"><path v-for="i in 6" :key="i" :d="`M${80 + i * 60},${150 + i * 18} C${300 + i * 40},${120 + i * 14} ${600 - i * 20},${170 + i * 16} ${960 - i * 30},${140 + i * 12}`" /></g>
          <path class="coast" :d="coast" />
          <path v-for="(a, i) in loc.attractions" :key="'r' + i" :class="['route', { on: hover === i }]" :d="route(a)" />
          <g v-for="(a, i) in loc.attractions" :key="'p' + i" :class="['pin', { on: hover === i }]" @mouseenter="hover = i" @mouseleave="hover = -1">
            <circle :cx="a.x" :cy="a.y" r="14" class="halo" />
            <circle :cx="a.x" :cy="a.y" r="5" />
            <text :x="a.x" :y="a.y > loc.resort.y ? a.y + 26 : a.y - 16" text-anchor="middle">{{ a.name }}</text>
          </g>
          <g class="resort-pin">
            <circle :cx="loc.resort.x" :cy="loc.resort.y" r="22" class="pulse" />
            <circle :cx="loc.resort.x" :cy="loc.resort.y" r="8" />
            <text :x="loc.resort.x + 30" :y="loc.resort.y + 6" class="rlabel">AUREL</text>
          </g>
          <text x="560" y="420" class="sea-label">Indian Ocean</text>
        </svg>
        <figcaption>{{ loc.region }} · the resort is fictional; the places are real.</figcaption>
      </figure>
    </div>
    <div class="wrap travel">
      <div v-for="(t, i) in loc.travel" :key="t.label" class="tr">
        <component :is="[Plane, Plane, Sun][i]" aria-hidden="true" />
        <div><span class="tr-l">{{ t.label }}</span><span class="tr-v">{{ t.value }}</span></div>
      </div>
    </div>
    <p class="wrap disc"><MapPin aria-hidden="true" />{{ loc.disclaimer }}</p>
  </section>
</template>

<style scoped>
.loc { overflow: hidden; background: var(--ivory); }
.grid { position: relative; display: grid; grid-template-columns: 1fr 1.5fr; gap: clamp(2rem, 5vw, 5rem); align-items: center; }
.places { list-style: none; padding: 0; margin: 2rem 0 0; }
.places li { display: grid; grid-template-columns: 1fr auto; gap: 0 1rem; padding: .85rem 0; border-bottom: 1px solid var(--line); cursor: default; transition: padding .5s var(--ease), color .3s; }
.places li.on { padding-left: .8rem; }
.pl-name { font-family: var(--serif); font-size: var(--step-1); }
.pl-dist { font-size: var(--step--1); color: var(--ink-soft); align-self: center; }
.pl-note { grid-column: 1 / -1; font-size: var(--step--1); color: var(--olive); max-height: 0; overflow: hidden; opacity: 0; transition: max-height .5s var(--ease), opacity .4s; }
.places li.on .pl-note { max-height: 3em; opacity: 1; }
.map { margin: 0; position: relative; }
.map svg { width: 100%; height: auto; overflow: visible; }
.land { fill: var(--sand); opacity: .7; }
.hills path { fill: none; stroke: var(--sand-deep); stroke-width: 1; opacity: .45; }
.coast { fill: none; stroke: var(--charcoal); stroke-width: 1.4; }
.route { fill: none; stroke: var(--brass); stroke-width: 1; stroke-dasharray: 4 5; opacity: .45; transition: opacity .3s, stroke-width .3s; }
.route.on { opacity: 1; stroke-width: 1.8; stroke-dasharray: none; }
.pin { cursor: pointer; }
.pin circle { fill: var(--olive); transition: fill .3s; }
.pin .halo { fill: var(--olive); opacity: 0; transition: opacity .3s; }
.pin.on .halo { opacity: .2; }
.pin.on circle:not(.halo) { fill: var(--charcoal); }
.pin text { font: 500 14px var(--sans); fill: var(--ink-soft); opacity: .7; transition: opacity .3s, fill .3s; pointer-events: none; }
.pin.on text { opacity: 1; fill: var(--charcoal); font-weight: 600; }
.resort-pin circle { fill: var(--sea); }
.resort-pin .pulse { fill: var(--brass); opacity: .35; animation: pulse 2.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes pulse { 0% { transform: scale(.4); opacity: .6; } 100% { transform: scale(1.6); opacity: 0; } }
.rlabel { font: 500 15px var(--serif); letter-spacing: .3em; fill: var(--sea); }
.sea-label { font: italic 16px var(--serif); fill: var(--ink-soft); letter-spacing: .1em; }
.map figcaption { font-size: .78rem; color: var(--ink-soft); margin-top: .6rem; text-align: right; }
.travel { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: clamp(3rem, 6vw, 5rem); padding-top: 2rem; border-top: 1px solid var(--line); }
.tr { display: flex; gap: 1rem; align-items: flex-start; }
.tr svg { width: 22px; color: var(--olive); flex: none; margin-top: .2rem; }
.tr-l { display: block; font-size: .78rem; color: var(--ink-soft); }
.tr-v { display: block; font-family: var(--serif); font-size: var(--step-1); line-height: 1.3; }
.disc { position: relative; display: flex; gap: .5rem; align-items: center; font-size: .78rem; color: var(--ink-soft); margin-top: 1.5rem; }
.disc svg { width: 14px; }
@media (max-width: 900px) { .grid, .travel { grid-template-columns: 1fr; } .pin text { font-size: 20px; } .rlabel { font-size: 20px; } .sea-label { font-size: 20px; } }
</style>
