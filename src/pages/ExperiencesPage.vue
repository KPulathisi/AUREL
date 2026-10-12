<script setup>
import PageHero from '../components/PageHero.vue'
import ExperienceGrid from '../components/ExperienceGrid.vue'
import GuestNotes from '../components/GuestNotes.vue'
</script>

<template>
  <div>
    <PageHero kicker="Experiences" title="Days shaped by the coast" intro="From dawn yoga to night walks with nesting turtles, each experience is small, unhurried and rooted in the south." />
    <ExperienceGrid :heading="false" />
    <GuestNotes />
  </div>
</template>
