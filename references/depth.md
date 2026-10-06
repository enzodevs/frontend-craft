# Depth & hierarchy

Depth can explain layering, interactivity, and spatial continuity. Diagnose hierarchy and the human task before adding effects; tonal separation, typography, spacing, or borders may solve the problem more directly. The recipes below are options, not universal laws. For glass/refraction, use the [material contract and source-inspected case study](material-design.md).

## The core idea: layers of light

Real surfaces sit at different heights and catch light differently. Simulating that — even subtly — is what makes an interface read as physical and intentional instead of as colored rectangles.

Two rules underpin everything below:

1. **Elevation communicates layering.** Overlays may sit above the main task without being more important. Use semantic order, type, and placement for priority; don't raise everything important.
2. **Keep simulated lighting consistent.** Overhead light is a useful convention, not a requirement. Raised elements get a light highlight on their top edge and cast shadow below. Recessed elements get a dark shadow on their top inner edge (where the rim blocks the light) and light at the bottom. Keep the light direction consistent everywhere or the illusion breaks.

## The 3-to-4-shade system

You don't need many colors — you need a few lightness steps of one base color.

- Page background: darkest.
- Base container/card: one step lighter.
- Interactive / hover / foreground element: lighter still.
- (Optional 4th step for the topmost or most active element.)

Rising lightness is often useful in dark mode; light mode may need shadows, borders, or a different tonal relationship. Verify contrast rather than applying the same ordering mechanically. Use **OKLCH** so lightness is perceptually predictable: hold hue and chroma, step the first (lightness) value.

```css
:root {
  --surface-0: oklch(0.18 0.01 260); /* page — darkest */
  --surface-1: oklch(0.23 0.01 260); /* card / container */
  --surface-2: oklch(0.28 0.01 260); /* raised / hover */
  --surface-3: oklch(0.33 0.01 260); /* topmost / active */
}
```

The classic flat-UI mistake is making the page and every card the exact same color, separated only by thin strokes. The fix is the step system above: a distinct base for the page and a lighter base for components.

## Realistic shadows (stack, don't single)

A single `box-shadow` looks like a sticker. Believable depth is layered: a light highlight on top (light hitting the surface) plus two dark shadows below — one tight and hard, one wide and soft.

```css
.raised {
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 0.19),  /* top highlight: light from above */
    0 1px 2px rgba(0, 0, 0, 0.19),               /* near, hard shadow */
    0 2px 4px rgba(0, 0, 0, 0.08);               /* far, soft shadow */
}
```

Use this for cards, modals, and interactive elements. Don't apply it to everything — depth only works when it's selective. Shadows and borders serve different contexts. Borders can provide clearer boundaries in dense UI, high contrast, or forced colors; shadows do not guarantee separation on every background.

### Hover = rise

The cleanest affordance is to raise an element on hover: small resting shadow → larger, more diffuse shadow, optionally with a 1px lift. This reads especially well in light mode.

```css
.card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px);
}
```

## Recessed / "pushed-in" surfaces

The inverse of raised: areas that read as carved *into* the screen. Dark inner shadow on top, light inner shadow at the bottom.

```css
.recessed {
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.22),
    inset 0 -1px 1px rgba(255, 255, 255, 0.06);
}
```

Good for progress-bar tracks, input wells, and secondary containers. **Caution:** this is the one technique that tips into dated skeuomorphism if overused. Keep it subtle and reserve it for things that genuinely benefit from reading as a groove (tracks, wells). Don't recess everything.

## Surface highlights with gradients

On selected/active elements, a subtle top-lighter-than-bottom gradient plus a faint inner top highlight simulates overhead ambient light — more alive than a flat fill.

```css
.selected {
  background: linear-gradient(to bottom, oklch(0.32 0.02 260), oklch(0.28 0.02 260));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10);
}
```

Use on selected tabs and primary buttons.

## Surface tells to avoid

- **Competing boundaries:** a strong border plus a broad shadow can muddy edges. Adjust their relative emphasis; combining them is valid when it improves separation.
- **Radius without purpose:** follow project tokens and component geometry. 12–16px can be a starting point, not a universal maximum; large radii must not crowd content or imply a misleading affordance.
- **Gray text on a colored surface** reads muddy — use a darker shade of the surface's own hue, or an alpha of the text color, never neutral gray (see `color.md`).
- **Type on busy texture:** never set text directly on a high-contrast photo or pattern; lay a solid/gradient veil between, or move the texture to an edge (see `patterns/imagery.md`).

## Hierarchy by de-emphasis

Highlighting and de-emphasizing are the same tool. If everything on the screen is a floating card, nothing stands out. To make one thing shine, quiet the others:

- Slightly **darken** the backgrounds of secondary cards (auxiliary charts, lower tables) so they recede toward the page.
- **Remove their borders** so they merge with the background.
- Let only the vital card keep full elevation and contrast.

Pair this with **muted text**: drop the brightness/contrast of descriptive text and secondary icons instead of shrinking them. You get hierarchy without touching font size — a white/high-contrast title over a gray/muted description.

> When you lighten a surface to highlight it (e.g. an active tab), text on it can lose contrast and read too muted. Compensate by bumping the text lightness back up. Legibility is non-negotiable.

## Components that use depth well

**Selection cards when comparison needs context.** A whole labeled block can help when options need descriptions. Preserve native radio/checkbox semantics, keyboard behavior, accessible names, and visible selection/focus. Simple choices often work better with compact conventional controls. Decorative icons help only when their meaning is recognizable.

**Progress bar.** Recess the *track* (pushed-in technique) and give the *fill* a small normal drop shadow so it appears to slide over the recessed groove.

**Badges / tags (e.g. a "PRO" pill).** Skip heavy solid borders. Use a background one shade lighter or darker than what it sits on — cleaner than a gray stroke.

## Layout depth cues

- **Matched heights.** In a multi-column layout, give side-by-side containers the same height so the grid doesn't break. Expand the shorter card's content/padding to align with its neighbor.
- **Don't let everything scream.** Four equally-loud dashboard cards compete for attention and the eye bounces. Darken and de-border the support cards; let the key metric pop.

## Light mode is first-class

Many designers build dark-only because it looks good fast, but light mode is the default for most real users — design it with equal care. And shadow-based depth actually reads *better* in light mode than in dark, so depth is where light mode wins. Never treat it as a bolt-on.

Dark mode is **derived, not inverted** — it needs its own surface lightness scale, desaturated accents, and a lighter body weight, not a color swap. The full dark-mode derivation recipe is in `color.md`.

## Quick takeaways

1. Depth earns its place by clarifying relationships, not by looking expensive.
2. You need only 3–4 lightness shades of one base color: page, container, interactive.
3. Raised = light on top, shadow below. Recessed = dark inner-top, light bottom.
4. Elevation expresses layering; semantic and visual hierarchy express priority.
5. Use selection cards only when they help comparison; preserve control semantics.
6. De-emphasizing the surroundings is as important as highlighting the hero.
7. Don't underestimate light mode — `box-shadow` depth shines there.

## Tools

- **OKLCH** for predictable lightness manipulation (`oklch(L C H)`, step `L`).
- **Lucide** for clean, free, modern UI icons.
