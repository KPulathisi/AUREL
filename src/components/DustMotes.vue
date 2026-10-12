<script setup>
/** Sparse, slow light motes drifting upward, like dust in low sun. Paused when offscreen. */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { reducedMotion } from '../composables/useMotion.js'
const props = defineProps({ count: { type: Number, default: 46 }, color: { type: String, default: '255, 244, 220' } })
const cv = ref(null)
let raf = 0, io, visible = true, parts = [], w = 0, h = 0, dpr = 1

function resize() {
  const c = cv.value
  dpr = Math.min(2, window.devicePixelRatio || 1)
  w = c.clientWidth; h = c.clientHeight
  c.width = w * dpr; c.height = h * dpr
}
function init() {
  parts = Array.from({ length: props.count }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.25 + 0.05, a: Math.random() * 0.5 + 0.15, p: Math.random() * Math.PI * 2 }))
}
function frame(t) {
  raf = requestAnimationFrame(frame)
  if (!visible) return
  const ctx = cv.value.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  for (const p of parts) {
    p.y -= p.s; p.x += Math.sin(t / 3000 + p.p) * 0.15
    if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
    ctx.beginPath()
    ctx.fillStyle = `rgba(${props.color}, ${p.a * (0.6 + 0.4 * Math.sin(t / 900 + p.p))})`
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
}
onMounted(() => {
  if (reducedMotion) return
  resize(); init()
  window.addEventListener('resize', resize)
  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(cv.value)
  raf = requestAnimationFrame(frame)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); io?.disconnect(); window.removeEventListener('resize', resize) })
</script>

<template><canvas ref="cv" class="motes" aria-hidden="true"></canvas></template>

<style scoped>
.motes { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
</style>
