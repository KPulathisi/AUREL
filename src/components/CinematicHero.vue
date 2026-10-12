<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowDown } from 'lucide-vue-next'
import MediaFrame from './MediaFrame.vue'
import DustMotes from './DustMotes.vue'
import { useData } from '../composables/useData.js'
import { gsap, SplitText, reducedMotion, finePointer, scrollToTarget } from '../composables/useMotion.js'

const { resort } = useData()
const h = resort.hero
const root = ref(null), media = ref(null), title = ref(null)
let ctx, onMove

onMounted(() => {
  if (reducedMotion) return
  ctx = gsap.context(() => {
    // Content is visible immediately; the lines just rise into place
    document.fonts?.ready.then(() => {
      const split = SplitText.create(title.value, { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, { yPercent: 115, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: 0.1 })
    })
    gsap.from('.hero-meta > *, .hero-sub, .hero-actions', { y: 24, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08, delay: 0.55 })
    gsap.from(media.value, { scale: 1.12, duration: 2.4, ease: 'expo.out' })

    // Signature moment: as you scroll on, the full-bleed scene closes into a framed window on the sea
    gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .to(media.value, { clipPath: 'inset(9% 7% 9% 7% round 28px)', scale: 0.94, ease: 'none' }, 0)
      .to('.hero-copy', { yPercent: -35, opacity: 0, ease: 'none' }, 0)
      .to('.hero-scroll', { opacity: 0, ease: 'none', duration: 0.2 }, 0)
  }, root.value)

  // Hover: the scene leans gently with the pointer
  if (finePointer) {
    const xTo = gsap.quickTo(media.value.querySelector('.mf-inner'), 'xPercent', { duration: 1.2, ease: 'power3' })
    const yTo = gsap.quickTo(media.value.querySelector('.mf-inner'), 'yPercent', { duration: 1.2, ease: 'power3' })
    onMove = (e) => { xTo((e.clientX / innerWidth - 0.5) * -2.2); yTo((e.clientY / innerHeight - 0.5) * -2.2) }
    root.value.addEventListener('pointermove', onMove)
  }
})
onBeforeUnmount(() => { ctx?.revert(); root.value?.removeEventListener('pointermove', onMove) })
</script>

<template>
  <section ref="root" class="hero" aria-labelledby="hero-title">
    <div ref="media" class="hero-media">
      <MediaFrame :id="h.media" :poster="h.poster" fill eager />
      <div class="shade" aria-hidden="true"></div>
      <DustMotes />
    </div>
    <div class="hero-copy wrap">
      <div class="hero-meta"><span class="it">{{ h.location }}</span><span>{{ h.coordinates }}</span></div>
      <h1 id="hero-title" ref="title" class="hero-title"><span v-for="(ln, i) in h.lines" :key="i" class="ln">{{ ln }}</span></h1>
      <p class="hero-sub">{{ h.text }}</p>
      <div class="hero-actions">
        <button class="btn light" data-cursor="Begin" @click="scrollToTarget('#story')">{{ h.cta }}<ArrowDown aria-hidden="true" /></button>
      </div>
    </div>
    <div class="hero-scroll" aria-hidden="true"><span>Scroll</span><i></i></div>
  </section>
</template>

<style scoped>
.hero { position: relative; height: 100svh; min-height: 620px; color: var(--paper); overflow: hidden; background: var(--ivory); }
.hero-media { position: absolute; inset: 0; clip-path: inset(0% 0% 0% 0% round 0px); background: var(--sea); will-change: clip-path, transform; }
.shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20, 39, 41, .35) 0%, rgba(20, 39, 41, 0) 30%, rgba(20, 39, 41, .15) 55%, rgba(20, 39, 41, .72) 100%); }
.hero-copy { position: absolute; left: 0; right: 0; bottom: clamp(3rem, 9vh, 7rem); display: grid; grid-template-columns: 1fr auto; grid-template-areas: 'meta meta' 'title title' 'sub actions'; gap: 1.2rem 3rem; align-items: end; }
.hero-meta { grid-area: meta; display: flex; gap: 1.6rem; font-size: var(--step--1); color: rgba(248, 244, 236, .85); }
.hero-meta .it { font-size: var(--step-0); }
.hero-title { grid-area: title; font-size: var(--step-5); line-height: .95; margin: 0; color: var(--paper); }
.hero-title .ln { display: block; }
.hero-title .ln:nth-child(2) { padding-left: 12vw; font-style: italic; }
.hero-sub { grid-area: sub; max-width: 46ch; color: rgba(248, 244, 236, .88); margin: 0; font-size: var(--step-0); }
.hero-actions { grid-area: actions; }
.hero-scroll { position: absolute; right: var(--gutter); top: 50%; display: flex; flex-direction: column; align-items: center; gap: .8rem; font-size: .7rem; letter-spacing: .2em; writing-mode: vertical-rl; color: rgba(248, 244, 236, .8); }
.hero-scroll i { width: 1px; height: 70px; background: rgba(248, 244, 236, .3); position: relative; overflow: hidden; }
.hero-scroll i::after { content: ''; position: absolute; left: 0; top: -30%; width: 1px; height: 30%; background: var(--paper); animation: scrolldot 2.2s var(--ease) infinite; }
@keyframes scrolldot { to { top: 100%; } }
@media (max-width: 760px) {
  .hero-copy { grid-template-columns: 1fr; grid-template-areas: 'meta' 'title' 'sub' 'actions'; }
  .hero-title .ln:nth-child(2) { padding-left: 0; }
  .hero-meta { flex-direction: column; gap: .2rem; }
  .hero-scroll { display: none; }
}
</style>
