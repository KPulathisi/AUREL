<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CustomCursor from './components/CustomCursor.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import { gsap, ScrollTrigger, startSmoothScroll, scrollToTarget, reducedMotion } from './composables/useMotion.js'

const route = useRoute()
const curtain = ref(null)
const main = ref(null)

onMounted(() => startSmoothScroll())

// Page transition: a sea-green curtain rises over the old page and lifts off the new one
function onLeave(el, done) {
  // done() must not run synchronously inside the leave hook, or Vue can't mount the next page
  if (reducedMotion || !curtain.value) return requestAnimationFrame(done)
  gsap.timeline({ onComplete: done })
    .set(curtain.value, { yPercent: 100, display: 'block' })
    .to(curtain.value, { yPercent: 0, duration: 0.65, ease: 'expo.inOut' })
    .to(el, { y: -60, opacity: 0.6, duration: 0.65, ease: 'expo.inOut' }, 0)
  firstPage = false
}
let firstPage = true
function onEnter(el, done) {
  if (firstPage) { firstPage = false; return done() } // first load: show content immediately
  scrollToTarget(0, { immediate: true })
  window.scrollTo(0, 0)
  if (reducedMotion || !curtain.value) { requestAnimationFrame(() => { ScrollTrigger.refresh(); done() }); return }
  gsap.timeline({ onComplete: () => {
    gsap.set(curtain.value, { display: 'none' })
    // Remove leftover transforms: a transformed wrapper would break position: fixed pinning
    gsap.set(el, { clearProps: 'transform,opacity' })
    ScrollTrigger.refresh()
    done()
  } })
    .from(el, { y: 80, duration: 0.9, ease: 'expo.out' }, 0.1)
    .to(curtain.value, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 0)
}
</script>

<template>
  <RouterView v-if="route.meta.admin" />
  <template v-else>
    <a class="skip" href="#main" @click.prevent="main?.focus()">Skip to content</a>
    <ScrollProgress />
    <SiteHeader />
    <main id="main" ref="main" tabindex="-1">
      <RouterView v-slot="{ Component, route: r }">
        <Transition mode="out-in" :css="false" @leave="onLeave" @enter="onEnter">
          <component :is="Component" :key="r.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <div ref="curtain" class="curtain no-print" aria-hidden="true"><span>AUREL</span></div>
    <CustomCursor />
  </template>
</template>

<style>
main:focus { outline: none; }
.curtain { position: fixed; inset: 0; z-index: 200; background: var(--sea); display: none; pointer-events: none; }
.curtain span { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-family: var(--serif); letter-spacing: .4em; color: var(--sand); font-size: 1.4rem; }
</style>
