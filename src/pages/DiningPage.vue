<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import MediaFrame from '../components/MediaFrame.vue'
import { useData } from '../composables/useData.js'
const { dining } = useData()
</script>

<template>
  <div>
    <PageHero kicker="Dining" :title="dining.name" :intro="dining.subtitle" :media="dining.hero">
      <RouterLink to="/dining/menu" class="btn light">View the menu<ArrowUpRight aria-hidden="true" /></RouterLink>
    </PageHero>
    <section class="section wrap intro">
      <p class="big" v-fade>{{ dining.intro }}</p>
    </section>
    <section class="wrap feats">
      <article v-for="(h, i) in dining.highlights" :key="h.title" :class="['feat', { flip: i % 2 }]">
        <div v-reveal.up v-parallax="0.12" class="f-media"><MediaFrame :id="h.media" fill /></div>
        <div class="f-text"><span class="no it">0{{ i + 1 }}</span><h2 v-split>{{ h.title }}</h2><p v-fade>{{ h.text }}</p></div>
      </article>
    </section>
    <section class="section wrap closing">
      <p class="note">{{ dining.note }}</p>
      <RouterLink to="/dining/menu" class="btn solid">See the full menu</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.big { font-family: var(--serif); font-size: var(--step-3); line-height: 1.25; max-width: 30ch; }
.feats { display: grid; gap: clamp(4rem, 10vw, 9rem); }
.feat { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(2rem, 5vw, 5rem); align-items: center; }
.feat.flip .f-media { order: 2; }
.f-media { position: relative; aspect-ratio: 4 / 5; overflow: hidden; }
.f-text h2 { font-size: var(--step-4); }
.no { color: var(--olive); font-size: var(--step-1); }
.closing { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
.note { font-size: .82rem; color: var(--ink-soft); margin: 0; }
@media (max-width: 860px) { .feat { grid-template-columns: 1fr; } .feat.flip .f-media { order: 0; } }
</style>
