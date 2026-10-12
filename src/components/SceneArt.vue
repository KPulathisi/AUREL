<script setup>
/**
 * Art-directed, softly animated SVG scenes used as placeholders until a real photo or video
 * is added for a media slot. Each scene matches the subject of its slot.
 */
import { computed, useId } from 'vue'
const props = defineProps({ scene: { type: String, default: 'ocean' } })
const id = useId().replace(/[^a-z0-9]/gi, '')
const s = computed(() => ({ fire: 'dining', courtyard: 'interior' }[props.scene] || props.scene))

// Gentle sine-wave paths for water
const wave = (y, amp, len, phase = 0) => {
  let d = `M-200 ${y}`
  for (let x = -200; x <= 1800; x += 40) d += ` L${x} ${(y + Math.sin((x + phase) / len) * amp).toFixed(1)}`
  return d
}
const waves = (y0, n, gap, amp) => Array.from({ length: n }, (_, i) => ({ d: wave(y0 + i * gap * (1 + i * 0.25), amp * (1 + i * 0.4), 60 + i * 12, i * 90), o: 0.18 + i * 0.05, dur: 9 + i * 2.5 }))
const palm = (x, y, h, flip = 1) => {
  const top = [x + 40 * flip, y - h]
  const trunk = `M${x} ${y} Q${x + 10 * flip} ${y - h * 0.5} ${top[0]} ${top[1]}`
  const fronds = [-150, -110, -60, -20, 25, 70, 120, 160].map((a, i) => {
    const r = (a * Math.PI) / 180, len = 150 + (i % 3) * 30
    const ex = top[0] + Math.cos(r) * len * flip, ey = top[1] + Math.sin(r) * len * 0.6 + 50
    const cx = top[0] + Math.cos(r) * len * 0.5 * flip, cy = top[1] + Math.sin(r) * len * 0.5 - 30
    return `M${top[0]} ${top[1]} Q${cx} ${cy} ${ex} ${ey}`
  })
  return { trunk, fronds, top }
}
const palms = [palm(120, 1000, 640), palm(1480, 1000, 720, -1), palm(1380, 1000, 520, -1)]
const stars = Array.from({ length: 60 }, (_, i) => ({ x: (i * 137.5) % 1600, y: (i * 61.3) % 520, r: (i % 3) * 0.6 + 0.6, d: (i % 5) + 2 }))
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient :id="`sky${id}`" x1="0" y1="0" x2="0" y2="1">
        <template v-if="s === 'sunset'"><stop offset="0" stop-color="#5d5a73" /><stop offset=".5" stop-color="#c98b6d" /><stop offset="1" stop-color="#ecc29a" /></template>
        <template v-else-if="s === 'night' || s === 'dining'"><stop offset="0" stop-color="#0f1f24" /><stop offset="1" stop-color="#24464a" /></template>
        <template v-else-if="s === 'sunrise'"><stop offset="0" stop-color="#b9c4c3" /><stop offset=".55" stop-color="#ecd2bd" /><stop offset="1" stop-color="#f4dfc5" /></template>
        <template v-else><stop offset="0" stop-color="#cfd8d3" /><stop offset=".6" stop-color="#efe1cd" /><stop offset="1" stop-color="#f3e6d3" /></template>
      </linearGradient>
      <linearGradient :id="`sea${id}`" x1="0" y1="0" x2="0" y2="1">
        <template v-if="s === 'sunset'"><stop offset="0" stop-color="#8a6f6e" /><stop offset="1" stop-color="#2b3940" /></template>
        <template v-else-if="s === 'night' || s === 'boat'"><stop offset="0" stop-color="#2b5359" /><stop offset="1" stop-color="#0f2326" /></template>
        <template v-else><stop offset="0" stop-color="#8fb3ad" /><stop offset="1" stop-color="#2c5652" /></template>
      </linearGradient>
      <radialGradient :id="`sun${id}`"><stop offset="0" stop-color="#fff6e6" /><stop offset=".35" stop-color="#ffe9c7" stop-opacity=".9" /><stop offset="1" stop-color="#ffe2b8" stop-opacity="0" /></radialGradient>
      <radialGradient :id="`glow${id}`"><stop offset="0" stop-color="#ffd59a" stop-opacity=".95" /><stop offset="1" stop-color="#ffb35c" stop-opacity="0" /></radialGradient>
      <linearGradient :id="`ray${id}`" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4dc" stop-opacity=".55" /><stop offset="1" stop-color="#fff4dc" stop-opacity="0" /></linearGradient>
      <filter :id="`blur${id}`"><feGaussianBlur stdDeviation="30" /></filter>
      <clipPath :id="`win${id}`"><rect x="380" y="470" width="840" height="270" /></clipPath>
      <clipPath :id="`pool${id}`"><rect x="240" y="760" width="1120" height="150" /></clipPath>
    </defs>

    <!-- OCEAN / SUNRISE / SUNSET / BOAT / NIGHT: horizon scenes -->
    <template v-if="['ocean', 'sunrise', 'sunset', 'boat', 'night'].includes(s)">
      <rect width="1600" height="1000" :fill="`url(#sky${id})`" />
      <g v-if="s === 'night'"><circle v-for="(st, i) in stars" :key="i" :cx="st.x" :cy="st.y" :r="st.r" fill="#f2ece0" class="twinkle" :style="{ animationDuration: st.d + 's' }" /><circle cx="1180" cy="190" r="52" fill="#f3ead6" /><circle cx="1180" cy="190" r="140" :fill="`url(#sun${id})`" opacity=".35" /></g>
      <g v-else :class="['sun', { rise: s === 'sunrise' }]">
        <circle :cx="s === 'sunset' ? 980 : 820" :cy="s === 'sunset' ? 560 : 430" r="260" :fill="`url(#sun${id})`" />
        <circle :cx="s === 'sunset' ? 980 : 820" :cy="s === 'sunset' ? 560 : 430" r="62" :fill="s === 'sunset' ? '#ffd2a1' : '#fff4e2'" />
      </g>
      <rect y="580" width="1600" height="420" :fill="`url(#sea${id})`" />
      <rect x="0" y="560" width="1600" height="50" fill="#fff" opacity=".18" :filter="`url(#blur${id})`" class="mist" />
      <rect v-if="s === 'sunset' || s === 'ocean' || s === 'sunrise'" :x="(s === 'sunset' ? 980 : 820) - 50" y="585" width="100" height="380" fill="#fff3dc" opacity=".22" class="shimmer" />
      <g class="waves"><path v-for="(w, i) in waves(610, 6, 34, 4)" :key="i" :d="w.d" fill="none" stroke="#f6efe2" :stroke-opacity="w.o" stroke-width="1.6" :style="{ animationDuration: w.dur + 's' }" /></g>
      <g v-if="s === 'boat'" class="bob"><path d="M700 640 L860 640 L835 664 L725 664 Z" fill="#f2ece0" /><rect x="760" y="600" width="44" height="40" fill="#e3d7c2" /><line x1="782" y1="560" x2="782" y2="600" stroke="#e3d7c2" stroke-width="3" /></g>
      <g v-if="s === 'boat'" class="spout"><ellipse cx="1240" cy="588" rx="10" ry="34" fill="#e8f0ee" opacity=".7" /></g>
      <g v-if="s === 'ocean' || s === 'sunrise'">
        <path d="M0 860 Q400 820 800 870 T1600 850 L1600 1000 L0 1000 Z" fill="#e9dcc3" />
        <g v-for="(p, i) in palms" :key="i" class="sway" :style="{ transformOrigin: `${p.top[0]}px ${p.top[1]}px`, animationDelay: i * -1.7 + 's' }">
          <path :d="p.trunk" stroke="#2f3a31" stroke-width="14" fill="none" stroke-linecap="round" />
          <path v-for="(f, j) in p.fronds" :key="j" :d="f" stroke="#33473a" stroke-width="10" fill="none" stroke-linecap="round" />
        </g>
      </g>
      <g v-if="s === 'sunrise'"><path v-for="i in 9" :key="i" :d="`M${800 - i * 260} 1000 L${800 - i * 36} 880 L${800 + i * 36} 880`" stroke="#6b5640" stroke-opacity=".25" fill="none" /><rect x="0" y="880" width="1600" height="120" fill="#8a6b4f" opacity=".55" /></g>
      <g v-if="s === 'night'"><path d="M0 820 Q500 790 900 830 T1600 810 L1600 1000 L0 1000 Z" fill="#c9bfa8" opacity=".35" /><path d="M520 1000 C600 930 700 900 760 840" stroke="#0f1f24" stroke-opacity=".5" stroke-width="22" stroke-dasharray="6 14" fill="none" /></g>
    </template>

    <!-- GARDEN: layered foliage, wall, shifting light -->
    <template v-else-if="s === 'garden'">
      <rect width="1600" height="1000" fill="#e9e1cf" />
      <rect x="900" y="80" width="620" height="760" fill="#f1ebdd" />
      <g class="shadow-drift" opacity=".18"><ellipse v-for="i in 7" :key="i" :cx="980 + (i % 3) * 170" :cy="180 + i * 90" rx="90" ry="30" fill="#55553a" :transform="`rotate(${i * 23} ${980 + (i % 3) * 170} ${180 + i * 90})`" /></g>
      <polygon points="300,0 620,0 1200,1000 760,1000" :fill="`url(#ray${id})`" class="ray" />
      <g v-for="(c, i) in [['#4e5a3a', 0.95], ['#66663f', 0.9], ['#7d8253', 0.85]]" :key="i" class="sway-slow" :style="{ animationDelay: i * -2 + 's', transformOrigin: `${200 + i * 120}px 1000px` }">
        <ellipse v-for="k in 6" :key="k" :cx="80 + k * 90 + i * 60" :cy="760 - k * 70 + i * 40" rx="160" ry="54" :fill="c[0]" :opacity="c[1]" :transform="`rotate(${-40 + k * 18} ${80 + k * 90 + i * 60} ${760 - k * 70 + i * 40})`" />
      </g>
      <g class="sway-slow" style="transform-origin: 1450px 1000px; animation-delay: -3s"><ellipse v-for="k in 5" :key="k" :cx="1500 - k * 60" :cy="900 - k * 80" rx="150" ry="48" fill="#4e5a3a" :transform="`rotate(${200 - k * 22} ${1500 - k * 60} ${900 - k * 80})`" /></g>
      <g v-for="i in 9" :key="'f' + i" class="float" :style="{ animationDelay: i * -1.3 + 's' }"><circle :cx="400 + i * 110" :cy="300 + (i % 4) * 110" r="9" fill="#f8f2e4" /><circle :cx="400 + i * 110" :cy="300 + (i % 4) * 110" r="3.5" fill="#e8c873" /></g>
      <rect y="880" width="1600" height="120" fill="#d7ccb3" />
    </template>

    <!-- VILLA: pavilions, terracotta roofs, pool -->
    <template v-else-if="s === 'villa'">
      <rect width="1600" height="1000" :fill="`url(#sky${id})`" />
      <circle cx="1240" cy="260" r="200" :fill="`url(#sun${id})`" class="sun" />
      <g v-for="(b, i) in [[160, 470, 560, 230], [820, 520, 520, 180], [1350, 545, 300, 155]]" :key="i">
        <polygon :points="`${b[0] - 50},${b[1]} ${b[0] + b[2] / 2},${b[1] - b[3] * 0.55} ${b[0] + b[2] + 50},${b[1]}`" fill="#a8714f" />
        <rect :x="b[0]" :y="b[1]" :width="b[2]" :height="b[3]" fill="#f4efe3" />
        <rect :x="b[0]" :y="b[1]" :width="b[2]" height="26" fill="#d9cdb6" />
        <rect v-for="k in Math.floor(b[2] / 70)" :key="k" :x="b[0] + k * 70 - 8" :y="b[1] + 26" width="12" :height="b[3] - 26" fill="#e3d8c3" />
      </g>
      <rect y="700" width="1600" height="300" fill="#dccdb1" />
      <rect x="240" y="760" width="1120" height="150" fill="#5f8d89" />
      <rect x="240" y="760" width="1120" height="150" fill="#fff" opacity=".12" class="shimmer" />
      <g class="waves" :clip-path="`url(#pool${id})`"><path v-for="(w, i) in waves(790, 3, 30, 3)" :key="i" :d="w.d" fill="none" stroke="#e8f1ee" :stroke-opacity="w.o + .1" stroke-width="1.4" :style="{ animationDuration: w.dur + 's' }" /></g>
      <g v-for="(p, i) in palms.slice(0, 2)" :key="i" class="sway" :style="{ transformOrigin: `${p.top[0]}px ${p.top[1]}px`, animationDelay: i * -2 + 's' }">
        <path :d="p.trunk" stroke="#2f3a31" stroke-width="14" fill="none" /><path v-for="(f, j) in p.fronds" :key="j" :d="f" stroke="#33473a" stroke-width="10" fill="none" stroke-linecap="round" />
      </g>
    </template>

    <!-- INTERIOR / COURTYARD: opening onto the sea, breathing curtains, moving shadow -->
    <template v-else-if="s === 'interior'">
      <rect width="1600" height="1000" fill="#efe7d8" />
      <rect x="380" y="120" width="840" height="620" :fill="`url(#sky${id})`" />
      <rect x="380" y="470" width="840" height="270" :fill="`url(#sea${id})`" />
      <g class="waves" :clip-path="`url(#win${id})`"><path v-for="(w, i) in waves(500, 4, 26, 3)" :key="i" :d="w.d" fill="none" stroke="#f6efe2" :stroke-opacity="w.o" stroke-width="1.4" :style="{ animationDuration: w.dur + 's' }" /></g>
      <rect x="340" y="100" width="40" height="660" fill="#d8ccb6" /><rect x="1220" y="100" width="40" height="660" fill="#d8ccb6" /><rect x="340" y="80" width="920" height="40" fill="#cbbda3" />
      <path class="curtain" d="M380 120 C420 300 360 520 410 740 L520 740 C480 520 540 300 500 120 Z" fill="#fbf7ef" opacity=".85" />
      <path class="curtain c2" d="M1220 120 C1180 300 1240 520 1190 740 L1080 740 C1120 520 1060 300 1100 120 Z" fill="#fbf7ef" opacity=".85" />
      <polygon points="380,740 1220,740 1500,1000 100,1000" fill="#d9cfbd" />
      <polygon points="520,740 1080,740 1250,1000 360,1000" fill="#fff8ea" opacity=".35" class="ray" />
      <g class="shadow-drift" opacity=".12"><path d="M1300 200 Q1400 260 1480 420 M1300 200 Q1420 200 1560 260 M1300 200 Q1360 330 1350 480" stroke="#3c3a2a" stroke-width="40" fill="none" /></g>
    </template>

    <!-- DINING: lanterns at night over a table line -->
    <template v-else-if="s === 'dining'">
      <rect width="1600" height="1000" :fill="`url(#sky${id})`" />
      <rect y="560" width="1600" height="440" fill="#183034" />
      <g class="waves"><path v-for="(w, i) in waves(600, 4, 30, 3)" :key="i" :d="w.d" fill="none" stroke="#d6c7a8" :stroke-opacity="w.o * .6" stroke-width="1.4" :style="{ animationDuration: w.dur + 's' }" /></g>
      <rect x="200" y="760" width="1200" height="18" fill="#f2ece0" opacity=".9" /><rect x="260" y="778" width="12" height="160" fill="#c9b48f" /><rect x="1328" y="778" width="12" height="160" fill="#c9b48f" />
      <g v-for="i in 7" :key="i" class="flicker" :style="{ animationDelay: i * -0.37 + 's' }">
        <circle :cx="200 + i * 170" :cy="320 + (i % 2) * 60" r="120" :fill="`url(#glow${id})`" opacity=".55" />
        <line :x1="200 + i * 170" y1="0" :x2="200 + i * 170" :y2="300 + (i % 2) * 60" stroke="#c9b48f" stroke-opacity=".5" />
        <rect :x="186 + i * 170" :y="300 + (i % 2) * 60" width="28" height="40" rx="6" fill="#ffd9a0" />
      </g>
      <g v-for="i in 3" :key="'c' + i" class="flicker" :style="{ animationDelay: i * -0.6 + 's' }"><circle :cx="500 + i * 200" cy="740" r="60" :fill="`url(#glow${id})`" opacity=".7" /><rect :x="496 + i * 200" y="712" width="8" height="48" fill="#f8f0de" /></g>
    </template>

    <!-- FOOD: top-down table -->
    <template v-else-if="s === 'food'">
      <rect width="1600" height="1000" fill="#5b4733" />
      <g opacity=".18"><line v-for="i in 12" :key="i" x1="0" :y1="i * 90" x2="1600" :y2="i * 90 + 40" stroke="#2b1f14" stroke-width="3" /></g>
      <circle cx="760" cy="500" r="300" fill="#1f1c1a" /><circle cx="760" cy="500" r="250" fill="#a8542f" /><circle cx="760" cy="500" r="250" fill="#c46c34" opacity=".5" class="steam-glow" />
      <g v-for="i in 10" :key="i"><ellipse :cx="760 + Math.cos(i) * 140" :cy="500 + Math.sin(i * 1.7) * 120" rx="48" ry="22" fill="#e9d6b6" :transform="`rotate(${i * 40} ${760 + Math.cos(i) * 140} ${500 + Math.sin(i * 1.7) * 120})`" /></g>
      <g v-for="i in 14" :key="'l' + i"><ellipse :cx="560 + (i * 53) % 400" :cy="330 + (i * 37) % 340" rx="18" ry="7" fill="#3f5a2a" :transform="`rotate(${i * 30} ${560 + (i * 53) % 400} ${330 + (i * 37) % 340})`" /></g>
      <circle cx="1240" cy="300" r="140" fill="#efe5d2" /><circle cx="1240" cy="300" r="110" fill="#b34a2a" opacity=".85" />
      <circle cx="1260" cy="760" r="110" fill="#efe5d2" /><g v-for="i in 30" :key="'r' + i"><circle :cx="1260 + Math.cos(i * 2.4) * (i * 2.8)" :cy="760 + Math.sin(i * 2.4) * (i * 2.8)" r="6" fill="#8c3b2a" /></g>
      <path d="M200 160 q60 -40 120 0 t120 0" stroke="#e9d6b6" stroke-width="10" fill="none" opacity=".6" class="steam" />
    </template>

    <!-- TEMPLE: granite rock, white cave shrine, steps -->
    <template v-else-if="s === 'temple'">
      <rect width="1600" height="1000" :fill="`url(#sky${id})`" />
      <circle cx="1250" cy="230" r="220" :fill="`url(#sun${id})`" class="sun" />
      <path d="M300 1000 C320 640 520 360 860 330 C1160 320 1320 560 1360 1000 Z" fill="#7d7768" />
      <path d="M420 1000 C460 720 600 500 820 470 C1000 460 1120 640 1160 1000 Z" fill="#8f897a" opacity=".7" />
      <path d="M760 470 Q820 410 900 470 L900 560 L760 560 Z" fill="#f4efe4" /><rect x="805" y="500" width="50" height="60" fill="#3d3a33" />
      <g><rect v-for="i in 14" :key="i" :x="790 - i * 10" :y="560 + i * 31" :width="80 + i * 20" height="8" fill="#e6dfd1" opacity=".85" /></g>
      <g class="sway-slow" style="transform-origin: 1450px 1000px"><ellipse v-for="k in 6" :key="k" :cx="1480 - k * 40" :cy="820 - k * 60" rx="120" ry="40" fill="#5c6440" :transform="`rotate(${190 - k * 20} ${1480 - k * 40} ${820 - k * 60})`" /></g>
    </template>

    <rect v-else width="1600" height="1000" fill="#dccdb1" />
  </svg>
