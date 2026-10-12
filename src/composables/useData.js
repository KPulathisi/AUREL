import resort from '../data/resort.json'
import rooms from '../data/rooms.json'
import experiences from '../data/experiences.json'
import architecture from '../data/architecture.json'
import dining from '../data/dining.json'
import location from '../data/location.json'
import testimonials from '../data/testimonials.json'
import media from '../data/media.json'

const mediaById = Object.fromEntries(media.map((m) => [m.id, m]))

export function useData() {
  return {
    resort, rooms, experiences, architecture, dining, location, testimonials, media,
    getRoom: (id) => rooms.find((r) => r.id === id),
    getMedia: (id) => mediaById[id]
  }
}

export const money = (n, cur = resort.currency) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(n)

/** URLs for a media slot's uploaded file (images get a small and a large WebP) */
export function mediaUrls(slot) {
  if (!slot?.file) return null
  const base = import.meta.env.BASE_URL
  if (slot.kind === 'video') return { video: `${base}${slot.file}` }
  return { src: `${base}media/${slot.file}.webp`, srcset: `${base}media/${slot.file}-sm.webp 900w, ${base}media/${slot.file}.webp 2000w` }
}
