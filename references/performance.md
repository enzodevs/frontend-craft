# Performance

The deep version of speed — both real and perceived. Users judge how fast it *feels*, and perception is often a bigger lever than raw milliseconds.

## Perceived performance

- **Acknowledge input promptly.** Use ~80ms as a local feedback aspiration, not a universal perceptual threshold. Distinguish acknowledgment from successful completion.
- **Start preemptively:** begin a transition while the data is still loading, so the response feels like it started the moment the user acted.
- **Use motion for continuity, not proof of work.** Easing can clarify transitions, but it cannot establish actual progress or guarantee a particular perception of duration.
- **Never delay completed work to manufacture value.** If fast results need credibility, explain their source or show a clear completion state. Suppressing a flashing spinner is legitimate presentation smoothing; holding results behind fake progress is not.
- **Ready does not mean visually instantaneous.** Start the response immediately, then ease the surface and briefly offset supporting content within one bounded, overlapping transition. This is presentation choreography, not simulated latency. Do not delay fetching, data insertion, focus, urgent feedback, or action availability merely to finish an entrance. See [motion choreography](motion-choreography.md).

## Core Web Vitals budgets

| Metric | Target | Levers |
|---|---|---|
| LCP (largest contentful paint) | < 2.5s | preload the hero, inline critical CSS, CDN, SSR |
| INP (interaction latency) | < 200ms | break up long tasks, defer JS, offload to web workers |
| CLS (layout shift) | < 0.1 | set image/video dimensions, use `aspect-ratio`, reserve space for embeds, never inject content above existing content |

## Assets are usually the biggest win

- **Images:** WebP/AVIF; `srcset` + `sizes`; `loading="lazy"` below the fold (**never** lazy-load the above-fold hero — it delays LCP); compress to **80–85%** quality (usually imperceptible); don't ship a 3000px image into a 300px box.
- **Fonts:** `font-display: swap` (or `optional`), subset with `unicode-range`, preload only the critical weight, limit the number of weights (variable font for 3+). See `type.md`.

## Rendering mechanics

- **Avoid layout thrashing:** batch all DOM *reads*, then all *writes*. Never alternate `offsetHeight` reads with style writes in a loop — each read forces a synchronous reflow.
- **`content-visibility: auto`** for long off-screen lists, `contain` for independent regions, and virtualize very long lists so only visible rows render.
- **IntersectionObserver instead of scroll listeners** for reveal/lazy logic — and `unobserve()` once a one-shot animation has fired.
- Prefer `transform` and `opacity` for animation. Filters, especially blur/refraction over large areas, can be expensive; do not assume compositor eligibility makes them cheap. Measure the chosen effect—see `motion.md` and [material design](material-design.md).

## Measure on real conditions

Desktop Chrome on fast wifi is not representative. Test a low-end Android (not a flagship iPhone), throttle to 3G, run keyboard-only and a screen reader, and run axe/WAVE. Then fix the **biggest** bottleneck first — don't micro-optimize while a major one stands.

## Checklist

- [ ] Micro-interaction feedback under ~80ms; transitions start preemptively
- [ ] Results appear when ready; progress is honest; no artificial credibility delays
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 (dimensions reserved, nothing injected above existing content)
- [ ] Images in WebP/AVIF, responsive, compressed ~80–85%, hero not lazy-loaded
- [ ] Fonts subset and limited; only critical weight preloaded
- [ ] DOM reads/writes batched; long lists virtualized; `content-visibility` on off-screen content
- [ ] Measured on a throttled low-end device; biggest bottleneck fixed first