</template>

<style scoped>
.scene { width: 100%; height: 100%; display: block; }
.waves path { animation: drift 10s ease-in-out infinite alternate; }
@keyframes drift { from { transform: translateX(-40px); } to { transform: translateX(40px); } }
.sway { animation: sway 7s ease-in-out infinite alternate; }
@keyframes sway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
.sway-slow { animation: sway 11s ease-in-out infinite alternate; }
.sun { animation: pulse 8s ease-in-out infinite alternate; transform-origin: center; }
.sun.rise { animation: rise 24s ease-out infinite alternate; }
@keyframes pulse { from { opacity: .85; } to { opacity: 1; } }
@keyframes rise { from { transform: translateY(40px); } to { transform: translateY(-30px); } }
.mist { animation: drift 18s ease-in-out infinite alternate; }
.shimmer { animation: shimmer 4s ease-in-out infinite alternate; }
@keyframes shimmer { from { opacity: .12; } to { opacity: .3; } }
.ray { animation: shimmer 9s ease-in-out infinite alternate; }
.shadow-drift { animation: drift 16s ease-in-out infinite alternate; }
.float { animation: float 9s ease-in-out infinite alternate; }
@keyframes float { from { transform: translate(0, 0); } to { transform: translate(18px, -26px); } }
.curtain { animation: curtain 6s ease-in-out infinite alternate; transform-origin: top; }
.curtain.c2 { animation-delay: -3s; }
@keyframes curtain { from { transform: skewX(-3deg) scaleX(.96); } to { transform: skewX(4deg) scaleX(1.06); } }
.flicker { animation: flicker 3s ease-in-out infinite alternate; }
@keyframes flicker { 0% { opacity: .75; } 40% { opacity: 1; } 70% { opacity: .85; } 100% { opacity: .95; } }
.bob { animation: bob 5s ease-in-out infinite alternate; }
@keyframes bob { from { transform: translateY(-4px) rotate(-1deg); } to { transform: translateY(5px) rotate(1deg); } }
.spout { animation: spout 6s ease-in-out infinite; transform-origin: 1240px 620px; }
@keyframes spout { 0%, 70% { opacity: 0; transform: scaleY(.2); } 80% { opacity: .8; transform: scaleY(1); } 100% { opacity: 0; transform: scaleY(1.2); } }
.twinkle { animation: shimmer 3s ease-in-out infinite alternate; }
.steam { animation: float 6s ease-in-out infinite alternate; }
.steam-glow { animation: shimmer 5s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
