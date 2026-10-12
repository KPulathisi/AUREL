<script setup>
import PageHero from '../components/PageHero.vue'
import DestinationStory from '../components/DestinationStory.vue'
import ArchitectureScroll from '../components/ArchitectureScroll.vue'
import LocationMap from '../components/LocationMap.vue'
import { useData } from '../composables/useData.js'
const { resort } = useData()
</script>

<template>
  <div>
    <PageHero kicker="The resort" title="A slower way of being by the sea" :intro="resort.tagline" media="about-1" />
    <DestinationStory />
    <ArchitectureScroll />
    <LocationMap />
    <section class="section wrap fic"><p>{{ resort.fictionalNotice }}</p></section>
  </div>
</template>

<style scoped>.fic p { font-size: .85rem; color: var(--ink-soft); }</style>
