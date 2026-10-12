# AUREL media prompts

Generated from `src/data/media.json` (32 slots, 0 uploaded). Run `npm run prompts` after editing prompts.

Every slot shows an animated illustration until a real file is added. The easiest route is the local admin
(`npm run dev`, then open `/#/admin` → Images & videos): copy a prompt, generate the image or video in your tool of choice,
and upload it. The admin converts images to WebP and fills in `media.json` for you.

Tips

- Keep the same style suffix on every prompt so the set feels like one shoot.
- Check the licence of the generator or stock source you use and record it in the slot's **Credit** field; credits appear on the Credits page.
- Avoid real logos, readable signage and identifiable faces.
- Each video has a separate still "poster" slot, used on phones and with reduced motion.

## Videos (5)

### Home hero (background video)

- Slot: `hero-video` · video · aspect 16/9 · placeholder
- Alt text: Dawn over a quiet crescent bay on Sri Lanka's southern coast.
- Save as: `public/media/videos/hero-video.mp4` (H.264, 1920×1080 or smaller, 8–12 s loop, no audio, ideally under 15 MB)

```text
Cinematic slow drone shot at dawn gliding over a quiet crescent beach on Sri Lanka's southern coast near Tangalle. Clear turquoise shallows, gentle waves rolling onto golden sand, tall coconut palms, and a few low pavilions with terracotta clay-tile roofs half hidden among the palms. Soft pink and gold light with light sea mist. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. 8–12 seconds. Slow, steady camera, seamless loop, no cuts, no people facing camera, no text. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Story: rooms that breathe (video)

- Slot: `story-video` · video · aspect 4/5 · placeholder
- Alt text: Sheer linen curtains moving in the sea breeze inside an open pavilion.
- Save as: `public/media/videos/story-video.mp4` (H.264, 1920×1080 or smaller, 8–12 s loop, no audio, ideally under 15 MB)

```text
Vertical close shot inside an open-sided pavilion: sheer white linen curtains moving gently in a sea breeze, polished cement floor, teak furniture, the ocean softly out of focus beyond. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. 6–8 seconds. Slow, steady camera, seamless loop, no cuts, no people facing camera, no text. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Architecture III: courtyards and light (video)

- Slot: `arch-video` · video · aspect 3/2 · placeholder
- Alt text: Sunlight and shadow moving across a courtyard wall.
- Save as: `public/media/videos/arch-video.mp4` (H.264, 1920×1080 or smaller, 8–12 s loop, no audio, ideally under 15 MB)

```text
Time-lapse of sunlight and palm shadows moving slowly across a lime-washed courtyard wall and polished floor in an open-air tropical courtyard, a small frangipani tree in the centre. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. 8–10 seconds. Slow, steady camera, seamless loop, no cuts, no people facing camera, no text. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Dining: cooked over fire (video)

- Slot: `dining-video` · video · aspect 4/5 · placeholder
- Alt text: Fish grilling over a coconut-husk fire.
- Save as: `public/media/videos/dining-video.mp4` (H.264, 1920×1080 or smaller, 8–12 s loop, no audio, ideally under 15 MB)

```text
Close slow-motion shot of fish and prawns grilling over glowing coconut-husk embers, gentle smoke and sparks rising, warm firelight. 6–8 seconds. Slow, steady camera, seamless loop, no cuts, no people facing camera, no text. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Closing section (background video)

- Slot: `cta-video` · video · aspect 16/9 · placeholder
- Alt text: Waves washing over golden sand at sunset, seen from above.
- Save as: `public/media/videos/cta-video.mp4` (H.264, 1920×1080 or smaller, 8–12 s loop, no audio, ideally under 15 MB)

```text
Top-down slow drone shot of gentle waves washing over golden sand at sunset, foam patterns spreading and retreating. 8–12 seconds. Slow, steady camera, seamless loop, no cuts, no people facing camera, no text. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

## Images (27)

### Home hero (still image, also used on mobile)

- Slot: `hero-poster` · image · aspect 16/9 · placeholder
- Alt text: Dawn over a quiet crescent bay lined with palms and low pavilions.
- Save as: upload in the admin, or export `public/media/hero-poster.webp` (2000px wide) and `public/media/hero-poster-sm.webp` (900px wide)

```text
Wide aerial photograph at dawn of a quiet crescent bay on Sri Lanka's southern coast, turquoise shallows, golden sand, coconut palms and a few low terracotta-roofed pavilions hidden in the trees. Soft pink-gold light, calm sea. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Story: shaped by the tide

