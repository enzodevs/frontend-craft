# GSAP ScrollTrigger — meaningful scroll relationships

Read this only when scroll position is part of the interaction’s meaning: a controlled narrative, spatial explanation, pinned comparison, or progress relationship. Do not turn every section into the same fade-rise. Start with [the GSAP adoption gate](gsap.md). Adapted from GreenSock’s official `gsap-scrolltrigger` skill; see [sources](gsap-sources.md).

## Setup

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

Register once before use. Create triggers inside the same scoped context as their tweens so teardown reverts both.

## Pick one relationship

- **Discrete event:** use `toggleActions` or callbacks to play/reverse at a threshold.
- **Continuous relationship:** use `scrub` so progress follows scroll.
- **Pinned composition:** pin the stable outer section and animate children, not the pinned element itself.
- **Native capability:** prefer CSS scroll timelines when they express the relationship cleanly and fallback requirements are manageable.

Do not combine `scrub` and `toggleActions` on the same trigger; scrub controls progress and wins.

```js
const ctx = gsap.context(() => {
  gsap.to(".progress-line", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".story",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });
}, document.querySelector(".story"));

// Route/component teardown
ctx.revert();
```

## Start, end, pin, and scrub

`start` and `end` pair a trigger position with a viewport position, such as `"top center"` or `"bottom 80%"`. Use relative ends such as `"+=600"` when the relationship has a deliberate scroll range. Functions are valid for layout-derived values; refresh after relevant layout changes.

- Keep pin ranges bounded. Pinning alters document flow and can become hostile on short/mobile viewports.
- Leave `pinSpacing` enabled unless the layout explicitly supplies equivalent space.
- Pin a wrapper and animate its children. Animating the pinned element invalidates measurements.
- Use `ease: "none"` for direct scrubbed progress and for horizontal `containerAnimation`; easing breaks the positional relationship.
- `markers: true` is development-only and must not ship.

## Refresh discipline

Create triggers in page order because pin spacing affects later measurements. If async creation makes that impossible, set `refreshPriority` deliberately. Call `ScrollTrigger.refresh()` after fonts, images, async content, or DOM changes alter geometry—not on every frame or arbitrary event. Resize refresh is handled by ScrollTrigger.

For third-party smooth scrollers, integrate through the documented adapter and notify ScrollTrigger when scrolling updates. Prefer native scroll or ScrollSmoother over custom proxy machinery when either fits.

## Responsive and reduced motion

Create ScrollTriggers inside `gsap.matchMedia()` so breakpoint changes revert old geometry before creating new behavior. Under reduced motion:

- Skip scrubbed translation, parallax, pinning, and forced scroll narratives.
- Set readable final states directly.
- Preserve normal document order and access to every control.
- Do not hijack wheel, touch, keyboard, or browser history behavior.

## Content visibility and accessibility

- Content is visible and usable before JavaScript. Never initialize essential sections hidden and rely on `onEnter` to expose them.
- Scroll-driven state changes that communicate information need a non-motion equivalent.
- Pinned regions must not trap keyboard focus or hide the focused element behind sticky UI.
- Scroll-linked playback must tolerate keyboard scrolling, reduced motion, zoom, short viewports, and direct anchor navigation.
- A long scrub sequence needs enough ordinary page structure that users can understand and skip it.

## Performance and cleanup

- Avoid one ScrollTrigger per trivial item. Batch related entrances or use IntersectionObserver for simple visibility work.
- Keep paint-heavy effects small and isolated; test sticky/pinned work on low-power mobile devices.
- Refresh only when layout changes and kill/revert triggers on route or component teardown.
- For dynamic lists, remove triggers attached to removed nodes before creating replacements.
- Do not call `ScrollTrigger.getAll().forEach(kill)` from a component; it can destroy unrelated page animation. Revert the component’s scoped context instead.

## Review

The scroll relationship passes when it remains understandable without animation, content never depends on a fired trigger for visibility, reduced motion restores ordinary flow, pinning works at short and mobile viewports, trigger geometry survives dynamic content, cleanup is scoped, and markers are absent from production.
