# Noticing — find interface friction before users report it

Most interface defects are easy to repair once they are precisely named. The difficult skill is noticing the half-second of uncertainty, the extra click, or the default behavior that quietly contradicts the rest of the product. Use this method during design QA, implementation review, and critique.

This is a synthesis of the freely accessible [“Learning to notice”](https://invisibledetails.com/preview/learning-to-notice) and [“Small details that add up”](https://invisibledetails.com/preview/small-details-that-add-up) lessons from [Invisible Details](https://invisibledetails.com/), reconciled with this skill's existing accessibility, resilience, interaction, and polish rules.

## Treat hesitation as telemetry

Walk through one real task slowly. A momentary pause is evidence, not personal clumsiness. Watch for:

- **The second click:** the first action produced no immediate acknowledgment, its target missed, or pending state began too late.
- **Cursor drift:** the pointer searches without landing because the hit area, affordance, grouping, or label is unclear.
- **Reflexive undo:** the action may have succeeded, but weak feedback left the result uncertain.
- **Re-reading:** the first pass did not resolve the label, instruction, or state; improve the words or hierarchy.
- **“Something is off”:** inspect optical alignment, spacing rhythm, nested geometry, and browser defaults before adding decoration.

Do not stop at “this sidebar feels wrong.” Reproduce the exact action and locate the first violated expectation.

## Recreate friction deliberately

The happy path hides defects. Stress the interface in focused passes:

1. **Delay:** throttle to a slow network or add controlled API latency. Look for dead clicks, missing pending states, double-submit, stale controls, and late transitions.
2. **Content:** replace placeholders with long unbroken names, locale-expanded copy, large values, emoji, RTL, and real identifiers. Check wrap, truncation, alignment, and recovery of the full value.
3. **Absence:** remove all content, search results, notifications, permissions, and connections one cause at a time. A deliberate empty state must not resemble a crash.
4. **Failure:** force offline, timeout, 4xx/5xx, socket loss, and partial data. Preserve typed form data and expose recovery.
5. **Keyboard:** put the pointer aside. Open, select, cancel, close, reorder, and escape every flow; verify focus order, visibility, return, and traps.
6. **Continuous width:** drag the viewport through the whole range rather than checking named breakpoints only. Note the first width at which content or behavior fails.
7. **Physical touch:** verify target size, target spacing, fixed UI, safe areas, keyboard behavior, zoom, media playback, and gestures on a real device.
8. **Paste:** paste common alternate formats, whitespace, long URLs, and locale-formatted values. Parse and normalize what can be interpreted safely instead of punishing valid intent.
9. **Repetition:** click rapidly, reverse intent mid-transition, navigate away, return, resize, and repeat. Look for stale animation, races, duplicate work, and leaked state.

Run only the passes relevant to the change, but use realistic data rather than toy fixtures.

## Capture an observation that can be implemented

Record three short fields while the friction is still visible:

| Field | Meaning | Example |
|---|---|---|
| **Break** | The exact action, location, and observed response | “Pasted an RGB value into the color field; it rejected the input.” |
| **Expectation** | What a reasonable user expected instead | “Any common color notation should be accepted.” |
| **Direction** | One implementation-neutral correction | “Parse supported formats and normalize to the stored format.” |

The direction is not a premature specification. Preserve the expectation so another engineer can choose a better implementation later. Add environment and reproduction details when they materially affect the result.

## Build a rule library, not a screenshot pile

A screenshot captures appearance; a reusable pattern captures behavior and the condition that makes it correct. Store rules such as:

- accept common input formats and normalize internally;
- align repeated navigation icons and labels to shared columns;
- keep the full checkbox row—including the visual gap—clickable;
- reveal horizontal overflow without requiring a visible scrollbar;
- use tabular figures where changing digits must not move surrounding content.

Avoid entries such as “clean sidebar” or “nice gradient.” Keep the library small, cite the source, retain screenshots only as supporting evidence, and prune patterns when platform behavior changes.

## Teach a detail with a controlled comparison

When a rule is hard to describe, use a focused bad/good comparison rather than a decorative screenshot.

- **Hold everything constant except one variable.** Same copy, dimensions, and context; change only the behavior under review.
- **Show both versions together on wide screens.** Mark the weaker case and corrected case directly; do not make users remember two distant images.
- **On narrow screens, use one card per viewport with swipe plus explicit Previous/Next controls.** Do not compress the comparison until neither example is legible.
- **Name the changed rule.** Labels such as “geometric / optical” or “end / middle truncation” teach more than “before / after.”
- **Add optional guides when the difference is subtle.** Measurement lines, hit-area overlays, baselines, or a switch can reveal the mechanism without permanently cluttering the example.
- **Keep explanatory demos non-interactive when interaction is not the lesson.** Use `aria-hidden` and `inert` for purely visual duplicates so they do not pollute focus order or accessibility trees. Interactive teaching controls need real names, keyboard behavior, state, focus, and reduced-motion handling.
- **Design the comparison responsively.** A strong pattern is side-by-side at the content breakpoint and an edge-to-edge, touch-pan carousel below it, with disabled Previous/Next state at the ends.

The Invisible Details examples implement this well: compact DOM/SVG reconstructions isolate one variable, handwritten annotations point to the mechanism, subtle guide switches expose optical measurements, and desktop pairs become swipeable mobile cards instead of shrinking into illegibility. Reuse the method, not the site's visual identity or source code.

## Review output

Report each finding as:

> **Priority — location — break** → expected behavior → direction → verification

Prefer a short list of reproducible, expectation-backed findings over a long inventory of subjective discomfort. The review is complete when the action can be reproduced, the violated expectation is clear, and the correction has an observable acceptance check.
