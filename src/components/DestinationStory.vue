<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MediaFrame from './MediaFrame.vue'
import { useData } from '../composables/useData.js'
import { gsap, reducedMotion } from '../composables/useMotion.js'

const { resort } = useData()
const story = resort.story
const words = story.manifesto.split(' ')
const root = ref(null)
let ctx

onMounted(() => {
  if (reducedMotion) return
  ctx = gsap.context(() => {
    // Manifesto words brighten one by one as the reader scrolls through them
    gsap.fromTo('.mw', { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.manifesto', start: 'top 78%', end: 'bottom 45%', scrub: true } })
    // The horizon draws itself across the page
    gsap.from('.horizon path', { drawSVG: '0%', duration: 2.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.horizon', start: 'top 85%', once: true } })
    // Count up the figures
    gsap.utils.toArray('.stat-v').forEach((el) => {
      const raw = el.dataset.v, num = parseFloat(raw), unit = raw.replace(/[\d.]/g, '')
      const o = { n: 0 }
      gsap.to(o, { n: num, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => (el.textContent = Math.round(o.n) + unit) })
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="story" ref="root" class="story section" aria-labelledby="story-title">
    <div class="wrap">
      <h2 id="story-title" class="sr-only">The story of AUREL</h2>
      <span class="kicker">The destination</span>
      <p class="manifesto"><template v-for="(w, i) in words" :key="i"><span class="mw">{{ w }}</span>{{ ' ' }}</template></p>
      <svg class="horizon" viewBox="0 0 1400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 C 200 12, 400 28, 700 20 S 1200 12, 1400 20" fill="none" stroke="currentColor" stroke-width="1" /></svg>

      <ol class="stats">
        <li v-for="s in resort.stats" :key="s.label"><span class="stat-v" :data-v="s.value">{{ s.value }}</span><span class="stat-l">{{ s.label }}</span></li>
      </ol>
    </div>

    <div class="chapters">
      <article v-for="(c, i) in story.chapters" :key="c.title" :class="['chapter', i % 2 ? 'flip' : '', `c${i}`]">
        <div v-reveal.up v-parallax="0.12" class="ch-media" data-cursor="AUREL">
          <MediaFrame :id="c.media" fill sizes="(min-width: 900px) 55vw, 100vw" />
        </div>
        <div class="ch-text">
          <span class="ch-no">0{{ i + 1 }}</span>
          <h3 v-split>{{ c.title }}</h3>
          <p v-fade>{{ c.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.story { padding-bottom: clamp(4rem, 8vw, 8rem); }
.manifesto { font-family: var(--serif); font-size: var(--step-3); line-height: 1.22; max-width: 30ch; margin: 0; }
.mw { transition: none; }
.horizon { display: block; width: 100%; height: 40px; margin: clamp(3rem, 6vw, 5rem) 0 2rem; color: var(--brass); }
.stats { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.stats li { display: grid; gap: .3rem; }
.stat-v { font-family: var(--serif); font-size: var(--step-4); line-height: 1; }
.stat-l { color: var(--ink-soft); font-size: var(--step--1); }
.chapters { margin-top: clamp(5rem, 10vw, 10rem); display: grid; gap: clamp(5rem, 12vw, 12rem); }
.chapter { display: grid; grid-template-columns: repeat(12, 1fr); align-items: center; gap: 2rem; padding-inline: var(--gutter); }
.ch-media { position: relative; overflow: hidden; grid-column: 1 / 8; aspect-ratio: 4 / 5; }
.c1 .ch-media { aspect-ratio: 16 / 10; grid-column: 5 / 13; }
.c2 .ch-media { aspect-ratio: 4 / 5; grid-column: 2 / 7; }
.ch-text { grid-column: 9 / 12; }
.flip .ch-text { grid-column: 2 / 5; grid-row: 1; }
.c2 .ch-text { grid-column: 8 / 12; }
.ch-no { font-family: var(--serif); font-style: italic; color: var(--olive); font-size: var(--step-1); display: block; margin-bottom: 1rem; }
.ch-text h3 { font-size: var(--step-3); }
@media (max-width: 860px) {
  .stats { grid-template-columns: 1fr; gap: 1.2rem; }
  .chapter, .flip { grid-template-columns: 1fr; }
  .ch-media, .c1 .ch-media, .c2 .ch-media, .ch-text, .flip .ch-text, .c2 .ch-text { grid-column: 1; grid-row: auto; }
}
</style>
