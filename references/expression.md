# Expression — taste dials

The deep version of *intensity*: making a design bolder, quieter, more delightful, or more ambitious — on purpose, with values, not "more effects". Everything here forks on one question.

## Register: brand vs product

**Is design the product, or does design serve the product?**

- **Brand register** — marketing pages, landing pages, portfolios, launches. Design *is* the product; **distinctiveness** is the bar. Permission to take risks, commit color, break the grid.
- **Product register** — apps, dashboards, tools. Design *serves* the task; **earned familiarity** is the bar ("a fluent Linear/Figma/Stripe user trusts it immediately"). Amplify in *clarity*, never in drama — theatrics undermine trust.

Every dial below means something different per register. "Bolder" in brand = extreme scale and unexpected color; "bolder" in product = stronger hierarchy and one sharper accent.

> Post-AI-flood reality: the web is saturated with competent, generic, AI-built pages. **Average is now invisible.** Default restraint without intent reads as mediocre, not refined — brand surfaces need a real point of view and a willingness to risk a little strangeness.

## The "bolder" dial

Boldness is contrast and commitment, not added decoration. Make big things bigger and small things smaller; commit to one focal point.

- Type scale jumps **3–5×**, not 1.5×.
- Weight pairing **900 / 200**, not 600 / 400.
- Let one color own ~**60%** of the surface.
- Whitespace gaps **100–200px**, not 20–40.
- Proportion splits **70/30 or 80/20** — throw out the safe 50/50.
- Texture = grain / halftone / duotone / noise / mesh / **intentional abstract mark-making** — **not** glassmorphism. Deliberate imperfection (jittered strokes, slightly-off outlines, RoughJS) can read as human-made when it is the chosen visual language and does not impersonate real imagery or material. Use it as an abstract brand texture or accent, never as a crude substitute for a photograph, product rendering, illustration, or physical surface; see `direction.md` and `patterns/imagery.md`. This is a brand-register move, not a product one.
- Easing = ease-out quart / quint / expo; **never** bounce or elastic (cheapens it).

In **product** register, "bolder" instead means: stronger hierarchy, more weight contrast, one sharper accent, more density — amplification in clarity.

**Anti-tell:** bolder ≠ a scroll-fade-rise on every section. That uniform entrance is the saturated AI default — the opposite of bold.

## The "quieter" dial

Quiet is harder than bold; subtlety needs precision. Reduce intensity without going generic or grayscale — the point of view must survive the cuts. **Restrained, not absent.** Think luxury, not laziness.

- Saturation **70–85%**, not full.
- Color as ~**10%** accent; neutrals dominate.
- Drop weights: 900 → 600, 700 → 500.
- Motion distance **10–20px** (down from 40).
- Shift the hierarchy mechanism from color/boldness to **weight + size + space**.
- Re-align any rogue elements back to the grid; reduce scale jumps for calm.

Guardrails: don't make everything one size and weight, don't strip all color, keep a few anchors. Flat ≠ quiet.

## Delight — moments, not pages

Delight everywhere reads as noise; reliability carries the rest. Place it at specific emotional beats: **completion/success, first-time actions, error recovery, milestones, empty states, loading.** (Product = discrete moments; brand = distributed: copy voice, section transitions, discovery rewards, seasonal touches.)

What separates taste from gimmick — four rules:

1. **Amplifies, never blocks** — under ~1 second, never delays core function, always skippable.
2. **Surprise and discovery** — hide it, don't announce every moment; reward exploration.
3. **Appropriate to the emotional moment** — celebrate success, empathize on errors; never playful during a critical error.
4. **Compounds over time** — **vary the response** (not the identical animation every time); it must still be pleasant after the 100th use.

Reserve confetti/celebration for *major* milestones and first-time actions — special moments should be special. The test: *"still pleasant after the 100th time?"* Match the flavor to the audience: subtle sophistication → luxury; playful personality → consumer; helpful surprises → productivity tools; sensory richness → creative tools.

A few low-cost channels: easter eggs (Konami, Cmd+K, logo hover reveals, alt-text jokes that screen-reader users get too, console messages for devs, seasonal/time-of-day themes). Sound is real but fatigues fast — respect system settings, always offer mute, keep it quiet, never on every interaction.

## Overdrive — ambition that fits the surface

"Extraordinary" is context-relative. A particle system on a portfolio is impressive; on a settings page it's embarrassing — but a settings page with instant optimistic saves is extraordinary too. The technique serves the experience. Map "wow" to the surface:

- **Marketing** → sensory: scroll-driven reveals, shader backgrounds, generative art on the cursor.
- **Functional UI** → how it *feels*: a dialog that morphs from its trigger, 100k rows at 60fps via virtual scroll, streaming validation, spring-physics drag-and-drop.
- **Perf-critical** → it never hesitates.
- **Data-heavy** → fluidity: GPU rendering, animated transitions between data states.

Capability map (portable web platform, beyond the recipes in `motion.md`): View Transitions API (shared-element morph), `@starting-style`, `animation-timeline: scroll()` (CSS-only scroll-tied motion), `@property` (animate gradients/colors), the Web Animations API, WebGL/WebGPU and Canvas/OffscreenCanvas, SVG filter chains, virtual scrolling, GPU-accelerated charts, Web Workers / WASM.

**Discipline** (non-negotiable): guard every advanced effect with `@supports`/feature detection and a CSS-only fallback that *still looks good*; target 60fps and simplify below 50; lazy-init heavy resources only near the viewport; pause or kill off-screen rendering; give reduced-motion a *beautiful static alternative*, not just "off"; never layer competing extraordinary moments. And don't ship the first version that works — ship the version that feels **inevitable** (that's the last 20% of refinement).

For the most misfire-prone work (maximalist effects), **propose 2–3 directions first** — describe look/feel and trade-offs (browser support, perf cost, complexity) and get the pick before writing code (see `direction.md`).

## Checklist

- [ ] Register named (brand vs product); every intensity choice fits it
- [ ] "Bolder" = contrast + commitment with real numbers, not added effects
- [ ] "Quieter" keeps the point of view (restrained, not flat/grayscale)
- [ ] Delight only at emotional beats; varies on repeat; pleasant after the 100th time
- [ ] Ambitious effects degrade gracefully (`@supports` + good fallback), 60fps, reduced-motion alt
- [ ] High-risk maximalist work proposed as 2–3 directions before building
