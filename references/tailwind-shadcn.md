# Tailwind + shadcn/ui — the implementation bridge

**Load this only when the project uses Tailwind and/or shadcn/ui** — detect `tailwind.config.*` or `@import "tailwindcss"`, a `components.json`, or a copied-in `components/ui/` directory.

Every *design* decision lives in the other references (this is the same craft, not different craft). This file is the **syntax bridge**: how the agnostic principles map onto Tailwind v4 utilities and shadcn conventions, and the stack-specific gotchas. Decide *what* in the dimension files; look up *how* here.

## Principle → Tailwind mapping

| Principle (and its home) | Tailwind expression |
|---|---|
| Mobile-first cascade ([`responsive.md`](responsive.md)) | Unprefixed = mobile base, then `sm:` `md:` `lg:` `xl:` `2xl:` |
| 4pt spacing scale ([`layout.md`](layout.md)) | The default spacing scale already is 4pt (`p-1`=4px … `p-6`=24px) |
| Fluid type/spacing ([`type.md`](type.md)) | `clamp()` tokens in `@theme` (below) |
| Touch targets 44px ([`responsive.md`](responsive.md)) | `min-h-11 min-w-11`; `min-h-12` for primary; `gap-3` between |
| Container queries ([`layout.md`](layout.md)) | `@container` + `@sm:`/`@md:` variants |
| Safe areas ([`responsive.md`](responsive.md)) | `env(safe-area-inset-*)` via `@utility` |
| Tinted neutrals, OKLCH ramps ([`color.md`](color.md)) | Define as `@theme` color tokens / shadcn CSS vars |
| Readable measure 65ch ([`type.md`](type.md)) | `max-w-prose` (≈65ch) + `leading-relaxed` |

## Mobile-first utility ordering

Unprefixed utilities apply at **every** width; a breakpoint prefix applies at that width **and up**. So order them small→large and the cascade *is* mobile-first for free:

```html
<div class="text-sm md:text-base lg:text-lg p-4 md:p-6 lg:p-8">…</div>   <!-- correct -->
```

Writing `lg:` first then walking down doesn't *technically* make it desktop-first (the breakpoints still mean "and up"), but it obscures intent and invites bugs — keep them ascending. Default breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536px. Show/hide across breakpoints with `hidden md:block` (mobile-hidden) or `md:hidden` (desktop-hidden) — that's how the hamburger toggle and desktop nav swap.

**Content-driven breakpoints** — override the defaults from your content, not device names:

```css
@theme {
  --breakpoint-md: 48rem;   /* retune to where YOUR layout breaks */
  --breakpoint-3xl: 120rem; /* add ones you actually need */
}
```

## Fluid type & spacing tokens

Define `clamp()` scales once in `@theme`, then use them like any utility (`text-fluid-2xl`, `py-fluid-section`). Always `rem + vw`, never pure `vw` (zoom-safe):

```css
@theme {
  --text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-fluid-4xl:  clamp(2.25rem, 1rem + 6.25vw, 3.5rem);
  --spacing-fluid-section: clamp(4rem, 2rem + 10vw, 8rem);
}
```

## Container queries

```css
@import "tailwindcss";
@plugin "@tailwindcss/container-queries";
```
```html
<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3">…</div>
</div>
```

Mark the wrapper `@container` (optionally named, `@container/sidebar`), then size children with `@sm:`/`@md:` (these read the *container*, not the viewport). Use for reusable components; keep `md:` etc. for page layout.

## Touch, safe areas, hover

```css
@utility safe-area-pb { padding-bottom: env(safe-area-inset-bottom); }
```
- Touch targets: `min-h-11 min-w-11` (44px), `gap-3` (12px) minimum between.
- **`hover:` is already gated behind `@media (hover: hover)` in Tailwind v4**, so hover styles won't get "stuck" on touch — but that means hover-only affordances simply *don't exist* on touch. Always pair: `hover:bg-muted focus-visible:bg-muted`.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` (see [`accessibility.md`](accessibility.md)).

## Dark mode

Tailwind v4's `dark:` variant defaults to `prefers-color-scheme`. For a manual class toggle (what shadcn uses):

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Then `dark:bg-background` responds to a `.dark` class on `<html>`. **Dark mode is derived, not inverted** — redefine the token values, not every utility ([`color.md`](color.md)).

## shadcn/ui conventions

shadcn isn't an npm component dependency — the components are **copied into your repo** (`components/ui/`), so you own them. That changes how you extend craft into the project:

- **Inventory before adding.** Read `components.json`, search `components/ui/` and imports, and inspect the lockfile/package manager. A primitive may already exist or be wrapped under an app-specific name.
- **Verify before installing.** Check the current official shadcn registry/docs for the exact component and its dependencies; do not assume a component exists from memory. Add it with the project's existing shadcn command and package manager, then inspect the generated files and lockfile. If shadcn lacks the needed control (for example a complete number field in the active registry), check the project's already-installed primitive layer before building a custom accessible control. Never add another UI suite for one widget. Full acquisition policy in [`component-sourcing.md`](component-sourcing.md).
- **Theme through the CSS variables, never hardcode.** shadcn themes live as tokens in `:root` and `.dark` — `--background --foreground --primary --muted --border --input --ring --radius` — consumed via semantic utilities (`bg-background`, `text-muted-foreground`, `border-border`, `rounded-[--radius]`). To restyle or extend, **adjust the tokens**; a stray `bg-[#1a1a1a]` breaks the system and is the exact "second system beside the first" smell the brownfield rule warns against (it's how you respect "the project's system wins").
- **`--radius` is the radius system.** Reuse it (and its derived `rounded-lg/md/sm`) for concentric radius ([`polish.md`](polish.md)); don't introduce ad-hoc corner values.
- **Compose, don't fork.** For an app-specific variant, wrap the primitive or add a variant to its `cva` config — don't rewrite the primitive's internals. Editing the copied files is allowed (they're yours) but makes future `shadcn` upgrades manual, so prefer wrapping for app concerns.
- **`cn()`** (clsx + tailwind-merge) for conditional classes that also resolve Tailwind conflicts safely — use it instead of string concatenation so later utilities win predictably.
- **Read `components.json`** first — it records the style, base color, path aliases, and whether CSS-variable theming is on. Match those conventions before adding anything.
- shadcn components ship with focus-visible rings, `aria-*`, and keyboard handling via Radix — **don't strip them** when restyling; that's the invisible-layer win you'd otherwise have to rebuild.

---

Keep this file thin. If you're reaching for a *design* answer (what color, how much depth, which motion), it's in the dimension references — this bridge only tells you how to spell the answer in this stack.
