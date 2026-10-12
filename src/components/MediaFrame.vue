<script setup>
/**
 * Renders a media slot from media.json: the uploaded photo or video when one exists,
 * otherwise an animated placeholder scene. Videos only autoplay when visible, and never on
 * small screens or under reduced motion (the poster image or scene is shown instead).
 */
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import SceneArt from './SceneArt.vue'
import { useData, mediaUrls } from '../composables/useData.js'
import { reducedMotion } from '../composables/useMotion.js'

const props = defineProps({
  id: { type: String, required: true },
  poster: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  eager: Boolean,
  fill: Boolean,          // fill the parent instead of using the slot's aspect ratio
  alt: { type: String, default: null }
})
const { getMedia } = useData()
const slot = computed(() => getMedia(props.id))
const posterSlot = computed(() => (props.poster ? getMedia(props.poster) : null))
const urls = computed(() => mediaUrls(slot.value))
const posterUrls = computed(() => mediaUrls(posterSlot.value))
const small = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
const showVideo = computed(() => slot.value?.kind === 'video' && urls.value?.video && !small && !reducedMotion)
const imageUrls = computed(() => (slot.value?.kind === 'image' ? urls.value : posterUrls.value))
const altText = computed(() => props.alt ?? slot.value?.alt ?? '')
const isDev = import.meta.env.DEV

const root = ref(null), vid = ref(null)
let io
onMounted(() => {
  if (!vid.value) return
  io = new IntersectionObserver(([e]) => { e.isIntersecting ? vid.value?.play().catch(() => {}) : vid.value?.pause() }, { threshold: 0.15 })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <figure ref="root" :class="['mf', { fill }]" :style="fill ? null : { aspectRatio: slot?.aspect || '3/2' }">
    <div class="mf-inner">
      <video v-if="showVideo" ref="vid" :src="urls.video" :poster="posterUrls?.src" muted loop playsinline preload="metadata" :aria-label="altText"></video>
      <img v-else-if="imageUrls" :src="imageUrls.src" :srcset="imageUrls.srcset" :sizes="sizes" :alt="altText" :loading="eager ? 'eager' : 'lazy'" decoding="async" width="2000" height="1333" />
      <template v-else>
        <SceneArt :scene="slot?.scene || posterSlot?.scene || 'ocean'" role="img" :aria-label="altText" />
      </template>
    </div>
    <figcaption v-if="isDev && !urls && !posterUrls" class="slot-tag">Placeholder · {{ id }}</figcaption>
  </figure>
</template>

<style scoped>
.mf { margin: 0; position: relative; overflow: hidden; background: var(--sand); }
.mf.fill { position: absolute; inset: 0; }
.mf-inner { position: absolute; inset: 0; will-change: transform; }
.mf-inner > img, .mf-inner > video, .mf-inner > :deep(svg) { width: 100%; height: 100%; object-fit: cover; }
.slot-tag { position: absolute; left: .6rem; bottom: .6rem; z-index: 2; font: 500 .68rem/1 var(--sans); letter-spacing: .03em; background: rgba(29, 28, 26, .55); color: #f2ece0; padding: .35rem .55rem; border-radius: 999px; pointer-events: none; }
</style>
