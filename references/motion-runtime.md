# Motion runtime: free capabilities, deliberate easing

Read when CSS is awkward for the required springs, gesture response, presence, or layout continuity, or when the project already uses Motion. Keep [choreography](motion-choreography.md) framework-independent; this is the optional implementation bridge.

## Choose by behavior, not brand

| Need | Start here |
|---|---|
| Small popover, dimming backdrop, a few timed arrivals | CSS transitions; no library required |
| A predictable elastic pill or compose surface | CSS overshoot is often sufficient; see recipes 22/23 |
| Repeated target changes, drag/release, velocity-aware settling | Motion physics spring or the existing capable runtime |
| React enter/exit retention and layout continuity | Motion presence/layout APIs, composed with the existing accessible UI primitive |
| DOM sequences without React | Motion's hybrid `animate`, WAAPI, or the existing timeline runtime |
| Complex authored SVG/scroll choreography already using GSAP | Keep GSAP; don't add Motion to duplicate it |

Motion does not provide a dialog focus trap, menu keyboard semantics, or application loading state just because a surface animates. Respect the installed component library's presence/mount/unmount API. Do not nest two competing exit managers or replace an accessible primitive with a `motion.div`.

## Easing vs springs

- **Tween:** duration plus curve. An ease-out arrives quickly and settles gently. Good for matching a short, authored score across layers.
- **Duration-based spring:** `duration`/`bounce` (or documented visual-duration controls). Convenient for designing approximate timing; do not claim physics-based velocity continuity.
- **Physics-based spring:** `stiffness`, `damping`, `mass`, and relevant velocity. Suits responsive redirection; a spring can be calm with no visible bounce. Settling time is not a fixed duration.
- Do not mix parameter families casually: physics parameters override duration/bounce in the documented API. Match the installed version, not a remembered code sample.

Illustrative React **visual targets**, not a complete dialog:

```tsx
import { useReducedMotion } from "motion/react";

function usePanelMotion(open: boolean) {
  const reduce = useReducedMotion();
  return {
    animate: {
      opacity: open ? 1 : 0,
      y: reduce || open ? 0 : 8,
      scale: reduce || open ? 1 : 0.98,
    },
    transition: reduce
      ? { duration: 0 }
      : {
          default: { type: "spring" as const, stiffness: 420, damping: 38, mass: 1 },
          opacity: { type: "tween" as const, duration: open ? 0.16 : 0.12 },
        },
  };
}
```

These numbers are tuning seeds, not universal presets. Compose the resulting motion props with a supported primitive integration. If CSS and Motion both write `transform` on one element, they can fight; use a separate inner visual wrapper or one owner per property. Keep an explicit, shorter exit envelope if the spring's tail retains a modal too long.

For an existing React project:

- `AnimatePresence` retains exiting nodes; it does not by itself make them inert or preserve modal semantics. Keep it mounted around the conditional children, use stable keys, and coordinate with the primitive's lifecycle.
- Default `mode="sync"` permits overlapping arrivals/exits. `mode="wait"` intentionally serializes one child at a time; don't choose it by habit for an overlay whose backdrop and contents should overlap.
- `initial={false}` skips entrances for children already present on first render, not for a dialog mounted after activation.
- Child staggering is optional. Current docs show `delayChildren: stagger(...)`; verify the installed version and cap total delay. A focused child must bypass its delay and hidden entrance state.
- `useReducedMotion` handles preference changes; explicitly zero decorative delays and settle custom JS work too. Do not assume every custom filter/timer is covered by a global setting.

For vanilla DOM:

- The hybrid `animate` API supports sequences and `at` offsets for overlap. This does not require Motion+.
- Scope selectors/elements to the mounted instance. Own the returned controls and stop/complete them appropriately on retarget, reduced-motion changes, and teardown.
- `stop()` and `cancel()` are not interchangeable: current docs say stopping commits current WAAPI-backed styles, while canceling reverts. Verify the installed API before choosing the cleanup behavior.
- Do not recreate a spring from zero on every click. Preserve the current rendered state and, where needed, a persistent Motion Value/velocity. Inspect the local catalog's surface-morph comparison for this design; it is a demo controller, not a turnkey production API.

## Motion+ is optional, not an easing prerequisite

The described backdrop → surface → options transition can be implemented with CSS or free Motion. Tween curves, springs, stagger, animation sequences, and core React presence/layout capabilities do not require a paid purchase.

Motion+ currently markets premium components, examples/tutorials, Motion UI, and an AI Kit with transition-editing tooling. Those can save authoring/research time; buying them does not automatically give agents a motion thesis, correct semantics, or verification discipline. Evaluate it against a concrete need (for example a premium component or visual tuning workflow), not because ordinary ease-out or springs are paywalled.

Use only legitimately available packages/examples. Inspect the applicable licence, seat/use terms, and installed version before incorporating paid material. Never place account credentials, package-registry tokens, or private download URLs in this skill. The local transitions catalog's **Pro** badge is not proof of Motion+ provenance or permission to redistribute code. Keep its original attribution distinct.

## Primary references

Checked against the public documentation during this update; consult it again for the project's installed release and current purchase terms:

- [React transitions](https://motion.dev/docs/react-transitions): value-specific transitions, easing, spring parameter families, stagger.
- [Vanilla animate](https://motion.dev/docs/animate): sequences, `at`, controls, stopping/canceling.
- [AnimatePresence](https://motion.dev/docs/react-animate-presence): lifecycle, sync vs wait, exit retention.
- [useReducedMotion](https://motion.dev/docs/react-use-reduced-motion): reactive preference handling.
- [Motion+](https://motion.dev/plus): current offering and licensing overview. No price or purchase recommendation is encoded here.
