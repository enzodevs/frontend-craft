# Responsive & mobile-first

Mobile is the majority of traffic and the default index. "Responsive" is not "it doesn't break on a phone" — it's **designed mobile-first**: the small screen is the primary composition, the desktop is the enhancement. Most AI-built UI gets this backwards (it designs desktop, then patches it down), and the tell is structural, not cosmetic.

This is framework-agnostic craft (plain CSS + a little vanilla JS). For the Tailwind/shadcn expression of every rule here, see [`tailwind-shadcn.md`](tailwind-shadcn.md).

## Mobile-first means `min-width`, not `max-width`

Write the base styles for the **smallest** screen with no media query, then **add** at wider widths with `min-width`:

```css
.container { padding: 1rem; }                    /* mobile base — no query */
@media (min-width: 48rem) { .container { padding: 2rem; } }   /* tablet up */
@media (min-width: 64rem) { .container { padding: 3rem; max-width: 75rem; margin-inline: auto; } }
```

Desktop-first (`max-width`, styling the big screen then walking it back) *renders* the same, but it obscures intent, ships more code, and breeds override bugs. **The tell:** a stylesheet that's mostly `max-width` queries is desktop-first wearing a responsive costume — it was designed big and patched small. If you catch yourself writing `max-width` for layout, you designed the wrong screen first. (`max-width` is fine for the occasional genuine desktop-only override; it shouldn't be the spine.)

## Breakpoints come from content, not devices

Add a breakpoint **where the layout breaks** — a line gets too long, a grid wants another column, a row runs out of room — not at iPhone dimensions. Device widths change yearly; your content's comfortable measure doesn't. Common anchors (`40rem` / `48rem` / `64rem` / `80rem`) are fine starting points, not targets to hit.

**Test ladder** — check every screen at these widths: **320, 375, 414, 768, 1024, 1280, 1440, 1920**. 320 (no horizontal scroll, ever) and 375 (modern phone base) are non-negotiable.

## Fluid type & spacing close the gaps between breakpoints

Between breakpoints, sizes jump. `clamp()` makes them scale smoothly so you need fewer breakpoints:

```css
:root {
  --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);   /* body */
  --h1:     clamp(2rem, 1.2rem + 3.4vw, 3.5rem);     /* display */
  --gap-section: clamp(3rem, 1.5rem + 7.5vw, 6rem);
}
```

**Always combine `rem` with `vw`, never pure `vw`** — pure viewport units ignore the user's zoom/font-size setting and fail WCAG. The `rem` term keeps it accessible; the `vw` term makes it fluid. (Full type scale in [`type.md`](type.md), spacing in [`layout.md`](layout.md).)

## Mobile navigation is a different component, not a shrunk one

A row of desktop nav links does **not** become a mobile nav by getting smaller. It needs a real pattern. Picking one is the single most common thing AI UI skips — it `display:none`s the links and ships a dead end.

**Pick by destination count and app-ness:**

| Pattern | Use when | Watch out for |
|---|---|---|
| **Links just wrap / stay visible** | 2–4 short links, marketing site | Simplest — don't add a hamburger you don't need |
| **Disclosure (hamburger → drawer/sheet)** | Most sites; 5+ links or a nav that won't fit | A11y is usually broken — see below |
| **Bottom tab bar** | App-like product, ≤5 primary destinations | Must handle safe-area + content padding |

**A hamburger menu done right** (the part everyone ships broken):

```html
<button id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Menu">☰</button>
<nav id="navMenu" hidden> … links … </nav>
```
```js
const btn = navToggle, menu = navMenu;
btn.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  menu.hidden = open;
  document.body.style.overflow = open ? '' : 'hidden';   // lock scroll while open
});
document.addEventListener('keydown', e => {                 // Esc closes
  if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
    btn.setAttribute('aria-expanded', 'false'); menu.hidden = true;
    document.body.style.overflow = ''; btn.focus();          // return focus
  }
});
```

The non-negotiables, in order of how often they're missed: **`aria-expanded` reflects state**, `aria-controls` + `aria-label` on the button, **Esc closes**, **focus returns** to the toggle on close, focus is trapped inside while open, body scroll is locked, and a backdrop click closes it. A 44px toggle. If you'd rather not hand-roll the open/close + focus mechanics, build the panel on a native `<dialog>` or the Popover API — see [`interaction.md`](interaction.md).

