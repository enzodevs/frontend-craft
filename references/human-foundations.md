# Human foundations: design as an extension of capability

An interface extends what a person can perceive, remember, decide, and do. It succeeds when intentions become understandable actions and actions produce understandable consequences—not when the interface looks expensive or keeps people engaged longest.

Use this reference when framing a flow, applying a UX law, resolving a design trade-off, or auditing trust. These principles guide both brand and product work; neither register permits manipulation or inaccessible behavior.

## Start with the person, not a law

For the affected task, name:

- **Intent:** what the person wants to accomplish, including declining or leaving.
- **Context:** familiarity, language, device/input, interruptions, sensory or motor constraints, and stakes. Do not invent a universal “average user” or assume everyone knows Apple products.
- **Burden:** what they must notice, remember, infer, reach, wait for, or risk.
- **Capability to extend:** externalize memory, clarify comparison, make action reachable, explain causality, preserve progress, or enable recovery.
- **Agency:** what stays visible, editable, reversible, and under their control.
- **Evidence:** what was observed versus inferred; how the proposed change can be checked.

For small edits, one sentence is enough: “A distracted returning user must resume payment without re-entering details; preserve the draft and show the total and current step.” For consequential flows, map these across entry, decision, action, waiting, completion, interruption, and exit.

## Laws are lenses with boundaries

Distinguish empirical models (Fitts, Hick–Hyman), experimental findings (memory and recall), perceptual principles (Gestalt), design heuristics (Jakob, Tesler), and normative requirements (accessibility, informed consent). They do not all have the same evidential status. A law suggests a testable prediction; it does not establish that a particular interface works.

| Lens and boundary | Human question → design response | Check / common misuse |
|---|---|---|
| **Hick–Hyman: choice reaction time.** A model of responses to stimuli, not a universal model of shopping or understanding. | Are comparable choices difficult to distinguish? Clarify labels and differences, group meaningfully, remove irrelevant choices. | Check correct selection, backtracking, and time. Do not hide useful options merely to reduce the count; search and comparison can make large sets usable. |
| **Fitts: aimed movement.** Distance and target width affect acquisition; device, direction, and errors matter. | Can people reach and activate the intended control reliably? Enlarge hit areas, separate conflicting targets, avoid precision-only gestures. | Test touch and pointer accuracy; provide keyboard and non-drag alternatives. A visually large button with a tiny hit area fails. No universal thumb zone fits every grip. |
| **Working memory and chunking.** Miller's 7±2 and later estimates around four concern particular memory tasks and conditions. | What must be remembered across steps? Keep totals, choices, instructions, and comparison context available; group by meaning familiar to this audience. | Interrupt and resume the task. Neither four nor seven is a cap on visible navigation items, fields, metrics, or plans. Recognition is not unaided recall. |
| **Jakob: learned expectations.** A usability heuristic dependent on audience and platform. | Does this behave as users expect? Preserve conventional control behavior, vocabulary, and stable locations. | Check first-use comprehension with the relevant audience. Familiarity does not justify copying a competitor's dark patterns. |
| **Gestalt: proximity, similarity, common region, continuity, figure–ground.** Perceptual cues, not guarantees of comprehension. | Which things belong together, are actionable, or sit above others? Align labels and fields, separate groups, use consistent affordances, preserve a readable foreground. | Compare perceived groups with semantic/reading order. Similar appearance must not imply the same action when consequences differ. Color alone cannot carry meaning. |
| **Mental models, signifiers, mapping, feedback.** Design concepts for bridging intention and system behavior. | Can people predict the action and explain its result? Label actions by outcome; map controls to what they affect; show pending, committed, and failed states distinctly. | Ask what will happen before activation and what happened afterward. A texture or icon is not enough if its meaning is unknown. |
| **Tesler: complexity allocation.** A design heuristic, not a literal conservation equation. | Can software absorb repetition without taking away judgment? Reuse entered data, offer inspectable defaults, automate low-risk mechanics. | Expose assumptions and overrides; verify wrong-default and recovery paths. Some complexity is accidental and should be eliminated, not relocated. |
| **Attention and distinctiveness.** Isolation can attract attention; it does not make an action beneficial. | What deserves attention now? Use hierarchy for the task and reserve urgent treatment for real urgency. | Verify notices and alternative choices remain discoverable. Do not use salience to conceal cost, consent, or cancellation. |
| **Feedback and temporal continuity.** Fast acknowledgment and stable transitions help users connect action to outcome. | Did my action register, and is work still happening? Acknowledge promptly, show honest progress, preserve context during updates. | Test latency, duplicate activation, failure, and interruption. No invented progress or delay to make work appear more valuable; no universal timing threshold proves usability. |
| **Peak–end and aesthetic–usability effects.** Findings about remembered experience and perceived usability, not proof of successful performance. | Where are uncertainty, loss, relief, and completion? Reduce anxiety, make completion legible, offer restrained delight. | Check the entire journey and repeated use. A pleasing ending cannot excuse a harmful middle; beauty can mask defects in subjective ratings. |

