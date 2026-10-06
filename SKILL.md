---
name: frontend-craft
description: Frontend product reasoning, design, and implementation for intentional, polished web UI. Covers proportional discovery, implementation contracts and complete states, art direction, color, typography, layout, depth, polish, motion, forms, accessibility, responsive mobile-first behavior, resilience, performance, taste, and critique. Use for web UI work—landing pages, dashboards, components, forms, modals, and cards—or for product flows, acceptance criteria, visual systems, interactions, animation, responsiveness, accessibility, performance, and interface audits. Especially useful when a UI feels flat, off, cheap, templated, AI-generated, unpolished, or breaks on mobile.
---

# Frontend Craft

A frontend extends human capability: it helps people perceive, understand, remember, decide, and act in a digital space. Its first obligation is **understanding, agency, and trustworthy outcomes**. Its **point of view** gives it character; its **craft** makes behavior coherent, accessible, resilient, and pleasing. Beauty supports the relationship—it cannot substitute for comprehension or control.

## Human foundation — before the register

- **Name the human burden:** what must this person notice, remember, infer, reach, wait for, or risk? Design to reduce unnecessary effort while preserving necessary judgment.
- **Use laws as bounded lenses, not commandments.** Choose the few relevant principles; connect observed friction → predicted benefit → implementation → verification. Memory research does not set menu-size limits; fewer choices are not always better.
- **Make intention and consequence legible.** Familiar mappings, meaningful groups, visible context, prompt honest feedback, and recoverable actions make a system feel like an extension of the person rather than an obstacle.
- **Protect agency.** Declining, correcting, canceling, and leaving deserve the same care as converting. No hidden costs, coercive defaults, confirmshaming, fabricated urgency, or fake waiting.
- **Resolve conflicts explicitly:** user safety, accessibility, and informed control → task success → coherent behavior → expressive polish. A deliberate confirmation can be better than speed when stakes are irreversible.

The law-to-decision matrix, limits, trust checks, Apple lessons, and evidence live in [`human-foundations.md`](references/human-foundations.md). Read it for new flows, consequential choices, or psychology-based critique; small edits need only the relevant lens.

## First, name the register

One question reorganizes almost every decision below: **is design the product, or does design serve the product?**

- **Brand register** — landing pages, marketing, portfolios, launches. Expression carries more of the experience; the bar is **distinctiveness with comprehension**. Permission to commit color, take type risks, break the grid—not to obscure the offer, navigation, or terms.
- **Product register** — apps, dashboards, tools. Design *serves* the task; the bar is **earned familiarity** (a fluent Linear/Figma/Stripe user trusts it on sight). Amplify in *clarity*, never in drama.

"Bolder", "quieter", "richer", "more color" all mean different things per register. Decide it before you design, and let it settle the trade-offs.

## The dimensions