- Slot: `story-1` · image · aspect 4/5 · placeholder
- Alt text: Low tide pools reflecting the morning sky beside a timber deck.
- Save as: upload in the admin, or export `public/media/story-1.webp` (2000px wide) and `public/media/story-1-sm.webp` (900px wide)

```text
Vertical photograph of low tide on a southern Sri Lankan beach at early morning: shallow tide pools mirror a pale sky, a weathered teak deck leads towards the water, a traditional oruwa outrigger canoe rests on the sand in the distance. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Story: gardens before buildings

- Slot: `story-2` · image · aspect 16/9 · placeholder
- Alt text: Frangipani shadows falling across a lime-washed garden wall.
- Save as: upload in the admin, or export `public/media/story-2.webp` (2000px wide) and `public/media/story-2-sm.webp` (900px wide)

```text
Wide photograph of a lush tropical garden path at a boutique resort: frangipani trees in bloom casting dappled shadows on a lime-washed wall, ferns and native palms, a stepping-stone path, warm late-morning light. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Ocean Pavilion: main

- Slot: `room-ocean-1` · image · aspect 3/2 · placeholder
- Alt text: An open ocean pavilion with a plunge pool and daybed facing the bay.
- Save as: upload in the admin, or export `public/media/room-ocean-1.webp` (2000px wide) and `public/media/room-ocean-1-sm.webp` (900px wide)

```text
Wide photograph of a luxury beachfront pavilion suite with its teak sliding screens folded open: king bed with white linen, a dark-tiled plunge pool on the veranda, an ocean-facing daybed, palms framing the turquoise bay. Golden morning light. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Ocean Pavilion: outdoor shower

- Slot: `room-ocean-2` · image · aspect 4/5 · placeholder
- Alt text: An outdoor rain shower in a small walled garden.
- Save as: upload in the admin, or export `public/media/room-ocean-2.webp` (2000px wide) and `public/media/room-ocean-2-sm.webp` (900px wide)

```text
Vertical photograph of an outdoor rain shower in a small walled garden of a beach pavilion: lime-washed walls, a brass rain-shower head, river-stone floor, creeping beach morning glory, soft sunlight. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Ocean Pavilion: daybed detail

- Slot: `room-ocean-3` · image · aspect 3/2 · placeholder
- Alt text: A linen daybed on a teak veranda overlooking the sea.
- Save as: upload in the admin, or export `public/media/room-ocean-3.webp` (2000px wide) and `public/media/room-ocean-3-sm.webp` (900px wide)

```text
Photograph of a deep linen daybed with olive and sand cushions on a teak veranda, a woven tray with king coconut and tea, the Indian Ocean beyond. Soft sunrise light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Garden Sanctuary: main

- Slot: `room-garden-1` · image · aspect 3/2 · placeholder
- Alt text: A courtyard suite wrapped around a frangipani garden and reflecting pool.
- Save as: upload in the admin, or export `public/media/room-garden-1.webp` (2000px wide) and `public/media/room-garden-1-sm.webp` (900px wide)

```text
Wide photograph of a courtyard suite at a tropical resort: rooms open onto a private walled garden with a frangipani tree, ferns and a still rectangular reflecting pool, lime-washed walls, terracotta roof edges. Afternoon light. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Garden Sanctuary: stone bath

- Slot: `room-garden-2` · image · aspect 4/5 · placeholder
- Alt text: A sunken stone bath open to the sky.
- Save as: upload in the admin, or export `public/media/room-garden-2.webp` (2000px wide) and `public/media/room-garden-2-sm.webp` (900px wide)

```text
Vertical photograph of a sunken grey granite bath in an open-roofed bathroom courtyard, frangipani flowers floating in the water, ferns along the walls, sky visible above. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Garden Sanctuary: reading veranda

- Slot: `room-garden-3` · image · aspect 3/2 · placeholder
- Alt text: A reading veranda with a planter's chair looking onto the garden.
- Save as: upload in the admin, or export `public/media/room-garden-3.webp` (2000px wide) and `public/media/room-garden-3-sm.webp` (900px wide)

```text
Photograph of a shaded veranda with a teak planter's chair, a stack of books and a ceramic lamp, looking out onto a lush walled garden. Late-afternoon light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Horizon Villa: main

- Slot: `room-villa-1` · image · aspect 3/2 · placeholder
- Alt text: A villa infinity pool on a headland, merging with the ocean.
- Save as: upload in the admin, or export `public/media/room-villa-1.webp` (2000px wide) and `public/media/room-villa-1-sm.webp` (900px wide)

