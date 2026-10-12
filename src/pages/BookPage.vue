<script setup>
import PageHero from '../components/PageHero.vue'
import BookingInquiry from '../components/BookingInquiry.vue'
import OceanLines from '../components/OceanLines.vue'
const faq = [
  { q: 'Is this a real booking?', a: 'No. AUREL is a fictional resort created for a portfolio. The planner calculates an indicative estimate in your browser; nothing is reserved and nothing is sent unless you choose to write an email yourself.' },
  { q: 'How is the estimate calculated?', a: 'Number of nights × the room’s indicative nightly rate. Taxes, service charges and seasonal pricing are not included.' },
  { q: 'Is my information stored?', a: 'No. The details stay in this browser tab and disappear when you close it.' }
]
</script>

<template>
  <div class="book">
    <OceanLines />
    <PageHero kicker="Plan your stay" title="Your Next Chapter Begins by the Sea." intro="Choose a room and dates to see an indicative estimate you can copy, print or send." />
    <section class="wrap grid">
      <BookingInquiry />
      <div class="faq">
        <details v-for="f in faq" :key="f.q"><summary>{{ f.q }}</summary><p>{{ f.a }}</p></details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.book { position: relative; padding-bottom: clamp(5rem, 10vw, 8rem); }
.grid { position: relative; display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(2rem, 5vw, 5rem); align-items: start; }
details { border-bottom: 1px solid var(--line); padding: 1.2rem 0; }
summary { cursor: pointer; font-family: var(--serif); font-size: var(--step-1); list-style: none; display: flex; justify-content: space-between; }
summary::after { content: '+'; transition: transform .4s var(--ease); }
details[open] summary::after { transform: rotate(45deg); }
details p { margin: .8rem 0 0; color: var(--ink-soft); }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
</style>
