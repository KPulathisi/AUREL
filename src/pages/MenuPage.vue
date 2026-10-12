<script setup>
import { Printer } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import { useData, money } from '../composables/useData.js'
const { dining } = useData()
const printMenu = () => window.print()
</script>

<template>
  <div>
    <PageHero kicker="Lunu · menu" title="Salt, fire and the morning catch" :intro="dining.note">
      <button class="btn no-print" @click="printMenu"><Printer aria-hidden="true" />Print the menu</button>
    </PageHero>
    <section class="wrap menu">
      <section v-for="c in dining.menu" :key="c.category" class="cat" :aria-labelledby="'c-' + c.category">
        <h2 :id="'c-' + c.category" v-split>{{ c.category }}</h2>
        <ul>
          <li v-for="it in c.items" :key="it.name" v-fade>
            <div class="row"><span class="nm">{{ it.name }}</span><span class="dots" aria-hidden="true"></span><span class="pr">{{ money(it.price) }}</span></div>
            <p class="ds">{{ it.description }}</p>
          </li>
        </ul>
      </section>
      <p class="fine">All prices are indicative, in US dollars, and for a fictional restaurant. Please tell us about any allergies.</p>
    </section>
  </div>
</template>

<style scoped>
.menu { columns: 2 420px; column-gap: clamp(3rem, 6vw, 6rem); padding-bottom: clamp(5rem, 10vw, 8rem); }
.cat { break-inside: avoid; margin-bottom: 3.5rem; }
.cat h2 { font-size: var(--step-3); font-style: italic; border-bottom: 1px solid var(--line); padding-bottom: .6rem; }
ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 1.3rem; }
.row { display: flex; align-items: baseline; gap: .6rem; }
.nm { font-family: var(--serif); font-size: var(--step-1); }
.dots { flex: 1; border-bottom: 1px dotted var(--sand-deep); transform: translateY(-4px); }
.pr { font-variant-numeric: tabular-nums; }
.ds { margin: .2rem 0 0; color: var(--ink-soft); font-size: var(--step--1); }
.fine { font-size: .78rem; color: var(--ink-soft); }
</style>