```text
Wide photograph of a two-pavilion luxury villa on a rocky headland: an eighteen-metre infinity pool that appears to merge with the Indian Ocean, sun loungers, terracotta-roofed pavilions, coconut palms. Golden hour. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Horizon Villa: rooftop deck

- Slot: `room-villa-2` · image · aspect 4/5 · placeholder
- Alt text: A rooftop deck at sunset with lanterns.
- Save as: upload in the admin, or export `public/media/room-villa-2.webp` (2000px wide) and `public/media/room-villa-2-sm.webp` (900px wide)

```text
Vertical photograph of a rooftop timber deck at sunset above the ocean: low cushions, brass lanterns, a bottle of arrack and glasses, warm orange sky fading to violet. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Horizon Villa: living pavilion

- Slot: `room-villa-3` · image · aspect 3/2 · placeholder
- Alt text: An airy living pavilion with teak furniture and open sides.
- Save as: upload in the admin, or export `public/media/room-villa-3.webp` (2000px wide) and `public/media/room-villa-3-sm.webp` (900px wide)

```text
Wide photograph of an open-sided living and dining pavilion: long teak dining table, rattan chairs, ceramic vessels, polished cement floor, ocean and palms visible on three sides. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Experience: sunrise yoga

- Slot: `exp-yoga` · image · aspect 3/4 · placeholder
- Alt text: A timber yoga deck above the beach at sunrise.
- Save as: upload in the admin, or export `public/media/exp-yoga.webp` (2000px wide) and `public/media/exp-yoga-sm.webp` (900px wide)

```text
Vertical photograph of an empty raised timber yoga deck above a beach at sunrise, two rolled natural-fibre mats, brass singing bowl, soft mist over the sea, fishing boats on the horizon. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Experience: private dining

- Slot: `exp-dining` · image · aspect 16/9 · placeholder
- Alt text: A table for two on the sand, lit by lanterns at dusk.
- Save as: upload in the admin, or export `public/media/exp-dining.webp` (2000px wide) and `public/media/exp-dining-sm.webp` (900px wide)

```text
Wide photograph of a private dinner table for two set on the beach at dusk: white linen, brass lanterns and candles, frangipani petals, gentle waves behind, deep blue sky with the last light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Experience: ocean excursions

- Slot: `exp-ocean` · image · aspect 1/1 · placeholder
- Alt text: A small boat on a calm deep-blue sea, a whale's spout in the distance.
- Save as: upload in the admin, or export `public/media/exp-ocean.webp` (2000px wide) and `public/media/exp-ocean-sm.webp` (900px wide)

```text
Square photograph of a small white boat on a calm deep-blue ocean off Mirissa in early morning, a distant whale spout on the horizon, soft light. Respectful distance, no people in focus. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Experience: wellness rituals

- Slot: `exp-wellness` · image · aspect 3/4 · placeholder
- Alt text: A treatment pavilion screened by bamboo, with warm oils and flowers.
- Save as: upload in the admin, or export `public/media/exp-wellness.webp` (2000px wide) and `public/media/exp-wellness-sm.webp` (900px wide)

```text
Vertical photograph of a calm spa pavilion screened by bamboo blinds: a treatment bed with linen, small clay bowls of warm herbal oil, coconut halves, frangipani and lotus flowers, soft filtered light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Experience: local culture

- Slot: `exp-culture` · image · aspect 16/9 · placeholder
- Alt text: Rock-cut steps leading up to an ancient cave temple.
- Save as: upload in the admin, or export `public/media/exp-culture.webp` (2000px wide) and `public/media/exp-culture-sm.webp` (900px wide)

```text
Wide photograph of ancient rock-cut stone steps climbing towards a whitewashed cave temple on a granite rock in southern Sri Lanka, frangipani trees, soft morning light. Respectful, no people. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Experience: turtle nesting walks

- Slot: `exp-turtles` · image · aspect 1/1 · placeholder
- Alt text: Turtle tracks on moonlit sand.
- Save as: upload in the admin, or export `public/media/exp-turtles.webp` (2000px wide) and `public/media/exp-turtles-sm.webp` (900px wide)

