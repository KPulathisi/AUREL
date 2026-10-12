<script setup>
import { useData } from '../composables/useData.js'
const { resort } = useData()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr">
    <div class="wrap top">
      <div class="col">
        <p class="it big">A sanctuary on the southern coast of Sri Lanka.</p>
        <a :href="`mailto:${resort.contact.email}`" class="link-line">{{ resort.contact.email }}</a>
        <p class="muted">{{ resort.contact.address }}</p>
      </div>
      <nav class="col links" aria-label="Footer">
        <RouterLink to="/rooms" class="link-line">Rooms</RouterLink>
        <RouterLink to="/experiences" class="link-line">Experiences</RouterLink>
        <RouterLink to="/dining" class="link-line">Dining</RouterLink>
        <RouterLink to="/dining/menu" class="link-line">Menu</RouterLink>
        <RouterLink to="/resort" class="link-line">The Resort</RouterLink>
        <RouterLink to="/book" class="link-line">Plan your stay</RouterLink>
      </nav>
      <div class="col">
        <p class="muted">{{ resort.fictionalNotice }}</p>
        <RouterLink to="/credits" class="link-line">Image credits and project notes</RouterLink>
      </div>
    </div>
    <p class="giant" aria-hidden="true">AUREL</p>
    <div class="wrap base"><span>© {{ year }} AUREL. A portfolio project.</span><span>Tangalle, Sri Lanka · fictional</span></div>
  </footer>
</template>

<style scoped>
.ftr { background: var(--sea-deep); color: var(--ivory); padding-top: clamp(4rem, 8vw, 7rem); overflow: hidden; }
.top { display: grid; grid-template-columns: 1.3fr .8fr 1fr; gap: 2.5rem; }
.col { display: flex; flex-direction: column; gap: .7rem; align-items: flex-start; font-size: var(--step--1); }
.big { font-size: var(--step-2); line-height: 1.2; max-width: 18ch; margin-bottom: .5rem; }
.muted { color: rgba(242, 236, 224, .6); margin: 0; }
.links a { text-decoration: none; }
.giant { font-family: var(--serif); font-size: clamp(5rem, 24vw, 26rem); line-height: .8; letter-spacing: .08em; text-align: center; margin: 3rem 0 0; color: transparent; -webkit-text-stroke: 1px rgba(242, 236, 224, .22); white-space: nowrap; transform: translateY(8%); }
.base { display: flex; justify-content: space-between; gap: 1rem; padding-block: 1.4rem; border-top: 1px solid var(--line-light); font-size: .78rem; color: rgba(242, 236, 224, .55); flex-wrap: wrap; position: relative; }
@media (max-width: 800px) { .top { grid-template-columns: 1fr; } }
</style>
