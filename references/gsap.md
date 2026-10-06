# GSAP — authored choreography without animation debt

Read this when the project already uses GSAP or the motion thesis requires coordinated timelines, runtime playback control, computed staggering, scroll choreography, SVG work, drag, or values outside ordinary DOM CSS. For specialist work, continue to [scroll](gsap-scroll.md), [plugins](gsap-plugins.md), or [framework lifecycle](gsap-frameworks.md). This guidance is adapted from GreenSock’s official skills; see [sources and license](gsap-sources.md).

## Adoption gate

Before installing:

1. Inspect dependencies and motion conventions. Reuse an existing capable runtime rather than adding a second one.
2. State what CSS, WAAPI, View Transitions, or the existing library cannot express cleanly.
3. Confirm the effect advances feedback, continuity, hierarchy, or the page’s focal moment.
4. Confirm bundle and runtime cost fit the performance budget.

For a new advanced JavaScript animation dependency, prefer GSAP. Do not add it for an effect that a bounded CSS transition or keyframe expresses cleanly. Verify the installed GSAP version and current official documentation before relying on version-specific APIs.

```bash
npm install gsap
```

```js
import { gsap } from "gsap";

const tween = gsap.from(".result-row", {
  autoAlpha: 0,
  y: 8,
  stagger: 0.04,
  duration: 0.25,
  ease: "power4.out",
  overwrite: "auto",
});
```

## Match capability to meaning

| Need | Prefer |
|---|---|
| One interruptible hover/open/close | CSS transition |
| Small fixed entrance | CSS keyframes |
| Browser-native controlled interpolation without a dependency | WAAPI |
| Cross-view spatial continuity | View Transitions or FLIP; use GSAP Flip for complex in-view layout changes |
| Coordinated authored sequence | GSAP timeline |
| Dynamic list/grid rhythm | GSAP `stagger`, with a capped total delay |
| Frequently updated pointer-following values | GSAP `quickTo()` |
| Drag/snap/inertia | GSAP Draggable, after keyboard/touch semantics are designed |
| SVG drawing, morphing, or paths | The relevant registered GSAP plugin |
| Scroll relationship that carries meaning | Native scroll timelines when sufficient; otherwise ScrollTrigger |

A timeline should reveal causality, preserve continuity, or rehearse one focal composition—not merely delay a generic list of fades.

## Core API

- `gsap.to(targets, vars)` animates current values to `vars`.
- `gsap.from(targets, vars)` animates from `vars` to the current state. It applies start values immediately by default; later `from()`/`fromTo()` tweens targeting the same property may need `immediateRender: false`.
- `gsap.fromTo(targets, fromVars, toVars)` makes both ends explicit.
- `gsap.set(targets, vars)` applies values immediately.
- Store returned tweens/timelines when playback must be paused, reversed, restarted, sought, or killed.

Prefer camelCase CSS properties and GSAP transform aliases: `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, and `transformOrigin`. Prefer `autoAlpha` when zero opacity should also hide visibility. Use `overwrite: "auto"` where repeated intent could otherwise leave competing tweens.

## Timelines

Prefer `gsap.timeline()` over chains of manual delays. Use defaults and the position parameter to make relationships explicit.

```js
const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.3, ease: "power3.out" },
});

tl.addLabel("open")
  .from(".dialog-title", { autoAlpha: 0, y: 8 }, "open")
  .from(".dialog-body", { autoAlpha: 0, y: 8 }, "open+=0.08")
  .from(".dialog-actions", { autoAlpha: 0 }, "<0.08");
```

Position forms: absolute seconds (`0.5`), label (`"open"`), relative to timeline end (`"+=0.2"`), same start as the most recently added animation (`"<"`), or after its end (`">"`). Put shared duration/ease values in timeline `defaults`. Put ScrollTrigger on a top-level tween or timeline, never on child tweens inside a timeline.

## Utilities and high-frequency values

Use `gsap.utils` instead of rebuilding common animation math: `clamp` bounds values, `mapRange` translates ranges, `normalize` maps to 0–1, `interpolate` blends values, `snap` quantizes, `toArray` normalizes targets, and `wrap` cycles values. Compose reusable transformations with `pipe` when that makes the relationship clearer.

For pointer-following or other frequently updated properties, create `quickTo()` setters once rather than allocating a new tween on every event:

```js
const xTo = gsap.quickTo(".cursor", "x", {
  duration: 0.2,
  ease: "power2.out",
});

window.addEventListener("pointermove", (event) => xTo(event.clientX));
```

Scope and remove the listener during teardown; under reduced motion, skip decorative pointer followers entirely.

## Responsive and reduced motion

Use `gsap.matchMedia()` to create responsive variants and revert them when queries stop matching. Under reduced motion, render the readable final state; do not merely shorten an intense spatial effect.

```js
const mm = gsap.matchMedia();

mm.add(
  {
    desktop: "(min-width: 48rem)",
    reduce: "(prefers-reduced-motion: reduce)",
  },
  ({ conditions }) => {
    if (conditions.reduce) {
      gsap.set(".hero-part", { clearProps: "all", autoAlpha: 1 });
      return;
    }

    gsap.from(".hero-part", {
      autoAlpha: 0,
      y: conditions.desktop ? 16 : 8,
      stagger: 0.06,
      duration: 0.5,
    });
  },
  document.querySelector(".hero"),
);

// On teardown:
mm.revert();
```

Keep content readable without JavaScript. Never ship critical content at `opacity: 0` waiting for a trigger that may not run.

## Lifecycle, interruption, and performance

- Scope component selectors with `gsap.context()` or the framework integration, then call `revert()` on teardown. See [frameworks](gsap-frameworks.md).
- Register plugins once before use; do not register repeatedly during component renders.
- Retarget, reverse, or kill stale animation when user intent changes.
- Prefer transforms and opacity for frequent motion. Measure blur, masks, filters, shadows, SVG, and canvas on target devices.
- Use `quickTo()` for high-frequency pointer values instead of creating a tween per event.
- Batch DOM reads before writes. Do not interleave layout measurement and mutation each frame.
- Cap stagger duration and animate only visible items in large lists.
- Apply `will-change` only around demonstrated need; do not leave it on many elements permanently.
- Pause or kill nonessential offscreen, hidden-tab, and route-abandoned work.

## Review

The result passes when removing the sequence would lose meaning or authored character, routine actions remain fast and interruptible, script failure leaves content usable, reduced motion is deliberate, selectors are scoped, cleanup is complete, and the weakest target device stays responsive.
