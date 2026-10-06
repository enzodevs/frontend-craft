# Implementation contract

A finished screen is not a finished implementation. Before coding a meaningful feature—or before declaring it complete—make the decisions that code otherwise turns into guesses.

This is not a separate deliverable by default. Keep it in the task plan, component API, tests, issue, or implementation notes at the level the work warrants.

## Contract fields

### Scope and release boundary

Define:

- What screens, components, and flows are included
- What is intentionally excluded or deferred
- Dependencies on other work, data, APIs, permissions, or assets
- What “done” means for this release

A clean implementation of undefined scope still creates rework.

### Reuse and ownership

Before adding a component, answer:

- Does this already exist in code or the design system?
- Can an existing component be extended without breaking its semantics?
- Would a new variant remain coherent across products and contexts?
- Who owns shared behavior or tokens that must change?

Reuse before rebuilding, but do not force a component into a use it cannot represent cleanly.

### Complete flows

Document the path, not isolated screens:

- Entry and exit
- Happy path
- Alternate paths
- Cancellation and undo
- Empty, loading, success, and error paths
- Permission, offline, timeout, and recovery paths
- What state persists across navigation or refresh

### State model

Use the three-layer model in `interaction.md` and `resilience.md`:

- Component states: resting and direct interaction
- Action/system states: asynchronous operation and environmental outcomes
- View/data states: what the page can validly contain

Specify only states the component or flow can actually enter. Do not mechanically attach every possible state to every control.

### Responsive behavior

Do not say only “responsive.” Define:

- Content-driven breakpoints
- What stacks, wraps, scrolls, collapses, hides, or changes form
- Min/max widths and container behavior
- Mobile navigation and touch equivalents
- Fixed/sticky behavior and safe areas
- Density changes for tables, charts, and complex controls

Responsive behavior is prioritization, not uniform shrinking.

### Real content and data

Define behavior for:

- Short, typical, and long values
- Missing/null values
- Wrapping, truncation, expansion, and character limits
- Dynamic numbers, date/number formats, and locale expansion
- Zero, one, many, and very large result sets
- Stale, partial, or independently failing data regions

Use realistic fixtures in development and tests. Perfect placeholder content hides defects.

### Interaction and keyboard behavior

For each non-obvious interaction, specify:

- Trigger and result
- Click/tap and keyboard operation
- Focus movement and focus return
- Dismissal and Escape behavior
- Instant feedback, progress, completion, and failure
- Whether an action is reversible and how undo works
- Timing, animation, sticky behavior, and announcements where relevant

A static screenshot cannot communicate these decisions.

### Accessibility

Include:

- Semantic element and accessible name
- Keyboard path and visible focus
- Screen-reader labels, descriptions, and live announcements
- Contrast and non-color indicators
- Touch-target size
- Reduced-motion behavior
- Zoom/reflow, RTL, and text expansion where relevant

Accessibility is part of the interaction contract, not a post-build layer.

### Technical constraints and trade-offs

Align early on:

- Feasibility and engineering effort
- Existing APIs and whether new endpoints are required
- Performance, browser, platform, and rendering limits
- Security, privacy, legal, and analytics requirements
- Whether motion or visual complexity earns its cost

When constraints force compromise, preserve the primary user outcome first and record the trade-off.

### Acceptance criteria and review

Make completion observable. Criteria should cover:

- Primary and alternate task completion
- State and error coverage
- Target widths and input modes
- Accessibility expectations
- Data extremes
- Performance budgets where relevant
- Analytics events where relevant

Then review the working build, not only source code:

1. Run narrow automated checks.
2. Exercise all relevant states with realistic fixtures.
3. Verify keyboard, touch, reduced motion, and target widths.
4. Compare the result to the criteria and capture screenshots when visual judgment matters.
5. Classify findings by priority and document any accepted caveat.

## Compact contract template

```md
## Implementation contract
- Problem/outcome:
- Success signal:
- In scope / out of scope:
- Existing components to reuse or extend:
- User flows:
- Component states:
- Action/system states:
- View/data states:
- Responsive behavior:
- Real-data rules:
- Interaction and keyboard behavior:
- Accessibility requirements:
- Constraints/trade-offs:
- Analytics events, if any:
- Acceptance criteria:
- Review matrix (widths × states × input modes):
```

## Checklist

- [ ] Scope, exclusions, dependencies, and release boundary are explicit
- [ ] Existing components inspected before new primitives are created
- [ ] Complete flows include alternate, failure, and recovery paths
- [ ] Relevant states specified using the three-layer model
- [ ] Responsive transformations are described, not merely called responsive
- [ ] Real-data extremes and formatting rules are covered
- [ ] Interaction, keyboard, focus, feedback, and undo behavior are clear
- [ ] Accessibility is part of acceptance, not deferred
- [ ] Technical trade-offs are explicit and protect the primary outcome
- [ ] Acceptance criteria are measurable and the working build is reviewed
