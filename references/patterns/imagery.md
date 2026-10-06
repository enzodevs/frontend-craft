# Pattern: imagery

The deep version of one dimension-5 concern: when a design needs real images, and how to not fake them. For image-led briefs this is the difference between a finished page and an obviously-unfinished one.

## Imagery is mandatory when the brief implies it

Restaurants, hotels, travel, fashion, photography, food, magazines, physical products — these are *image-led*. Zero images is a bug, not restraint. A solid-color block where a hero photo belongs is worse than a representative stock photo. "Imagery" is broad: photographs, product screenshots, data visualization, genuine generated SVG, canvas/WebGL.

## Don't fake it — ship nothing crude instead

When you can't render the real thing, a crude fake is worse than its absence. Refuse:

- **CSS scenery** standing in for a photo, **emoji as content**, fake metrics, decorative panels filling a content slot.
- **Hand-drawn / sketchy SVG** (class names like `loose-sketch` / `doodle` / `wavy`, `feTurbulence` / `feDisplacementMap` "paper grain", crude 5–30-path scenes).
- **SVG approximations of textures/materials** (leaf, dust, oxidation, fabric) — they read as clip-art.
- **Colored-`div` placeholders** where a real image belongs.

## Verify every image URL

Guessed photo IDs ship as broken placeholders — verify the URL resolves before referencing it. The common Unsplash idiom:

```
https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=1600&q=80
```

Confirm the `{id}` actually exists; **prefer fewer photos you're sure of** over more you guessed.

## Choose images like a designer

- **Search the physical object, not the category:** "handmade pasta on a scratched wooden table" beats "Italian food".
- **One decisive photo beats five mediocre ones.**
- **Image-led hero:** full-bleed photograph + overlaid nav/menu + a centered headline. Let the photograph *be* the design — don't bury it under panels.
- **Keep type off busy texture:** if text must sit over an image, lay a veil between them — a linear-gradient **scrim** (transparent → semi-opaque) keeps more of the image visible than a flat fill, and a **progressive blur** (a gradient-masked `backdrop-filter`) is the high-end version — or move the texture to an edge. Never set body copy directly on a high-contrast photo, and never light text on a light image.

## Alt text is voice

Alt text is read by people and is part of the writing (see `accessibility.md`): "Coastal fettuccine, hand-cut, served on the terrace" beats "pasta dish". Decorative images get `alt=""`.

## Checklist

- [ ] Image-led brief actually has real imagery (not color blocks or CSS scenery)
- [ ] No sketchy/hand-drawn SVG, fake textures, emoji-as-content, or fake metrics
- [ ] Every image URL verified to resolve; fewer-but-certain over many-but-guessed
- [ ] Photos chosen by physical specifics; one strong hero over several weak images
- [ ] Type never sits unveiled on busy texture
- [ ] Alt text is specific and in the brand's voice; decorative images `alt=""`
