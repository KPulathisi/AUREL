<script setup>
import MediaFrame from './MediaFrame.vue'
defineProps({ kicker: String, title: String, intro: String, media: { type: String, default: '' } })
</script>

<template>
  <header :class="['ph', { 'has-media': media }]">
    <div v-if="media" v-parallax="0.15" class="ph-media"><MediaFrame :id="media" fill eager /><div class="ph-shade" aria-hidden="true"></div></div>
    <div class="wrap ph-copy">
      <span class="kicker">{{ kicker }}</span>
      <h1 v-split.now>{{ title }}</h1>
      <p v-if="intro" class="lede" v-fade>{{ intro }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped>
.ph { position: relative; padding: clamp(9rem, 18vw, 14rem) 0 clamp(3rem, 6vw, 5rem); overflow: hidden; }
.ph h1 { font-size: var(--step-5); max-width: 14ch; }
.ph.has-media { min-height: 88svh; display: flex; align-items: flex-end; color: var(--paper); }
.ph.has-media h1 { color: var(--paper); }
.ph.has-media .kicker { color: var(--sand); }
.ph.has-media .lede { color: rgba(248, 244, 236, .86); }
.ph-media { position: absolute; inset: 0; overflow: hidden; }
.ph-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20, 39, 41, .3), rgba(20, 39, 41, .1) 40%, rgba(20, 39, 41, .78)); }
.ph-copy { position: relative; }
</style>
