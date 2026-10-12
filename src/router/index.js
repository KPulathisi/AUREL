import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

// Hash history: direct links and refreshes work on GitHub Pages, Cloudflare Pages and Vercel without rewrites.
const routes = [
  { path: '/', component: HomePage, meta: { darkHero: true, title: 'Where the Ocean Slows Time' } },
  { path: '/rooms/:id?', component: () => import('../pages/RoomsPage.vue'), props: true, meta: { title: 'Rooms and villas' } },
  { path: '/experiences', component: () => import('../pages/ExperiencesPage.vue'), meta: { title: 'Experiences' } },
  { path: '/dining', component: () => import('../pages/DiningPage.vue'), meta: { darkHero: true, title: 'Dining at Lunu' } },
  { path: '/dining/menu', component: () => import('../pages/MenuPage.vue'), meta: { title: 'Menu' } },
  { path: '/resort', component: () => import('../pages/AboutPage.vue'), meta: { darkHero: true, title: 'The Resort' } },
  { path: '/book', component: () => import('../pages/BookPage.vue'), meta: { title: 'Plan your stay' } },
  { path: '/credits', component: () => import('../pages/CreditsPage.vue'), meta: { title: 'Credits and project notes' } },
  // Local admin: only exists under `npm run dev`
  ...(import.meta.env.DEV ? [{ path: '/admin/:section?/:id?', component: () => import('../admin/AdminApp.vue'), props: true, meta: { admin: true, title: 'Admin' } }] : []),
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHashHistory(), routes, scrollBehavior: () => false })
router.afterEach((to) => { document.title = `AUREL · ${to.meta.title || ''}` })
export default router
