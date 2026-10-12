<script setup>
import { Check } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import RoomExplorer from '../components/RoomExplorer.vue'
import { useData, money } from '../composables/useData.js'
defineProps({ id: { type: String, default: '' } })
const { rooms } = useData()
const allAmen = [...new Set(rooms.flatMap((r) => r.amenities))]
</script>

<template>
  <div>
    <PageHero kicker="Rooms and villas" title="Pavilions by the sea" intro="Twenty-two pavilions and villas in three styles, each placed for privacy, shade and the sound of the waves." />
    <RoomExplorer :initial="id" sync-route />
    <section class="section wrap compare" aria-labelledby="cmp">
      <h2 id="cmp" v-split>Compare at a glance</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col"><span class="sr-only">Feature</span></th><th v-for="r in rooms" :key="r.id" scope="col"><RouterLink :to="`/rooms/${r.id}`">{{ r.name }}</RouterLink></th></tr></thead>
          <tbody>
            <tr><th scope="row">Size</th><td v-for="r in rooms" :key="r.id">{{ r.size }} m²</td></tr>
            <tr><th scope="row">Guests</th><td v-for="r in rooms" :key="r.id">Up to {{ r.guests }}</td></tr>
            <tr><th scope="row">Beds</th><td v-for="r in rooms" :key="r.id">{{ r.bed }}</td></tr>
            <tr><th scope="row">View</th><td v-for="r in rooms" :key="r.id">{{ r.view }}</td></tr>
            <tr v-for="a in allAmen" :key="a"><th scope="row">{{ a }}</th><td v-for="r in rooms" :key="r.id"><Check v-if="r.amenities.includes(a)" aria-label="Included" /><span v-else class="sr-only">Not included</span></td></tr>
            <tr class="price"><th scope="row">From, per night</th><td v-for="r in rooms" :key="r.id">{{ money(r.price) }}</td></tr>
          </tbody>
        </table>
      </div>
      <p class="fine">Indicative prices for a fictional resort, before taxes and service.</p>
      <RouterLink to="/book" class="btn solid">Plan your stay</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.compare h2 { font-size: var(--step-4); }
.table-wrap { overflow-x: auto; margin: 2rem 0 1rem; }
table { width: 100%; border-collapse: collapse; min-width: 640px; }
th, td { text-align: left; padding: 1rem .8rem; border-bottom: 1px solid var(--line); font-weight: 400; }
thead th { font-family: var(--serif); font-size: var(--step-2); }
thead a { text-decoration: none; }
tbody th { color: var(--ink-soft); font-size: var(--step--1); }
td svg { width: 18px; color: var(--olive); }
.price td { font-family: var(--serif); font-size: var(--step-2); }
.fine { font-size: .78rem; color: var(--ink-soft); margin-bottom: 2rem; }
</style>