### Resolve conflicts by outcome and risk

Do not maximize one law. Progressive disclosure may reduce clutter but increase recall and navigation cost. A larger control may improve acquisition but crowd content. Confirmation adds time but can protect against irreversible harm; reversible low-stakes actions usually benefit from undo. Automation saves effort but can obscure a consequential assumption.

Choose the smallest intervention that improves the actual task while preserving comprehension, access, and control. State the trade-off and check both sides. Existing project conventions and accessibility requirements outrank unsupported taste rules.

## Agency and trust are acceptance criteria

Review the path that does **not** benefit the business as carefully as the preferred path:

- Accept and decline must be understandable and accessible; consent is not preselected or bundled into unrelated actions.
- Show price, billing interval, renewal, material limitations, and consequences before commitment. Recommendations need an honest basis, not fabricated popularity or scarcity.
- Cancellation, withdrawal, deletion, and export must be discoverable. Document legitimate safety/legal friction; remove retention obstacles disguised as safety.
- Use neutral opt-out language. No confirmshaming, disguised ads, hidden charges, coercive urgency, or intentionally confusing plan comparisons.
- Preserve drafts and user decisions across interruption. Explain automation and let people correct consequential defaults.
- Avoid exploiting distress, compulsive behavior, or vulnerability. Optimize for the user's chosen outcome, including finishing and leaving.

Do not force every abuse into a named law: decoy effects are not Hick's law, confirmshaming is emotional coercion, and obstructive cancellation is an agency failure whether familiar or not. Unequal visual emphasis is not automatically deceptive; ask whether alternatives and consequences remain understandable and freely actionable.

Pair business metrics with user guardrails: conversion **and** comprehension/refund rates; completion time **and** error/recovery rates; retention **and** easy cancellation. Do not invent measurements or collect sensitive behavioral data without appropriate consent and minimization.

## Learning from Apple without mythmaking

The useful lesson is coherent behavior: clear mapping, immediate feedback, continuity of objects and tasks, thoughtful defaults, and integrated recovery. These are design hypotheses to apply and test, not proof that one company's aesthetic expresses universal human nature.

A physical metaphor can transfer knowledge when people know the referent and its behavior matches the digital action. Decorative leather does not teach navigation; an unfamiliar metaphor can add learning cost. Apple's product-grid story illustrates portfolio simplification, not a controlled demonstration of Hick's law. A single Home button does not prove that fewer controls always reduce complexity. Avoid attributing product success or individual design decisions to a law without evidence.

Material realism is useful when it explains **what can be acted on, what is above what, or what just changed**. Otherwise it is optional expression. See [the liquid-glass case study](material-design.md) for the difference between a convincing optical effect and a usable interaction.

## Evidence-backed critique loop

Record **context → observation → burden → relevant principle and its limit → proposed change → verification → result/uncertainty**. Two or three relevant lenses usually beat a recital of every law.

Example: a pricing screen loses the chosen billing interval when users compare plans. This is an observed memory burden, not evidence that “four plans are too many.” Keep interval and total visible; preserve selection when navigating back. Check that people can explain what they will pay, compare all relevant plans, and return without data loss. Until exercised, label the benefit a prediction.

Acceptance scenarios:

1. A long but meaningfully grouped menu remains searchable and keyboard-operable; no arbitrary item cap forces hidden navigation.
2. An interrupted form restores safe draft data and context without silently submitting or storing sensitive information unnecessarily.
3. A mistaken consequential default is visible and editable before commitment.
4. Declining and canceling work without persuasive detours or hidden costs.
5. A glass or motion effect can disappear while meaning, controls, and task completion remain intact.

## Evidence and further reading

- [MacKenzie, Motor Behaviour Models for HCI](https://www.yorku.ca/mack/mackenzie_chapter.html): Fitts and Hick–Hyman models, tasks, and empirically fitted constants.
- [Cowan, 2001](https://doi.org/10.1017/S0140525X01003922) and [Cowan, 2015 retrospective](https://pmc.ncbi.nlm.nih.gov/articles/PMC4486516/): memory estimates, task conditions, and meaningful chunking—not menu-size prescriptions.
- [Scheibehenne, Greifeneder & Todd, 2010 meta-analysis](https://scheibehenne.com/ScheibehenneGreifenederTodd2010.pdf): near-zero average choice-overload effect with substantial variation across studies. This does not prove overload never occurs.
- [Nielsen's usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/): practical evaluation framework, not a validated numerical certification.
- [WCAG 2.2 target-size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): AA requires 24×24 CSS px or a specified exception. This skill prefers at least 44×44 CSS px for standalone touch controls; distinguish that preference from the AA minimum.

The implementation and ethical checks above are this skill's synthesis, not experimental conclusions attributed to these sources.
