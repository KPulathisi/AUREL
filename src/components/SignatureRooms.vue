<script setup>
import { ArrowUpRight, Users, Maximize2 } from 'lucide-vue-next'
import MediaFrame from './MediaFrame.vue'
import { useData, money } from '../composables/useData.js'
const { rooms } = useData()
</script>

<template>
  <section class="rooms section" aria-labelledby="rooms-title">
    <div class="wrap head">
      <div>
        <span class="kicker">Signature accommodation</span>
        <h2 id="rooms-title" v-split>Three ways to stay</h2>
      </div>
      <p class="lede" v-fade>Each pavilion and villa is placed for privacy, shade and the sound of the sea. Choose a room to explore it.</p>
    </div>
    <div class="wrap grid">
      <article v-for="(r, i) in rooms" :key="r.id" :class="['room', `r${i}`]">
        <RouterLink :to="`/rooms/${r.id}`" class="room-media" data-cursor="Explore" :aria-label="`Explore the ${r.name}`">
          <div v-reveal.up class="rm-frame"><MediaFrame :id="r.media.hero" fill sizes="(min-width: 900px) 45vw, 100vw" /></div>
        </RouterLink>
        <div class="room-body">
          <div class="room-top">
            <span class="idx">0{{ i + 1 }}</span>
            <h3><RouterLink :to="`/rooms/${r.id}`">{{ r.name }}</RouterLink></h3>
          </div>
          <p class="tag it">{{ r.tagline }}</p>
          <p class="desc">{{ r.description }}</p>
          <ul class="facts">
            <li><Users aria-hidden="true" />Up to {{ r.guests }} guests</li>
            <li><Maximize2 aria-hidden="true" />{{ r.size }} m²</li>
          </ul>
          <ul class="amen"><li v-for="a in r.amenities.slice(0, 3)" :key="a">{{ a }}</li></ul>
          <div class="room-foot">
            <p class="price"><span>From</span> {{ money(r.price) }} <span>/ night, indicative</span></p>
            <RouterLink :to="`/rooms/${r.id}`" class="btn">Explore the room<ArrowUpRight aria-hidden="true" /></RouterLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.head { display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: 2rem; margin-bottom: clamp(3rem, 6vw, 6rem); }
.head h2 { margin: 0; }
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(3rem, 6vw, 6rem) 2rem; }
.room { display: grid; gap: 1.6rem; align-content: start; }
.r0 { grid-column: 1 / 8; }
.r1 { grid-column: 9 / 13; margin-top: 30%; }
.r2 { grid-column: 3 / 11; }
.room-media { display: block; position: relative; overflow: hidden; }
.rm-frame { position: relative; aspect-ratio: 4 / 3; overflow: hidden; }
.r1 .rm-frame { aspect-ratio: 3 / 4; }
.r2 .rm-frame { aspect-ratio: 16 / 9; }
.rm-frame :deep(.mf-inner) { transition: transform 1.4s var(--ease); }
.room-media:hover :deep(.mf-inner), .room-media:focus-visible :deep(.mf-inner) { transform: scale(1.06); }
.room-top { display: flex; align-items: baseline; gap: 1rem; }
.idx { font-family: var(--serif); font-style: italic; color: var(--olive); }
.room h3 { font-size: var(--step-3); margin: 0; }
.room h3 a { text-decoration: none; background: linear-gradient(currentColor, currentColor) left bottom / 0 1px no-repeat; transition: background-size .6s var(--ease); }
.room:hover h3 a { background-size: 100% 1px; }
.tag { margin: 0; color: var(--olive); font-size: var(--step-1); }
.desc { color: var(--ink-soft); margin: 0; }
.facts, .amen { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: .5rem 1.4rem; font-size: var(--step--1); }
.facts li { display: inline-flex; align-items: center; gap: .45rem; }
.facts svg { width: 1em; height: 1em; color: var(--olive); }
.amen li { padding: .35rem .8rem; border: 1px solid var(--line); border-radius: 999px; }
.room-foot { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--line); padding-top: 1.2rem; margin-top: .4rem; }
.price { margin: 0; font-family: var(--serif); font-size: var(--step-2); }
.price span { font-family: var(--sans); font-size: var(--step--1); color: var(--ink-soft); }
@media (max-width: 900px) {
  .head { grid-template-columns: 1fr; }
  .r0, .r1, .r2 { grid-column: 1 / -1; margin-top: 0; }
}
</style>
