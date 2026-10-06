# Material, perception, and liquid glass

Read when choosing translucency, refraction, skeuomorphism, or another ambitious surface effect. A material should explain a relationship or support an intentional brand moment—not stand in for hierarchy, usability, or trust.

## Material contract

Before implementing, answer:

1. **Purpose:** does this separate controls from content, preserve spatial context, communicate state, or serve a specific expressive moment?
2. **Invariant:** labels, focus, selection, reading order, and action meaning remain clear over every relevant background and without the effect.
3. **Budget:** bound area, simultaneous instances, animation, and rendering cost on target devices. A small JavaScript bundle does not imply cheap GPU work.
4. **Fallback:** begin with a readable opaque surface. Enhance only where supported and tested. Respect reduced motion, reduced transparency where supported, and forced colors; offer an explicit solid-surface option when appropriate.
5. **Evidence:** compare enhanced and plain versions for comprehension, acquisition errors, legibility, and responsiveness—not preference alone.

Apple's [Materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials) puts Liquid Glass primarily in a functional layer for controls/navigation above content, not on every content card. Its platform materials adapt to context and accessibility settings. A web effect that looks similar does not inherit those capabilities.

## Source-inspected case: samasante/liquid-glass

Inspected through `opensrc path samasante/liquid-glass`: cached `main`, package manifest version **0.1.1**. This is a repository snapshot, not verification of the published npm release or browser behavior. Recheck the exact installed version before adopting. No dependency is required by this skill.

Source: [repository](https://github.com/samasante/liquid-glass), especially `README.md`, `BROWSERS.md`, `src/Glass.tsx`, `src/GlassMaterial.tsx`, and `src/GlassSurface.tsx`.

### What is useful

- Headless composition keeps optical styling separate from application behavior.
- SVG displacement can operate on DOM content rather than a stale screenshot; geometry updates can avoid React rerenders.
- Distinct rendering paths acknowledge actual platform limits. The material wrapper frosts/tints/edge-lights; arbitrary live-backdrop refraction is documented for Chromium, while DOM-copy refraction uses SVG `filter` across engines. Media has a WebGL path.
- The source and browser notes expose costs: filter work, rasterization, Safari-specific handling, and limits on large/many lenses.

### What must not be inferred from the demo

- **“Cross-browser” is mode-dependent.** The README distinguishes wrapper backdrop refraction from wrapped/copied-content filtering; the broad browser table is not proof of identical behavior for every mode. Test the exact composition in Chromium, Firefox, and actual target Safari/iOS. Upstream Playwright claims are not our verification.
- **A material is not a control.** `GlassMaterial.tsx` renders a `div` wrapper. Text saying “Save” inside a glass surface does not become a keyboard-operable button. Compose a real button/link with a name, state, focus indication, and hit area; do not add click handlers to decorative wrappers as a shortcut.
- **Pointer transparency is not accessibility isolation.** In `Glass.tsx`, refraction-copy wrappers render `refractionTarget` with `pointerEvents: "none"`; the inspected branches do not add `inert` or `aria-hidden`. Duplicating an interactive subtree can create repeated announcements, focusable copies, duplicate IDs, and repeated component side effects. Prefer decorative, noninteractive imagery as the copy. If a copy is necessary, exclude it from both accessibility and focus navigation and avoid IDs/stateful controls—not merely pointer events.
- **Live DOM does not ensure readable text.** Keep task labels and controls crisp and outside distortion. Verify contrast against bright, dark, textured, and moving content; strengthen the backing surface when blur alone fails.
- **Motion preferences are not automatic.** A bounded source search found no reduced-motion handling in `src`; consumer integration must check preferences and bypass decorative animation. Disabling wobble does not solve transparency or contrast.
- **Zero runtime dependencies is not a performance measurement.** `GlassSurface.tsx` has a requestAnimationFrame rendering path; filters and copied trees also cost work. Check visibility pausing, cleanup, media failure, and WebGL/context-loss fallback in the chosen mode.

These are integration risks grounded in source inspection, not browser-tested defects or a comprehensive library audit.

## Acceptance matrix

| Condition | Required result |
|---|---|
| Effect disabled, unsupported, or renderer fails | Opaque/readable surface; primary task still works; no missing labels or controls |
| Keyboard and screen reader | One semantic control per action; no duplicate focus/announcements; focus ring not clipped or distorted |
| Bright/dark/moving background, zoom, long labels | Text and control boundaries remain legible; no obscured content or overlap |
| Reduced motion/transparency and forced colors | No nonessential movement; appropriate solid/system-color treatment; state remains visible |
| Touch, scroll, drag cancellation | Adequate targets; no hover-only discovery; normal page scrolling; non-drag alternative |
| Low-end hardware, several instances, offscreen/unmount | Bounded frame/rendering cost; no continuing unnecessary work or leaked resources |
| Chromium, Firefox, target Safari/iOS | Verified intended mode or intentional fallback, not inferred from syntax support |

Reject the effect if it worsens task completion, hides consent or cost, requires duplicating interactive content unsafely, or cannot meet the budget. A plain surface that preserves understanding is more crafted than a convincing lens that compromises it.
