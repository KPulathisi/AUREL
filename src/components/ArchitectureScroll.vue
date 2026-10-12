<script setup>
/**
 * Desktop: a pinned horizontal sequence; panels slide past as the visitor scrolls, with the
 * images drifting inside their frames. Mobile / reduced motion: a plain vertical list.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MediaFrame from './MediaFrame.vue'
import { useData } from '../composables/useData.js'
import { gsap, ScrollTrigger, reducedMotion } from '../composables/useMotion.js'

const { architecture } = useData()
const root = ref(null), track = ref(null)
const current = ref(0)
let mm

onMounted(() => {
  if (reducedMotion) return
  mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    const panels = track.value.querySelectorAll('.panel')
    const dist = () => track.value.scrollWidth - window.innerWidth
    const tween = gsap.to(track.value, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: root.value, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: (st) => (current.value = Math.min(panels.length - 1, Math.round(st.progress * (panels.length - 1))))
      }
    })
    panels.forEach((p) => {
      gsap.fromTo(p.querySelector('.mf-inner'), { xPercent: -10, scale: 1.2 }, { xPercent: 10, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      gsap.from(p.querySelectorAll('.p-text > *'), { y: 40, opacity: 0, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 70%', toggleActions: 'play none none reverse' } })
    })
  })
})
onBeforeUnmount(() => mm?.revert())
</script>

<template>
  <section ref="root" class="arch dark" aria-labelledby="arch-title">
    <div ref="track" class="track">
      <div class="intro">
        <span class="kicker">Resort architecture</span>
        <h2 id="arch-title">Built around light, shade and the sea breeze</h2>
        <p class="lede">A walk through the buildings, in five scenes. Keep scrolling.</p>
        <svg class="arrow" viewBox="0 0 120 20" aria-hidden="true"><path d="M0 10 H115 M105 2 L116 10 L105 18" fill="none" stroke="currentColor" stroke-width="1" /></svg>
      </div>
      <article v-for="(a, i) in architecture" :key="a.id" :class="['panel', `p${i % 3}`]">
        <div class="p-media"><MediaFrame :id="a.media" fill sizes="(min-width: 1024px) 50vw, 100vw" /></div>
        <div class="p-text">
          <span class="p-no">{{ a.number }}</span>
          <h3>{{ a.title }}</h3>
          <p>{{ a.text }}</p>
        </div>
      </article>
    </div>
    <ol class="counter" aria-hidden="true">
      <li v-for="(a, i) in architecture" :key="a.id" :class="{ on: i === current }">{{ a.number }}</li>
    </ol>
  </section>
</template>

<style scoped>
.arch { position: relative; overflow: hidden; }
.track { display: flex; align-items: center; gap: 6vw; height: 100vh; padding: 0 8vw; width: max-content; }
.intro { width: 34vw; flex: none; }
.intro h2 { font-size: var(--step-4); }
.arrow { width: 120px; color: var(--sand); margin-top: 1.5rem; }
.panel { flex: none; display: grid; gap: 2rem; align-items: end; }
.p0 { width: 52vw; grid-template-columns: 1.7fr 1fr; }
.p1 { width: 40vw; grid-template-rows: auto auto; }
.p2 { width: 58vw; grid-template-columns: 1fr 1.8fr; }
.p-media { position: relative; overflow: hidden; height: 62vh; }
.p1 .p-media { height: 48vh; }
.p2 .p-media { order: 2; height: 70vh; }
.p-no { font-family: var(--serif); font-style: italic; color: var(--sand); font-size: var(--step-2); display: block; margin-bottom: .6rem; }
.p-text h3 { font-size: var(--step-3); }
.p-text p { color: rgba(242, 236, 224, .78); max-width: 38ch; }
.counter { position: absolute; left: 8vw; bottom: 5vh; display: flex; gap: 1.2rem; list-style: none; padding: 0; margin: 0; font-family: var(--serif); color: rgba(242, 236, 224, .35); }
.counter li { transition: color .4s, transform .4s; }
.counter li.on { color: var(--paper); transform: translateY(-3px); }
@media (max-width: 1023px), (prefers-reduced-motion: reduce) {
  .track { flex-direction: column; height: auto; width: auto; padding: clamp(5rem, 12vw, 8rem) var(--gutter); gap: 4rem; align-items: stretch; }
  .intro, .p0, .p1, .p2 { width: auto; }
  .panel { grid-template-columns: 1fr !important; }
  .p-media, .p1 .p-media, .p2 .p-media { height: 56vw; order: 0; }
  .counter { display: none; }
}
</style>
