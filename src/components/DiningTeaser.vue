<script setup>
import { ref, nextTick } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import MediaFrame from './MediaFrame.vue'
import { useData } from '../composables/useData.js'
import { gsap, reducedMotion } from '../composables/useMotion.js'

const { dining } = useData()
const active = ref(0)
const stage = ref(null)
async function pick(i) {
  if (i === active.value) return
  active.value = i
  await nextTick()
  if (!reducedMotion) gsap.fromTo(stage.value.querySelector('.ds-on'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'expo.inOut' })
}
</script>

<template>
  <section class="dine section" aria-labelledby="dine-title">
    <div class="wrap grid">
      <div class="copy">
        <span class="kicker">Dining</span>
        <h2 id="dine-title" v-split>{{ dining.name }}</h2>
        <p class="it sub">{{ dining.subtitle }}</p>
        <p class="lede" v-fade>{{ dining.intro }}</p>
        <ul class="hl" role="list">
          <li v-for="(h, i) in dining.highlights" :key="h.title">
            <button :class="{ on: active === i }" :aria-pressed="active === i" @mouseenter="pick(i)" @focus="pick(i)" @click="pick(i)">
              <span class="hl-no">0{{ i + 1 }}</span>
              <span class="hl-t">{{ h.title }}</span>
              <span class="hl-d">{{ h.text }}</span>
            </button>
          </li>
        </ul>
        <div class="links">
          <RouterLink to="/dining" class="btn">Discover Lunu<ArrowUpRight aria-hidden="true" /></RouterLink>
          <RouterLink to="/dining/menu" class="link-line">View the menu</RouterLink>
        </div>
      </div>
      <div ref="stage" v-reveal.up class="stage">
        <div v-for="(h, i) in dining.highlights" v-show="i === active" :key="h.title" :class="['ds', { 'ds-on': i === active }]"><MediaFrame :id="h.media" fill sizes="(min-width: 900px) 45vw, 100vw" /></div>
        <p class="note">{{ dining.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dine { background: var(--sand); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; }
.copy h2 { font-size: var(--step-5); margin: 0; font-style: italic; }
.sub { font-size: var(--step-1); color: var(--olive); margin-bottom: 1.4rem; }
.hl { list-style: none; padding: 0; margin: 2rem 0; border-top: 1px solid rgba(29, 28, 26, .2); }
.hl button { width: 100%; display: grid; grid-template-columns: 2.5rem 1fr; gap: 0 1rem; text-align: left; background: none; border: 0; border-bottom: 1px solid rgba(29, 28, 26, .2); padding: 1.1rem 0; cursor: pointer; font: inherit; color: var(--ink-soft); transition: color .4s, padding .5s var(--ease); }
.hl-no { font-family: var(--serif); font-style: italic; color: var(--olive); grid-row: span 2; }
.hl-t { font-family: var(--serif); font-size: var(--step-2); line-height: 1.1; }
.hl-d { max-height: 0; opacity: 0; overflow: hidden; font-size: var(--step--1); transition: max-height .6s var(--ease), opacity .4s, margin .6s var(--ease); }
.hl button.on { color: var(--charcoal); padding-left: .6rem; }
.hl button.on .hl-d { max-height: 5em; opacity: 1; margin-top: .4rem; }
.links { display: flex; align-items: center; gap: 1.6rem; flex-wrap: wrap; }
.stage { position: relative; aspect-ratio: 4 / 5; overflow: hidden; }
.ds { position: absolute; inset: 0; }
.note { position: absolute; left: 1rem; bottom: 1rem; right: 1rem; margin: 0; font-size: .72rem; color: var(--paper); text-shadow: 0 1px 6px rgba(0,0,0,.4); }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
</style>
