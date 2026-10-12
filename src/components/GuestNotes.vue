<script setup>
/** A slow marquee of guest-style notes. They are illustrative (the resort is fictional) and labelled as such. */
import { useData } from '../composables/useData.js'
const { testimonials } = useData()
</script>

<template>
  <section class="notes" aria-labelledby="notes-title">
    <h2 id="notes-title" class="sr-only">Illustrative guest notes</h2>
    <div class="track" aria-hidden="false">
      <div class="row">
        <template v-for="k in 2" :key="k">
          <figure v-for="t in testimonials" :key="t.id + k" class="note" :aria-hidden="k === 2">
            <blockquote>“{{ t.quote }}”</blockquote>
            <figcaption>{{ t.attribution }}</figcaption>
          </figure>
        </template>
      </div>
    </div>
    <p class="label">Illustrative notes. AUREL is a fictional resort, so these are not real reviews.</p>
  </section>
</template>

<style scoped>
.notes { padding-block: clamp(3rem, 6vw, 5rem); border-block: 1px solid var(--line); overflow: hidden; background: var(--paper); }
.row { display: flex; width: max-content; gap: 5rem; animation: marquee 60s linear infinite; }
.notes:hover .row { animation-play-state: paused; }
@keyframes marquee { to { transform: translateX(-50%); } }
.note { margin: 0; width: min(520px, 80vw); flex: none; }
blockquote { margin: 0; font-family: var(--serif); font-size: var(--step-2); line-height: 1.25; font-style: italic; }
figcaption { margin-top: .8rem; font-size: .78rem; color: var(--ink-soft); }
.label { text-align: center; font-size: .72rem; color: var(--ink-soft); margin: 2rem auto 0; max-width: none; }
@media (prefers-reduced-motion: reduce) { .row { animation: none; flex-wrap: wrap; width: auto; padding-inline: var(--gutter); } }
</style>
