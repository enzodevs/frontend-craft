# GSAP plugins — choose capability, keep semantics

Read this after the [GSAP adoption gate](gsap.md) when a specific plugin solves the actual interaction. Import and register only capabilities the implementation uses. Adapted from GreenSock’s official `gsap-plugins` skill; see [sources](gsap-sources.md).

## Install and registration

Install GSAP from the public package and verify current package exports against the installed version:

```bash
npm install gsap
```

```js
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
```

Register plugins once before use. Do not create legacy private-registry or GreenSock-token configuration. GreenSock states that all GSAP plugins are available from the public package; confirm current product and licensing terms at [gsap.com](https://gsap.com/) rather than inferring package licensing from the MIT license of the upstream skills text.

## Capability map

| Need | Capability | Craft constraint |
|---|---|---|
| Layout reordering or shared-element continuity | Flip | Measure state, mutate DOM, then animate; preserve focus and reading order |
| Drag, constraints, snapping, momentum | Draggable + optional Inertia | Provide keyboard controls and a non-drag path |
| Word/line/character animation | SplitText | Preserve accessible reading and revert generated markup |
| SVG stroke reveal | DrawSVG | Ensure the path has a visible stroke and motion adds meaning |
| Shape-to-shape morph | MorphSVG | Simplify paths and inspect the entire interpolation, not only endpoints |
| Element moving on an SVG route | MotionPath | Keep destination and interaction semantics independent of motion |
| Scroll-to action | ScrollToPlugin | Respect focus, native anchors, reduced motion, and browser history |
| Unified pointer/wheel/touch observation | Observer | Do not override native input without a complete accessible alternative |
| Custom easing | CustomEase | Prefer built-ins unless the art direction requires a specific curve |
| Development timeline inspection | GSDevTools | Never ship development tools to production |

## Flip

Use Flip when the same content changes layout and continuity matters.

```js
const state = Flip.getState(".item");
applyNewLayout();
Flip.from(state, {
  duration: 0.45,
  ease: "power3.inOut",
  absolute: true,
});
```

Capture state before the DOM/class mutation. Keep the final DOM semantically correct; Flip explains the visual transition but must not dictate source order. Restore focus after reparenting where needed. Under reduced motion, perform the DOM change without interpolation.

## Draggable

Draggable adds pointer/touch mechanics, not complete control semantics. Before implementation define:

- keyboard operation, focus behavior, and accessible name;
- bounds, snap points, cancellation, and a reset mechanism;
- a tap/button or form-based alternative for the same outcome;
- touch-action and scrolling behavior on mobile;
- reduced-motion behavior for inertia and throws.

Destroy instances on teardown. Do not make content discoverable only by dragging.

## SplitText

Split only the unit being animated. Prefer `autoSplit` with animation created in `onSplit()` when line wrapping can change; return the animation so re-splits clean up correctly. Revert the instance when the component is removed.

The default accessible label can flatten nested semantics. If split text contains links, emphasis, pronunciation, or interactive descendants, keep an accessible unsplit equivalent and hide only the decorative fragments from assistive technology. Wait for fonts or use automatic re-splitting so line calculations are stable.

```js
const split = SplitText.create(".heading", {
  type: "words,lines",
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.words, {
      autoAlpha: 0,
      y: 12,
      stagger: 0.04,
    });
  },
});

// Teardown if not owned by a reverting context:
split.revert();
```

## SVG and text effects

- Register DrawSVG, MorphSVG, MotionPath, ScrambleText, or other plugins before first use.
- Keep original text available to assistive technology during scramble/reveal effects.
- Morph only compatible visual concepts; inspect twisting, inversion, and intermediate silhouettes.
- Bound SVG complexity and rendered size. Precomputation can improve startup but does not fix expensive per-frame painting.
- Keep meaningful labels, destinations, and values in the DOM rather than deriving them from animated geometry.

## Cleanup and review

Create plugin instances inside a scoped GSAP context where supported; otherwise retain handles and call the plugin’s documented `kill()`, `revert()`, or equivalent on teardown. Remove custom listeners too.

The plugin earns its place when it replaces fragile custom machinery, preserves semantic and keyboard behavior, has a deliberate reduced-motion path, cleans up every generated node/listener/instance, and remains responsive on the weakest target device.