| Dimension | Reference(s) | The deep version covers |
|---|---|---|
| Human foundations | [`human-foundations.md`](references/human-foundations.md) | Human capability, bounded UX laws, mental models, agency, trust, evidence, and conflict resolution |
| Material & perception | [`material-design.md`](references/material-design.md) | Purposeful realism, source-inspected liquid-glass case, semantics, fallback and verification contract |
| Product reasoning | [`product-reasoning.md`](references/product-reasoning.md) | Proportional pre-UI gate, current-journey mapping, measurable outcomes, familiarity vs distinctiveness, focused agent workflows |
| Writing | [`writing.md`](references/writing.md) | Product microcopy, marketing arguments, voice, localization, evidence, and removing AI-shaped prose |
| Implementation contract | [`implementation-contract.md`](references/implementation-contract.md) | Scope, reuse, full flows, state/data/responsive behavior, constraints, accessibility, acceptance and design QA |
| Component sourcing | [`component-sourcing.md`](references/component-sourcing.md) | Existing-library discovery, official component verification and installation, native-control policy, custom-control accessibility, number fields |
| Direction (the look + avoiding slop) | [`direction.md`](references/direction.md) | Subject grounding, hero-as-thesis, named references, scene sentence, the anti-AI-slop apparatus, font selection, writing, distillation, process |
| Color | [`color.md`](references/color.md) | Strategy taxonomy, tinted neutrals, palette structure, dark-mode derivation, contrast |
| Typography | [`type.md`](references/type.md) | The 5-size scale, measure + leading, light-on-dark, pairing, web-font loading |
| Layout & spacing | [`layout.md`](references/layout.md) | 4pt scale, hierarchy contrast, the squint test, container queries, card discipline |
| Responsive & mobile-first | [`responsive.md`](references/responsive.md) | Mobile-first cascade, content breakpoints, mobile nav patterns, touch targets, safe areas |
| Depth & hierarchy | [`depth.md`](references/depth.md) | Luminosity layers, elevation, layered shadows, de-emphasis, surface tells |
| Polish | [`polish.md`](references/polish.md) | Concentric radius, optical alignment, tabular nums, hit areas, the review format |
| Motion | [`motion.md`](references/motion.md) | Easing, coordinated arrivals, interruption, runtime selection, recipes, and the extended component catalog |
| Interaction & states | [`interaction.md`](references/interaction.md) | Three-layer state model, forms, optimistic UI, undo, overlays, the dropdown clip bug |
| Data display & dashboards | [`data-display.md`](references/data-display.md) | App shell & sidebar, tables (right-align, chips, search/filter/sort, bulk actions), charts-with-context, fit-format-to-data, progressive disclosure, hidden states, density |
| Accessibility | [`accessibility.md`](references/accessibility.md) | Focus rings, roving tabindex, live regions, contrast, accessible copy |
| Resilience | [`resilience.md`](references/resilience.md) | Empty-state taxonomy, loading/error/permission states, extreme inputs, i18n, API-status mapping |
| Performance | [`performance.md`](references/performance.md) | Perceived speed, Core Web Vitals, asset/font budgets, rendering |
| Expression (taste dials) | [`expression.md`](references/expression.md) | Bolder/quieter with numbers, delight, overdrive, degrade-gracefully |
| Noticing & design QA | [`noticing.md`](references/noticing.md) | Hesitation signals, deliberate stress passes, expectation-backed findings, reusable rule libraries, and controlled comparison demos |
| Critique | [`critique.md`](references/critique.md) | Nielsen scoring, P0–P3, cognitive load, decision psychology, persona stress-test |
| Patterns | [`patterns/`](references/patterns/) | [Upload](references/patterns/upload.md), [imagery](references/patterns/imagery.md) |

The core of each dimension is below — enough to work from directly. Open a reference when you go deep; that's where the exact values and code live.

## Before you build: frame the problem, then fit the project

Scale discovery to the risk. For a small component edit, establish the affected action, existing pattern, relevant states, and acceptance check in seconds. For a new or ambiguous flow, answer the proportional product gate: **what is broken, who experiences it, what outcome should they achieve, why does it matter, how is success measured, what already exists, what constrains it, and what can go wrong?** Start with the user outcome and work backward to the interface and technology. Do not block routine work with ceremony, and do not start a consequential flow with “what screens do we need?” Full method in [`product-reasoning.md`](references/product-reasoning.md).

Find what already exists before adding anything—current journeys, design tokens, a component library, spacing/radius/color scales, and motion conventions. When available, use `cc2` to search the codebase and `xray` to read a component before editing it; otherwise use ordinary repository search and file reading. Neither tool is required, and tools that send source to external services need the user's informed authorization. When the project has a system, it wins: make things crafted *within* it, not a second system beside it. Set direction from scratch only when starting fresh or when the user wants a new look. In product register, familiar behavior and component reuse beat unnecessary originality; distinctiveness belongs in clarity and expression, not relearning basic interactions.

For any non-trivial control, follow the [`component-sourcing`](references/component-sourcing.md) order: search local components and usage → identify the active UI library and exact version → verify its official catalog/docs → add the official compatible component with the project's package manager or generator → compose it with project tokens → build custom only when the system truly lacks it. Do not install a second UI library for one control. Keep semantic HTML, but do not ship accidental browser chrome such as native number spinners or raw file-input buttons when an intentional project-library control should exist.

For meaningful feature work, establish a lightweight [`implementation contract`](references/implementation-contract.md): scope and exclusions, components to reuse, complete flows, relevant states, responsive/data/interaction behavior, constraints, accessibility, acceptance criteria, and review matrix. Keep it in the plan, task, tests, or implementation notes rather than producing paperwork by default.

