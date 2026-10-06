# Extended motion catalog and provenance

Read when the bundled recipes do not cover the requested interaction. The local transitions catalog inspected for this update contains **73 demos, 69 distinct canonical recipe sources**, and additional framework variants. The skill originally bundled 21 of those sources; it now bundles **23** after adding compose-note and elastic segmented-control examples. Counts describe this inspected snapshot, not a live upstream guarantee.

## How to use the larger catalog

The larger catalog is an optional local `transitions.dev` source checkout, **not a runtime dependency**. Locate a supplied checkout or work from the bundled recipes; do not assume the public transitions.dev website contains the local additions described here.

1. Read the checkout's `README.md` and the relevant `transitions/<category>/<recipe>.md`. Canonical recipes are Markdown, not generated `public/demos/` files.
2. Check `src/data/registry.mjs` and `src/data/demos/` for required HTML scaffolds, vendor dependencies, or demo-only wiring. Shared comparison recipes can have distinct per-demo HTML.
3. Select the smallest relevant pattern and adapt its semantics, tokens, controller lifetime, and [temporal contract](motion-choreography.md). A demo badge is not production verification.
4. Run the applicable browser check under `tests/browser/`, then test the **actual application integration**. Catalog structural tests do not exercise browser behavior, contrast, focus, or performance.
5. Preserve source attribution and applicable licence. Do not silently copy every source or introduce all comparison runtimes into the application.

## High-value additions and routing

Paths below are relative to that checkout's `transitions/` directory. Names ending in `/css.md` have colocated framework variants; inspect the appropriate variant rather than assuming interchangeability.

