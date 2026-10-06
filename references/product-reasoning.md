# Product reasoning before UI

Frontend craft starts before pixels when the task changes a flow, introduces a feature, or makes a product decision. The goal is not ceremony; it is to avoid implementing a polished answer to the wrong problem.

## Scale the reasoning to the task

Do not turn every edit into a workshop.

- **Small component or polish change:** establish the affected user action, existing pattern, required states, and acceptance check. This should take seconds.
- **Existing screen or flow change:** map the current path, friction, constraints, reuse opportunities, failure paths, and success signal.
- **New feature or ambiguous workflow:** run the full product gate below and resolve meaningful uncertainty before choosing screens.

If the user has already supplied an answer, use it. Ask only for information that changes the implementation; otherwise state a reasonable assumption and proceed.

## The proportional product gate

Before opening a new design direction, answer:

1. **What is broken today?** Name the observable friction, blocked task, delay, error, or unmet need—not a requested screen.
2. **Who experiences it?** Identify the primary user, their familiarity, language, device/input, interruptions, frequency of use, and stakes. Name the burden: what must they notice, remember, infer, reach, wait for, or risk? Use [human foundations](human-foundations.md) to turn this into a capability the interface should extend.
3. **What outcome should they achieve?** Users want an outcome, not a dashboard, filter, notification, or form.
4. **Why does it matter?** Connect user value to a product or business result: completion, conversion, retention, trust, support load, operational time, or revenue.
5. **How will success be measured?** Prefer an outcome signal with a user guardrail: completion time plus errors/recovery, conversion plus understanding of the commitment, retention plus successful cancellation. “Make it better” is not measurable; more engagement alone is not evidence of user benefit. Distinguish a proposed measure from collected evidence.
6. **What already exists?** Search for current flows, platform conventions, design-system patterns, components, tokens, and solved examples. Extend before inventing.
7. **What constrains the solution?** Time, engineering effort, platform/API capability, available data, legal policy, accessibility, localization, and release scope.
8. **What can go wrong?** Include no data, invalid input, loading, failure, timeout, offline, denied access, interruption, and recovery. Also trace mistaken defaults, accidental commitments, declining, cancellation, and exit. State where necessary judgment must remain with the person rather than automation.

The output is a short decision frame, not a long document:

**Work backward from the user outcome to the implementation.** Choose screens, components, APIs, and technology only after defining what the user must accomplish. Do not let an available framework, component, or technically interesting feature determine the product experience.

- Problem
- Primary user and context
- Desired outcome
- Success signal
- Existing patterns to reuse
- Constraints and scope
- Critical alternate/failure paths

## Map the current journey before replacing it

For flow work, identify:

- Entry point and prior context
- Steps users take now
- Hesitation, repetition, and unnecessary choices
- Drop-off or failure points
- What happens before and after this flow
- Beginner and expert differences

Do not begin with “what screens do we need?” Begin with “where does progress break?” The UI follows the journey.

## Familiar behavior, distinctive expression

Consistency and originality solve different problems:

- In the **product register**, reuse familiar behavior, expected controls, and existing components. Distinction should come from clarity, information design, and product-specific details—not novel interaction mechanics.
- In the **brand register**, visual expression can be more distinctive, but navigation, controls, and accessibility should remain understandable.

If a new pattern creates relearning without a measurable benefit, reuse the familiar one.

## Focused agent workflows

Do not ask one giant prompt or one implementation pass to solve everything. Use small passes with explicit inputs and outputs, activating only the passes the task needs:

1. **Existing-system discovery** — inputs: repository, brief; output: components, tokens, flows, constraints to preserve.
2. **Problem and flow framing** — inputs: user outcome, current behavior; output: decision frame and path map.
3. **State and edge-case mapping** — inputs: flow and APIs; output: component, action/system, and view/data states with recovery.
4. **Content and copy** — inputs: user context, action, tone, space; output: labels and messages that explain what happens next.
5. **Visual direction** — inputs: register, subject, references, system; output: a coherent direction rather than unrelated options.
6. **Implementation** — inputs: decision frame and implementation contract; output: working UI within the existing system.
7. **Accessibility, resilience, and responsive audit** — input: implementation; output: ranked defects and fixes.
8. **Final critique and acceptance check** — input: rendered behavior; output: verified criteria, screenshots where useful, and remaining caveats.

Research synthesis, competitor analysis, and usability-test analysis are evidence-based workflows. Run them only when the user supplies evidence or explicitly asks for research; never invent findings.

## Checklist

- [ ] Reasoning depth matches task risk; routine edits are not blocked by ceremony
- [ ] Problem, user, outcome, and success signal are clear
- [ ] Existing flow and components inspected before inventing replacements
- [ ] User value and product/business value are both represented
- [ ] Scope, exclusions, dependencies, and constraints are explicit
- [ ] Alternate, failure, and recovery paths are mapped
- [ ] Familiar behavior is preserved unless novelty earns its cost
- [ ] Work is split into focused passes rather than one giant generation step