If the project uses Tailwind or shadcn/ui (most do), [`tailwind-shadcn.md`](references/tailwind-shadcn.md) maps every principle here onto that stack—read it so you extend existing tokens instead of bolting on a parallel system.

---

## 1. Direction — give it a point of view

The fastest tell of AI-built UI is that it has no opinion and is **predictable from its category**. Work like a design lead whose client rejected templated proposals.

- **Ground it in the subject.** Name the subject, its audience, and the page's one job. Distinctive choices come from the subject's world, not a generic "modern UI" reflex.
- **Name a real reference, not adjectives.** "Stripe's purple-on-white restraint", not "clean". Unnamed ambition becomes beige.
- **Decide the surface with a scene sentence.** Who uses this, where, under what light, in what mood — concrete enough to force the light/dark choice.
- **The hero is a thesis.** Open with the most characteristic thing in the subject's world. A big number + label + gradient is the *template* answer.
- **Avoid the slop.** Don't reach for the three AI looks (cream+serif+terracotta / near-black+acid accent / broadsheet hairlines), the cream-band warm neutral, the hero-metric/gradient-text/eyebrow-on-every-section clichés, or the reflex fonts. After building, run the slop tests ("would someone say *AI made that*?"). Full apparatus in `direction.md`.
- **Simplify by removing obstacles, not features.** Find the 20% that does 80%; never cut needed function, clarity, or accessibility to do it.
- **Copy is design material.** First distinguish product copy from marketing copy. Product copy names actions, states, consequences, and recovery in one consistent vocabulary; marketing copy makes one evidence-backed argument for a specific audience and action. Preserve the established voice, write complete localizable messages, never invent proof, then remove inflated or AI-shaped prose without flattening the personality. Full method in [`writing.md`](references/writing.md).

## 2. Visual systems — color, type, layout

These three carry most of the "is this designed?" signal. Core rules; full systems in `color.md`, `type.md`, `layout.md`.

- **Color: pick a strategy first** — Restrained (one accent ≤10%, the product default), Committed, Full palette, or Drenched. **Tinted neutrals** (chroma 0.005–0.015) can unify a palette; neutral gray is also valid when the project or content calls for it. **Dark mode is derived, not inverted.** Never gray text on a colored surface.
- **Type: a small scale with real contrast** — ~5 sizes (0.75→4rem), one committed ratio (≥1.25 brand, 1.125–1.2 product). Body measure **45–75ch** (target 65ch). Light-on-dark needs more weight, leading, and tracking.
- **Layout: a 4pt spacing scale** (4, 8, 12, 16, 24, 32, 48, 64, 96), tight within groups and generous between sections. Give hierarchy **enough** contrast (size 3:1+) and verify with the **squint test** — blur your eyes; can you still find #1, #2, the groupings? Use cards for meaningful common regions, not every group; nest only when the relationship remains clear.

## 3. Depth & hierarchy — explain relationships

Use depth when it clarifies grouping, interactivity, or spatial continuity—not as a universal cure for weak design.

- **Build surfaces from 3–4 lightness shades of one base color** (page → container → interactive). Use OKLCH.
- **Elevation signals layering, not automatically priority;** keep simulated light consistent.
- **Choose borders, tonal separation, or shadows for the context.** Radius and elevation follow the project system, not universal taste caps. Optical realism is optional; legibility is not. Glass/refraction needs a purpose and a tested plain fallback; see [`material-design.md`](references/material-design.md).
- **De-emphasize to emphasize** — quiet the secondary surfaces so the primary one pops.
- **Light mode is first-class** (depth reads *better* there). Full recipes in `depth.md`.

## 4. Polish — the details that compound

- **Concentric radius:** outer = inner + padding.
- **Optical over geometric alignment** (icons, play triangles, left-edge text).
- **Tabular numbers** on live values; `text-wrap: balance`/`pretty`.
- **Tactile press** `scale(0.96)`; **standalone touch hit areas preferably ≥44×44 CSS px** (a usability target, not the WCAG AA minimum).

Exact values and the before/after review format in `polish.md`.

## 5. Motion — move like it means it

