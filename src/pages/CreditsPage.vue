<script setup>
import PageHero from '../components/PageHero.vue'
import { useData } from '../composables/useData.js'
const { media } = useData()
</script>

<template>
  <div>
    <PageHero kicker="Credits and project notes" title="Behind the scenes" intro="AUREL is a fictional luxury resort, designed and built as a front-end portfolio project." />
    <section class="wrap notes">
      <h2>What is real, and what is simulated</h2>
      <ul>
        <li><strong>Real:</strong> the room explorer, gallery, booking calculator (nights × indicative rate), copy-to-clipboard, printable summary and email draft all work in your browser.</li>
        <li><strong>Simulated:</strong> the resort, its rooms, prices, restaurant and guest notes are fictional. No availability is checked, no booking is made and nothing is sent to a server.</li>
        <li><strong>Real places:</strong> the nearby attractions on the map exist; travel times are approximate.</li>
      </ul>
      <h2>Images and video</h2>
      <p>Images and videos are added per slot in the local admin panel. Until a slot has a file, an animated illustration is shown instead.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Slot</th><th>Used for</th><th>Status</th><th>Credit / licence</th></tr></thead>
          <tbody><tr v-for="m in media" :key="m.id"><td>{{ m.id }}</td><td>{{ m.label }}</td><td>{{ m.file ? (m.kind === 'video' ? 'Video added' : 'Photo added') : 'Illustration placeholder' }}</td><td>{{ m.credit || (m.file ? 'Not recorded' : '—') }}</td></tr></tbody>
        </table>
      </div>
      <h2>Type and code</h2>
      <p>Typefaces: Bodoni Moda and Hanken Grotesk (SIL Open Font License, self-hosted). Built with Vue 3, Vite, GSAP (ScrollTrigger, SplitText, Flip, DrawSVG), Lenis and Lucide icons.</p>
    </section>
  </div>
</template>

<style scoped>
.notes { padding-bottom: clamp(5rem, 10vw, 8rem); }
.notes h2 { font-size: var(--step-3); margin-top: 3rem; }
.notes ul { padding-left: 1.2rem; max-width: 70ch; display: grid; gap: .6rem; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: var(--step--1); min-width: 640px; }
th, td { text-align: left; padding: .7rem .6rem; border-bottom: 1px solid var(--line); }
th { color: var(--ink-soft); font-weight: 500; }
</style>
