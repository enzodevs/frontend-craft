# Critique & audit

The deep version of evaluating UI — your own as you build, or an existing interface on request. The value of a critique is in being blunt, specific, and ranked. This file gives repeatable rubrics so judgment is comparable instead of vibes.

## Critique voice

- Name the **exact element** ("the submit button", not "some elements").
- State what's wrong **and why it matters** to the user.
- Be direct, but calibrate certainty: distinguish observed failures, heuristic predictions, and questions requiring user evidence.
- "If everything is important, nothing is." Don't soften, but always include what's genuinely working too.
- Lead with **"Can people understand, complete, and recover from the task while retaining control?"** Then summary and ranked findings. Assess visual character afterward; genericness is not proof of AI authorship.

A useful reframe when something feels timid: *"What would a confident version of this look like?"*

## Severity triage (P0–P3)

Tag every finding so a critique produces a ranked backlog, not a flat list:

- **P0 — Blocking:** prevents task completion. Fix now.
- **P1 — Major:** significant confusion, or a WCAG-AA violation. Fix before release.
- **P2 — Minor:** annoyance, a workaround exists.
- **P3 — Polish.**

Tiebreaker: *would a user contact support about this?* If yes, it's at least P1.

## Usability heuristics, scored 0–4

Rate each of Nielsen's 10 heuristics 0–4 (0 = absent, 4 = genuinely excellent), sum to **/40**:

1. **Visibility of system status** — loading indicators, action confirmation, progress, current location, inline validation.
2. **Match to the real world** — familiar language and concepts, not system jargon.
3. **User control & freedom** — undo, cancel, clear exits.
4. **Consistency & standards** — same patterns and words throughout; platform conventions.
5. **Error prevention** — constrain inputs, confirm destructive actions, good defaults.
6. **Recognition over recall** — show options, don't make people remember them.
7. **Flexibility & efficiency** — shortcuts and accelerators for power users.
8. **Aesthetic & minimalist design** — no competing or irrelevant content.
9. **Error recovery** — plain-language errors that say what happened and how to fix it.
10. **Help & documentation** — discoverable when needed.

This is a local comparison rubric, not a validated scale or shipping certificate. Include evidence and uncertainty for each rating; mark untested criteria as untested rather than inventing scores. Blocking defects, accessibility failures, and coercive flows cannot be averaged away by high aesthetic scores.

## Cognitive load

Three kinds of mental effort; only one is pure waste:

- **Intrinsic** (the task's real complexity) — manage it: chunk, scaffold, progressive disclosure.
- **Extraneous** (effort the design imposes) — **eliminate ruthlessly:** confusing nav, unclear labels, clutter, inconsistent patterns, unnecessary steps.
- **Germane** (effort that builds understanding) — support it: consistent patterns, feedback, learn-by-doing.

**Working-memory diagnostic:** identify information that must be recalled across actions, screens, or interruptions. Keep it visible or recoverable; chunk by meaning familiar to the audience. Visible options are not equivalent to items held in unaided memory. Do not impose numerical caps on navigation, fields, metrics, or plans. Test whether grouping, labels, search, or disclosure improve correct selection without hiding necessary context.

Named overload patterns to catch: **Wall of Options**, **Memory Bridge** (forcing recall across steps), **Hidden Navigation**, **Jargon Barrier**, **Visual Noise Floor**, **Inconsistent Pattern**, **Multi-Task Demand**, **Context Switch**.

Neither Miller's `7±2` nor later estimates around four are universal interface limits. See [human foundations](human-foundations.md) for research boundaries, additional lenses, conflicts, and trust checks.

## Decision psychology: principle → decision → implementation

Use these as diagnostic lenses, not rigid laws or excuses to skip testing. Start from the user problem; use the principle to explain a design decision and predict where friction may occur.

| Principle | Design question | Implementation consequence |
|---|---|---|
| **Familiarity (Jakob's law)** | Does this behave like patterns users already know from comparable products? | Reuse conventional controls, recognizable icons, expected terminology, and existing system components unless novelty creates clear value. |
| **Choice cost (Hick's law)** | Are too many comparable choices delaying action? | Remove irrelevant options, group related choices, recommend a default, and progressively disclose advanced controls. Do not hide necessary comparison information. |
| **Target acquisition (Fitts's law)** | Are important actions large and close enough to reach accurately? | Make primary targets generous, separate conflicting actions, keep mobile actions in reach, and meet touch-target guidance. |
| **Chunking / working memory** | Must users hold or compare too much at once? | Group related information, use short sections and steps, keep context visible, and favor recognition over recall. |
| **Proximity (Gestalt)** | Does spacing communicate the intended relationships? | Keep labels with fields, tighten within groups, separate unrelated regions, and do not rely on cards for every grouping. |
| **Distinctiveness (Von Restorff effect)** | What single element should attract attention or be remembered? | Give the primary action/recommendation meaningful contrast; quiet competing elements. If everything stands out, nothing does. |
| **Serial position** | Are essentials buried in the middle of a sequence? | Lead with the strongest benefit or most frequent action; place key completion actions at the end; do not treat this as permission for duplicated navigation. |
| **Complexity conservation (Tesler's law)** | Is the product making the user perform complexity software could absorb? | Use smart defaults, autofill, sensible automation, and reusable context. Keep user control where automation can be wrong or high-stakes. |
| **Response threshold (Doherty threshold)** | Does the system acknowledge input quickly enough to maintain confidence? | Provide immediate feedback, optimistic updates only within the stakes boundary, and honest progress for longer work. Performance targets live in `performance.md`. |
| **Peak-end rule** | What is the most intense moment, and how does the flow finish? | Remove anxiety at failures/high-stakes steps and make onboarding wins, milestones, confirmation, checkout, and completion clear and reassuring. |

A critique should connect evidence to action: **context → observation → human burden → relevant principle and limit → concrete fix → verification → result/uncertainty**. Naming a law without locating the friction is not analysis. Use the bounded matrix in [human foundations](human-foundations.md) when a heuristic above could be mistaken for a universal rule.

## Agency and trust pass

Exercise decline, cancellation, correction, recovery, and exit—not just the preferred conversion. Check visible costs and consequences, editable defaults, neutral opt-out wording, and absence of fake urgency or hidden retention obstacles. Pair conversion/retention with comprehension, errors, unwanted commitments, and successful cancellation. A beautiful coercive flow fails this review.

## Persona stress-test

Run the primary task through five fixed archetypes — each exposes failures a single "design director" lens misses. Report specific broken elements, not generic concerns.

- **Alex** — impatient power user: shortcuts, bulk actions, skips onboarding.
- **Jordan** — confused first-timer: needs labeled icons, inline help, no jargon.
- **Sam** — accessibility: keyboard-only, visible focus, 4.5:1 contrast, SR state announcements, 200% zoom.
- **Riley** — stress tester: empty state, 1000 items, very long strings, emoji, refresh mid-flow.
- **Casey** — distracted on mobile: thumb zone, state persistence, 3G, 44×44 CSS px standalone touch targets (preferred usability target).

Pick personas by interface type (checkout → Casey/Riley/Jordan; data tool → Alex/Sam; onboarding → Jordan).

## The emotional journey

Working ≠ pleasant. Walk the flow for *feel*: apply the **peak-end rule** (people remember the most intense moment and the end), find the emotional **valleys** (waiting, errors, dead ends), and add reassurance at high-stakes moments (payment, deletion, submission).

## Scored audit (technical health)

For a systematic technical pass, score five dimensions 0–4 → **/20**: **Accessibility · Performance · Theming · Responsive · Anti-Patterns.** Bands: 18–20 Excellent · 14–17 Good · 10–13 Acceptable · 6–9 Poor · 0–5 Critical.

Report format: task success and agency verdict → summary → findings as **Location / Evidence / Impact / Principle or standard / Fix / Verification**, each tagged P0–P3. Call out systemic vs one-off ("hard-coded colors in 15+ components" is one systemic finding, not fifteen). Diagnose and document separately from fixing. Detector/lint output is defect *evidence* only — never proof of doneness.

## Fast checks worth keeping handy

- **Squint test** (see `layout.md`) — blur your eyes; can you still find #1, #2, and the groupings?
- **Slop-test battery** (see `direction.md`) — would a viewer say "AI made that"? Does removing an effect diminish anything?