- **Write the motion thesis first:** one focal moment, the continuity changes that need explanation, the controls/outcomes that need feedback, and the performance budget. Decoration without purpose is animation debt.
- **Immediate acknowledgment, shaped arrival.** A ready menu/dialog should not snap in by accident: coordinate backdrop → surface → contents with overlapping motion, not serial waits. Brief presentation offsets are not fake loading; never delay data or action readiness to imply work. Read [`motion-choreography.md`](references/motion-choreography.md) for overlays, state changes, or UI that feels abrupt.
- **Choose the curve, not just the duration.** Ease-out gives fast departure and a gentle landing; use a damped spring for responsive, interruptible movement when useful. Springs need not bounce. Choreograph asymmetrically when useful: staggered release, synchronized return, subtle settle—not the same animation played backward. Inspect opening, closing, and rapid reversal at normal speed.
- **Use the smallest capable runtime:** CSS transitions for bounded state, WAAPI for dynamic playback, [Motion](references/motion-runtime.md) for springs/presence/layout, View Transitions or FLIP for continuity, [GSAP](references/gsap.md) for authored choreography. Reuse the project's capable runtime; do not stack libraries for one effect.
- **Keep behavior ahead of decoration.** No `transition: all`; preserve focus, inert/hidden state, cancellation, and cleanup. Respect reduced motion, keep ordinary content visible without JS, pause hidden/offscreen loops, and profile expensive effects. Recipes and the expanded catalog route through [`motion.md`](references/motion.md).

## 6. Interaction & states

- **No accidental browser-default chrome in project-owned controls.** Use accessible project-styled calendars, dropdowns/selects, sliders, and inputs. Keep semantic HTML and preserve browser/OS-owned file, permission, autofill, and accessibility surfaces; an intentional native mobile picker is valid when it better serves the task. Explicitly style input borders and hover/focus/disabled/invalid/autofill states; never remove accessible focus. Style page and nested scrollbars where supported, preserving native scrolling and OS/accessibility overrides. Full policy in [`component-sourcing.md`](references/component-sourcing.md).
- **Model state in three layers:** **component** (default / hover / focus / pressed / selected / disabled), **action/system** (idle / pending / success / error / timeout / offline / permission denied), and **view/data** (first use / no content / no results / no data / completion / partial and large datasets). Design only states the element or flow can actually enter. Hover ≠ focus.
- Every non-default state answers: **what happened, why, and what can the user do next?**
- **Forms:** validate on blur, errors below the field via `aria-describedby`, real `<label>`s. Preserve semantic controls but replace accidental browser-default chrome with the verified project-library component. For number fields, use the library's number/quantity/stepper control or build an accessible custom field with explicit min/max/step, locale, keyboard, mobile-input, and validation behavior—never ship the browser spinner as the final UI.
- **Optimistic UI only for low-stakes actions;** **undo beats confirmation** for reversible ones.
- **Overlays:** native `<dialog>`/`inert`, Popover API; escape `overflow` clipping for dropdowns. Full model in `interaction.md`; view/data taxonomy in `resilience.md`.
- **Data-dense UI** (tables, dashboards): the data drives the element—**right-align numbers**, chips for finite sets, a timeline/chart when a table is the wrong shape, and **progressive disclosure** (frequent actions visible, secondary/destructive ones on demand) to keep it usable. Hover-revealed actions need a focus + touch equivalent. Full set in `data-display.md`.

## 7. Robustness — responsive, accessibility, resilience, performance

- **Responsive:** design **mobile-first** — base styles small, enhance up with `min-width` (a wall of `max-width` means you designed desktop and patched it down). Mobile nav is a *real* pattern — a hamburger with working `aria-expanded`/Esc/focus-return, or a bottom tab bar — never `display:none` with no replacement. Touch targets ≥44px, no hover-only affordances, respect `env(safe-area-inset-*)`. (`responsive.md`)
- **Accessibility:** visible `:focus-visible` ring (3:1, offset outside), meaning never by color alone, body contrast ≥4.5:1, informative alt text. (`accessibility.md`)
- **Resilience:** distinguish first use, no user content, no search/filter results, no connected data, all caught up, no notifications, permission-limited empty, loading/error/offline/timeout, and partial data; test long text, emoji/RTL, 1000+ items, 4xx/5xx; use `min-width: 0` for flex overflow. (`resilience.md`)
- **Performance:** ~80ms feels instant; LCP <2.5s / INP <200ms / CLS <0.1; WebP/AVIF images, never lazy-load the hero. Acknowledge promptly; show real completion and progress, never artificial delay to imply value. (`performance.md`)

