<script setup>
import MediaFrame from './MediaFrame.vue'
import BookingInquiry from './BookingInquiry.vue'
import { useData } from '../composables/useData.js'
const { resort } = useData()
</script>

<template>
  <section id="plan" class="cta" aria-labelledby="cta-title">
    <div v-parallax="0.18" class="cta-media"><MediaFrame :id="resort.cta.media" :poster="resort.cta.poster" fill /></div>
    <div class="cta-shade" aria-hidden="true"></div>
    <div class="wrap grid">
      <div class="copy">
        <span class="kicker">Plan your stay</span>
        <h2 id="cta-title" v-split>{{ resort.cta.headline }}</h2>
        <p class="lede" v-fade>{{ resort.cta.text }}</p>
      </div>
      <BookingInquiry v-fade />
    </div>
  </section>
</template>

<style scoped>
.cta { position: relative; padding-block: clamp(6rem, 12vw, 11rem); color: var(--paper); overflow: hidden; }
.cta-media { position: absolute; inset: 0; overflow: hidden; }
.cta-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(20, 39, 41, .82), rgba(20, 39, 41, .35) 70%); }
.grid { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; }
.copy h2 { color: var(--paper); font-size: var(--step-5); line-height: .98; }
.copy .kicker { color: var(--sand); }
.copy .lede { color: rgba(248, 244, 236, .85); }
@media (max-width: 960px) { .grid { grid-template-columns: 1fr; } }
</style>