**Bottom tab bar** essentials: `position: fixed; bottom: 0`, ≤5 items, each a column (icon over label), and it *must* clear the home indicator and not cover content:

```css
.tabbar { position: fixed; inset-inline: 0; bottom: 0; padding-bottom: max(0.5rem, env(safe-area-inset-bottom)); }
main { padding-bottom: 5rem; }   /* so the bar never overlaps the last row */
```

## Touch ergonomics

The cursor is a fingertip ~44px wide with no hover and no precision.

- **Hit targets: 44×44px** recommended (WCAG 2.2 AA floor is 24px; use **48px** for primary/critical actions). Pad small controls up to size; don't rely on the icon's visual size.
- **Extend the target past the visual** for small links/icons — a pseudo-element or negative margin grows the tap area without changing the look:
  ```css
  .icon-btn { position: relative; }
  .icon-btn::after { content: ""; position: absolute; inset: -10px; }  /* invisible tap halo */
  ```
- **≥8px between targets** (use `gap`, not luck) so fat fingers don't mis-tap.
- **No hover-only affordances.** Touch has no hover state — anything revealed only on `:hover` (menus, actions, tooltips) is invisible on a phone. Pair every `:hover` with `:focus-visible`, make it always-visible, or trigger on tap.
- **Thumb zone:** on a phone the top corners are a stretch. Keep primary actions reachable in the lower/center band; don't bury the main CTA in a top corner.

## Safe areas (notches & home indicators)

On modern phones the screen extends under the notch and home bar. Opt in, then pad fixed UI:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
```css
.app-header { padding-top: env(safe-area-inset-top); }
.tabbar     { padding-bottom: max(0.5rem, env(safe-area-inset-bottom)); }
```

`max(normal, env(...))` keeps your normal padding on devices without insets and grows it where needed.

## Don't shift the layout (CLS)

Mobile networks make layout shift worse — content pops in and everything jumps.

- **Reserve media space** with `aspect-ratio` (or width+height attrs) so images/video/embeds don't shove content when they load. (See [`performance.md`](performance.md).)
- **`min-width: 0`** on flex children that contain text, or long strings force horizontal scroll. (See [`resilience.md`](resilience.md).)
- **Never a horizontal scrollbar** at any width below 1920 unless it's a deliberate scroll container.

## Dense content on small screens

- **Tables need a mobile alternative** — they don't fit. Stack each row into a labeled card, or make it a horizontal-scroll container with a sticky first column, or hide non-essential columns. A 7-column table squeezed to 375px is a fail.
- **Modals/sheets fit the viewport** — full-screen or bottom-sheet on mobile, not a desktop dialog cut off at the edges.
- **Forms:** one column, real labels, `inputmode`/`type` set so the right keyboard appears (`type="email"`, `inputmode="numeric"`). (See [`interaction.md`](interaction.md).)
- **iOS form zoom:** keep form controls at a computed font size of at least `16px`; do not disable pinch zoom with `maximum-scale=1`.
- **Inline video:** use `playsinline` when autoplaying muted video should remain in-page on iPhone; autoplay is enhancement and must tolerate blocking.
- **Verify on hardware:** emulation catches layout breakpoints, not thumb accuracy, virtual-keyboard resizing, safe-area behavior, media takeover, or motion while walking. Test critical mobile flows on a physical target device.

## Container queries: size components to their slot

Page-level breakpoints answer "how wide is the screen?" Container queries answer "how wide is *this component's box*?" — so the same card is compact in a sidebar and expanded in main content with no page breakpoints. Use **container queries for reusable components, viewport queries for page layout.** Full recipe in [`layout.md`](layout.md).

## Checklist

- [ ] Base styles are mobile; widening uses `min-width` (not a wall of `max-width`)
- [ ] No horizontal scroll at 320px; checked across the test ladder
- [ ] Nav has a real mobile pattern (not `display:none` with no replacement)
- [ ] Hamburger: `aria-expanded`, Esc closes, focus returns, scroll locked, 44px toggle
- [ ] Touch targets ≥44px, ≥8px apart; no hover-only affordances
- [ ] Fluid type/spacing use `rem + vw` (zoom-safe), not pure `vw`
- [ ] Fixed bottom UI respects `env(safe-area-inset-bottom)` + content has clearance
- [ ] Media has reserved `aspect-ratio` (no CLS); flex text has `min-width: 0`
- [ ] Tables/modals have a real small-screen treatment