## 8. Expression — taste dials

Per register (see top). **Bolder** = contrast and commitment with real numbers (3–5× scale jumps, 900/200 weights, one color owning ~60%), not added effects. **Quieter** = restrained, not flat (70–85% saturation, drop weights, hierarchy via space) — the point of view must survive. **Delight** lives at emotional moments, not pages: keep it under a second, make it skippable, vary it so it's still pleasant the 100th time. Ambitious effects must degrade gracefully. Full dials in `expression.md`.

## 9. Critique — evaluate honestly

For self-review while building, or a review on request. Be blunt and specific; name the exact element and why it matters.

- **Externalize memory:** keep comparison context, choices, and instructions available. Neither `7±2` nor later estimates around four justify fixed caps on visible menus, fields, metrics, or pricing tiers.
- **Use decision psychology as a diagnostic, not trivia:** familiarity, choice cost, target acquisition, chunking, proximity, distinctiveness, serial position, complexity conservation, response threshold, and peak-end. Tie each principle to observed friction and a concrete fix.
- **Tag findings P0–P3;** lead with whether people can understand, complete, and recover from the task without losing agency. Assess genericness and visual character afterward; do not claim to detect authorship.
- The Nielsen 0–4/40 rubric, principle-to-implementation matrix, cognitive-load model, and 5-persona stress-test are in `critique.md`.

## 10. Patterns — specific flows

- **File upload** — drag feedback, honest progress, inline resume, independent lanes. (`patterns/upload.md`)
- **Imagery** — mandatory when the brief implies it; verify URLs; never fake it. (`patterns/imagery.md`)

---

## Working method

- **Scale the frame, then name the register.** For routine edits, confirm the affected action, existing pattern, states, and acceptance check quickly. For new/ambiguous flows, establish problem, user, outcome, success signal, reuse, constraints, and failure paths before choosing screens.
- **Source controls before inventing them:** search the repository, identify the active UI library/version, verify the official component and installation path, add it with the existing package manager/generator, then compose it with project tokens. Build custom only after that path is exhausted; never expose accidental native chrome or add a second UI system for one widget.
- **Use focused passes, not one giant generation step:** existing-system discovery → problem/flow framing → state and edge-case map → content → visual direction → implementation → accessibility/resilience/responsive audit → final critique. Activate only what the task needs; never invent research findings.
- **For meaningful work, establish the implementation contract:** scope/exclusions, reuse, full flows, three-layer states, responsive and real-data rules, interaction/keyboard behavior, accessibility, constraints, measurable acceptance, and review matrix.
- **Plan, critique, build, critique again.** Draft the token plan, check it against the brief and "is this just the default?", build, then inspect the working result. For high-risk maximalist work, propose 2–3 directions first.
- **Quality floor, always:** mobile-first, verified at 320px (no horizontal scroll; nav has a real mobile pattern; touch targets ≥44px); visible keyboard focus; reduced motion respected; every relevant state designed.
- **Run the fast checks:** human burden and outcome alignment, informed choice and exit/recovery paths, existing-pattern reuse, squint test (hierarchy), slop tests (genericness), three-layer state coverage, empty-state cause, the 320px check, and normal-speed playback of the primary interaction's arrival, exit, and interruption. Separate observed results from predicted benefits; pair business success with user error, comprehension, and trust guardrails.
- **Treat hesitation as evidence:** replay second clicks, cursor drift, reflexive undo, and re-reading; record the exact break, expected response, and correction direction. Stress relevant flows with delay, hostile content, absence, failure, keyboard-only use, continuous resizing, physical touch, paste, and repeated/reversed intent. Full method in [`noticing.md`](references/noticing.md).
- **Review builds, not just files:** use the project's browser-test tooling or an available browser-automation skill (such as `chrome-devtools-axi` or `agent-browser`) and follow its current CLI help to validate the running UI in an isolated browser. Act as the final user: complete the primary journey through visible controls, correct mistakes, go back, and exercise empty/error/recovery paths. Check keyboard/focus, mobile widths, control chrome/input borders/scrollbars, console/network failures, and rendered screenshots; fix and rerun failures. Screenshots and builds alone are not interaction verification. Show before/after when polishing. If browser tooling is unavailable, report the blocker and unverified behavior rather than claiming a pass.
