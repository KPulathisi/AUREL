<script setup>
/** Slow, layered sine lines like a calm sea seen from above. Canvas, paused offscreen. */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { reducedMotion } from '../composables/useMotion.js'
const props = defineProps({ color: { type: String, default: '168, 139, 87' }, lines: { type: Number, default: 22 } })
const cv = ref(null)
let raf = 0, io, visible = true, w = 0, h = 0, dpr = 1
function resize() { const c = cv.value; dpr = Math.min(2, devicePixelRatio || 1); w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr }
function draw(t) {
  const ctx = cv.value.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  for (let i = 0; i < props.lines; i++) {
    const y0 = (h / props.lines) * (i + 0.5)
    ctx.beginPath()
    for (let x = 0; x <= w; x += 12) {
      const y = y0 + Math.sin(x / (160 + i * 9) + t / (2600 + i * 120) + i) * (6 + i * 0.35) + Math.sin(x / 47 + t / 1900) * 1.2
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.strokeStyle = `rgba(${props.color}, ${0.08 + (i / props.lines) * 0.16})`
    ctx.lineWidth = 1
    ctx.stroke()
  }
}
function frame(t) { raf = requestAnimationFrame(frame); if (visible) draw(t) }
onMounted(() => {
  resize(); window.addEventListener('resize', resize)
  if (reducedMotion) { draw(0); return }
  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(cv.value)
  raf = requestAnimationFrame(frame)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); io?.disconnect(); window.removeEventListener('resize', resize) })
</script>
<template><canvas ref="cv" class="lines" aria-hidden="true"></canvas></template>
<style scoped>.lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }</style>