| Need | Source / route | Adoption boundary |
|---|---|---|
| Search, mini-player, notification, or delete control becoming a surface | `comparisons/surface-morph.md`, scaffolds in `src/data/demos/morph-comparisons.mjs` | Useful inert/focus/cleanup and velocity-aware spring patterns. CSS and Motion versions share geometry; comparison harness is not a production component. The shared JS references Motion at top level even for CSS instances: remove the Motion branch/import for a CSS-only extraction. |
| Compose button retaining its pencil while becoming an editor | [Bundled recipe 22](recipes/22-compose-note-morph.md); source `overlays-menus/compose-note-morph.md` | CSS overshoot; focus, draft preservation, dismissal, no fake saving |
| Radio selection with a sliding elastic pill | [Bundled recipe 23](recipes/23-elastic-segmented-control.md); source `controls/elastic-segmented-control.md` | Native radio semantics; no JS runtime; this is not a tab panel |
| Staggered satellite release, synchronized return, origin settling | `overlays-menus/gooey-plus-menu/css.md`; [timing case study](motion-choreography.md#case-study-gooey-plus-menu--release-gather-settle) | Expressive CSS choreography, not a Motion+ feature. Fix keyboard/hidden-state/teardown gaps before use; verify Pro-source terms. |
| Liquid-connected share actions | `overlays-menus/liquid-share-rail.md` | SVG goo filter is expressive and potentially costly; preserve focus and a plain fallback |
| Plus-button spring morph | `comparisons/plus-menu-motion.md` | Compare against bundled CSS recipe 20; do not add Motion solely for a predetermined bounce |
| Engine comparison | `comparisons/animation-engines.md` | Matched timing vs spring modes across CSS/Motion/Anime.js. Not a benchmark or recommendation to ship both libraries |
| Toast / stacked notifications / drawer | `overlays-menus/toast.md`, `banner-stacking.md`, `family-drawer.md` | Announcements, dismissal, timeout/pause, modal vs nonmodal semantics, and data ownership must be designed |
| Destructive-action feedback | `controls/delete-button.md`, `feedback/spinner-check-morph/css.md` | Real pending/success/failure and recovery; a success morph must not imply an unconfirmed delete |
| OTP / duration / step controls | `controls/otp-input.md`, `duration-picker.md`, `step-player.md` | Input behavior, paste/autofill, validation, mobile keyboard, and nonanimated equivalents outrank effects |
| Streaming/status text | `text-numbers/streaming-text.md`, `thinking-states.md`, `reasoning-stream.md` | Use actual state/data; do not fabricate internal reasoning, progress, or processing time; avoid chatty live regions |

## Remaining additions by family

This inventory includes all canonical sources beyond the original 21. It is a **discovery index**, not an instruction to install or animate each component. High-value rows above repeat some entries to explain their risks.

- **Controls:** `toggle.md`, `checkbox-check.md`, `learn-more-hover.md`, `delete-button.md`, `duration-picker.md`, `otp-input.md`, `step-player.md`, `elastic-segmented-control.md`.
- **Overlays & menus:** `toast.md`, `banner-stacking.md`, `family-drawer.md`, `gooey-nav.md`, `gooey-plus-menu/css.md`, `liquid-share-rail.md`, `compose-note-morph.md`.
- **Feedback:** `like-button.md`, `confetti-burst/css.md`, `spinner-check-morph/css.md`, `notification-bell.md`, `scroll-progress.md`, `emoji-reaction.md`.
- **Text & numbers:** `spinning-counter.md`, `streaming-text.md`, `thinking-states.md`, `reasoning-stream.md`, `pro-gradient-text/css.md`, `animated-counter.md`, `code-block.md`.
- **Loaders:** `matrix-loader.md`, `organic-shimmer/css.md`, `image-gen-placeholder/css.md`, `fluid-orb.md`, `matrix-orb.md`.
- **Layout & media:** `card-stack-hover/css.md`, `image-open-tilt/css.md`, `drag-drop-physics/css.md`, `smoky-dissolve/css.md`, `get-pro-button/css.md`, `bounce-sidebar.md`, `hook-sidebar.md`, `proximity-sidebar.md`, `folder-component.md`, `github-activity.md`, `gravity-letters.md`, `grid-reveal.md`.
- **Comparisons:** `plus-menu-motion.md`, `surface-morph.md`, `animation-engines.md`.

Folder names use the checkout's category convention: `controls`, `overlays-menus`, `feedback`, `text-numbers`, `loaders`, `layout-media`, `comparisons`.

## Provenance and maintenance

- The original 21 skill recipes were byte-identical to their corresponding local catalog files at review. Their original attribution is Jakub Antalik / [transitions.dev](https://transitions.dev). That describes the imported visual recipes, not authorship of every later catalog addition.
- Bundled recipes **05, 06, 20, and 21** now intentionally diverge with local behavior/lifecycle/accessibility adaptations. Do not overwrite them with an upstream resync without reviewing those changes.
- Bundled recipes **22 and 23** derive from the local catalog's library-free CSS playground additions. They retain source paths/namespaces and add local contrast, focus, size, or lifecycle adjustments. No external authorship or licence for those local additions is invented here.
- Rare UI ports elsewhere in the catalog are attributed to [Swami Malode / Rare UI](https://github.com/swamimalode07/rare-ui), MIT, in the checkout's `THIRD_PARTY_NOTICES.md`. None are newly bundled by this update. If adopting one, retain the applicable copyright and full MIT notice, not merely a URL.
- The **Pro** label on some catalog recipes is retained source metadata. It is neither a Motion+ entitlement nor a licence grant. Verify provenance and redistribution terms before importing paid material or publishing a derived pack.
- The catalog locally vendors Motion and, for engine comparisons only, Anime.js. Reusing a recipe does not require both engines. Preserve the selected dependency's actual installed licence when distributing its code.
- On future updates, compare canonical source paths/content, dependencies, and notices; review focused diffs. Re-run the skill's recipe browser tests and the relevant catalog checks. Record which behaviors were actually tested; a source review is not a cross-browser certification.

The main skill remains the small routing spine. This reference carries breadth; [choreography](motion-choreography.md) carries timing judgment; [runtime guidance](motion-runtime.md) carries optional stack syntax. Add a new bundled recipe when it contributes a reusable, tested behavior, not simply because the catalog grew.