```text
Square photograph of sea-turtle tracks leading across moonlit sand towards dunes on Rekawa beach, Sri Lanka, at night; soft moonlight, deep blue tones, no flash, no artificial light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Architecture I: arrival court

- Slot: `arch-1` · image · aspect 3/2 · placeholder
- Alt text: A gravel arrival court with a single frangipani tree.
- Save as: upload in the admin, or export `public/media/arch-1.webp` (2000px wide) and `public/media/arch-1-sm.webp` (900px wide)

```text
Wide photograph of a serene gravel arrival courtyard at a tropical resort: a single sculptural frangipani tree, a low lime-washed wall, a deep terracotta-tiled entrance roof casting shade. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Architecture II: long veranda

- Slot: `arch-2` · image · aspect 3/2 · placeholder
- Alt text: A long colonnaded veranda with deep shade on polished floors.
- Save as: upload in the admin, or export `public/media/arch-2.webp` (2000px wide) and `public/media/arch-2-sm.webp` (900px wide)

```text
Wide photograph of a long colonnaded veranda with slender white columns and a deep clay-tiled roof, a band of cool shade on a polished cement floor, garden light at the far end, strong perspective. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Architecture IV: water garden

- Slot: `arch-4` · image · aspect 3/2 · placeholder
- Alt text: Still pools stepping down through the garden towards the sea.
- Save as: upload in the admin, or export `public/media/arch-4.webp` (2000px wide) and `public/media/arch-4-sm.webp` (900px wide)

```text
Wide photograph of terraced still water pools stepping down through a tropical garden towards the ocean, reflecting palms and sky, stone edges, early-evening light. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Architecture V: materials

- Slot: `arch-5` · image · aspect 3/2 · placeholder
- Alt text: Close detail of clay roof tiles, teak and lime plaster.
- Save as: upload in the admin, or export `public/media/arch-5.webp` (2000px wide) and `public/media/arch-5-sm.webp` (900px wide)

```text
Close-up composition of building materials: overlapping handmade terracotta roof tiles, weathered reclaimed teak beam, rough lime plaster and grey local granite, raking sunlight. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Dining: hero

- Slot: `dining-1` · image · aspect 16/9 · placeholder
- Alt text: An open-air restaurant pavilion by the sea at dusk.
- Save as: upload in the admin, or export `public/media/dining-1.webp` (2000px wide) and `public/media/dining-1-sm.webp` (900px wide)

```text
Wide photograph of an open-air beachfront restaurant pavilion at dusk: teak tables with linen, glowing brass lanterns, an open fire grill in the background, the sea beyond. Sri Lankan tropical modernist architecture: open-sided pavilions, lime-washed white walls, handmade terracotta clay-tiled roofs, polished cement floors, reclaimed teak, frangipani trees and courtyards. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Dining: morning catch

- Slot: `dining-2` · image · aspect 4/5 · placeholder
- Alt text: Sour fish curry in a clay pot, seen from above.
- Save as: upload in the admin, or export `public/media/dining-2.webp` (2000px wide) and `public/media/dining-2-sm.webp` (900px wide)

```text
Overhead photograph of Sri Lankan ambul thiyal (sour fish curry) in a black clay pot, with red rice, curry leaves and lime on a rough wooden table, soft natural light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Dining: spice garden

- Slot: `dining-3` · image · aspect 4/5 · placeholder
- Alt text: Fresh curry leaves, chillies and lemongrass in a basket.
- Save as: upload in the admin, or export `public/media/dining-3.webp` (2000px wide) and `public/media/dining-3-sm.webp` (900px wide)

```text
Vertical photograph of a woven basket of freshly harvested curry leaves, red chillies, pandan and lemongrass in a kitchen garden, morning light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### Closing section (still image)

- Slot: `cta-poster` · image · aspect 16/9 · placeholder
- Alt text: Waves on golden sand at sunset, seen from above.
- Save as: upload in the admin, or export `public/media/cta-poster.webp` (2000px wide) and `public/media/cta-poster-sm.webp` (900px wide)

```text
Top-down aerial photograph of gentle waves and foam on golden sand at sunset. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```

### About: the coastline

- Slot: `about-1` · image · aspect 16/9 · placeholder
- Alt text: The southern Sri Lankan coastline with palms and rocky headlands.
- Save as: upload in the admin, or export `public/media/about-1.webp` (2000px wide) and `public/media/about-1-sm.webp` (900px wide)

```text
Wide aerial photograph of the coastline near Tangalle, Sri Lanka: crescent beaches, rocky headlands, coconut palms and a fishing harbour in soft evening light. Photorealistic, natural light, subtle film grain, muted warm palette of ivory, sand, olive and deep sea green, editorial luxury travel-magazine style, no text, no logos, no watermarks.
```
