<h1 align="center">Frontend Craft</h1>

<p align="center"><strong>Give your coding agent a design brief, not just a component list.</strong></p>

<p align="center">A skill for building web interfaces with a point of view, complete behavior, and room for real people.</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://github.com/enzodevs/frontend-craft/actions/workflows/ci.yml"><img src="https://github.com/enzodevs/frontend-craft/actions/workflows/ci.yml/badge.svg" alt="Checks"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributions-welcome-2ea44f.svg" alt="Contributions welcome"></a>
</p>

<p align="center"><a href="#install">Install</a> · <a href="#what-it-covers">What it covers</a> · <a href="#try-it">Try it</a> · <a href="#checks">Checks</a></p>

Frontend Craft helps a coding agent work through the decisions behind a web interface: what someone needs to do, what already exists in the project, how the page should look, and how it behaves when things go wrong.

Use it for landing pages, dashboards, forms, components, and product flows. It also works as a critique guide when an interface feels generic, flat, abrupt, or broken on mobile.

## Install

### With Vercel's skills CLI

Run this from the project where you want to use the skill:

```sh
npx skills add enzodevs/frontend-craft --skill frontend-craft
```

Choose your agent when prompted. To install globally for a specific agent:

```sh
npx skills add enzodevs/frontend-craft --skill frontend-craft --global --agent claude-code
```

You can inspect the available skill without installing it:

```sh
npx skills add enzodevs/frontend-craft --list
```

The CLI downloads this public repository. Its default telemetry records installation identifiers for the skills.sh directory; set `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1` to opt out. See the [CLI documentation](https://github.com/vercel-labs/skills).

### Manual install

For Claude Code, clone into its skill directory:

```sh
git clone https://github.com/enzodevs/frontend-craft.git ~/.claude/skills/frontend-craft
```

For another agent, copy `SKILL.md`, `references/`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, and `licenses/` into its supported skill directory. Keep the relative paths intact. Follow your agent's instructions for reloading skills.

The skill itself needs no API keys, environment file, backend, or npm installation. Node.js is only needed for the skills CLI or the repository's tests.

## Why this skill

A polished screenshot can still hide a confusing price, an inaccessible menu, or a form that loses someone's work.

Frontend Craft keeps those concerns together. It starts with the task and the existing project, distinguishes expressive brand pages from familiar product interfaces, and treats visual detail as part of behavior rather than a final coat of paint.

| When you need to… | The skill asks the agent to… |
| --- | --- |
| Build a new flow | Define the user outcome, constraints, complete states, and acceptance checks |
| Improve an existing interface | Reuse its components, tokens, language, and interaction patterns |
| Give a page character | Ground direction in the subject instead of a stock “modern UI” template |
| Add motion | Explain continuity and feedback, handle interruption, and respect reduced motion |
| Ship beyond a screenshot | Verify keyboard use, narrow layouts, recovery paths, and the running interface |

These are instructions, not a guarantee of model performance or an accessibility certification.

## What it covers

[`SKILL.md`](SKILL.md) is the entry point. It routes the agent to deeper references only when the task needs them.

| Area | Start here |
| --- | --- |
| Human needs, agency, and product decisions | [Human foundations](references/human-foundations.md), [product reasoning](references/product-reasoning.md) |
| Scope, reuse, and complete flows | [Implementation contract](references/implementation-contract.md), [component sourcing](references/component-sourcing.md) |
| Art direction and visual systems | [Direction](references/direction.md), [color](references/color.md), [type](references/type.md), [layout](references/layout.md) |
| Depth and detail | [Depth](references/depth.md), [polish](references/polish.md), [materials](references/material-design.md) |
| Interface and marketing copy | [Writing](references/writing.md) |
| Motion and interaction | [Motion](references/motion.md), [choreography](references/motion-choreography.md), [interaction](references/interaction.md) |
| Robustness | [Responsive design](references/responsive.md), [accessibility](references/accessibility.md), [resilience](references/resilience.md), [performance](references/performance.md) |
| Design review | [Noticing](references/noticing.md), [critique](references/critique.md) |

There are **23 bundled motion recipes**, plus guidance for Tailwind/shadcn, Motion, GSAP, uploads, imagery, and data-dense screens. Optional libraries are selected by capability, not installed by default.

## Try it

After installation, ask your agent to apply `frontend-craft`. Invocation syntax depends on the agent.

**Build a product flow**

> Use frontend-craft to build this reservation flow. Reuse the existing UI library. Include validation, unavailable dates, full pricing, cancellation, and a mobile layout. Verify the primary journey and keyboard behavior.

**Polish without replacing the system**

> Apply frontend-craft to this dashboard. Keep the components and tokens. Improve hierarchy, table readability, empty states, and the menu's opening and closing behavior.

**Review before shipping**

> Review this landing page with frontend-craft. Separate comprehension and task failures from visual preferences. Give specific findings and fixes, and say what you actually verified.

## How it works

1. **Frame the task.** Establish the affected action and scale discovery to the risk.
2. **Fit the project.** Inspect existing journeys, components, tokens, dependencies, and language.
3. **Build deliberately.** Define direction, complete states, responsive behavior, and purposeful motion.
4. **Verify the result.** Exercise the running interface, fix failures, and distinguish observed results from assumptions.

The skill does not require a particular framework. `cc2`, `xray`, and browser-automation tools are optional; ordinary repository search and the project's own test tooling are valid alternatives. Tools that upload source code require informed authorization.

## Checks

The test suite runs code extracted from the bundled recipes, rather than separate copies:

```sh
cd tests
npm ci --ignore-scripts
npx playwright install chromium
npm test
```

Checks cover local Markdown links, recipe count, adapted JavaScript syntax, and selected interactions at desktop and 320px widths: focus, keyboard use, hidden controls, rapid reversal, reduced motion, and cleanup. See [test coverage and limits](tests/README.md).

CI also checks committed files for secrets. Passing checks does not prove every recipe is production-ready, cross-browser compatible, or perceptually well tuned.

## Contribute

Focused corrections, reproducible failures, and source-backed guidance are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), follow the [code of conduct](CODE_OF_CONDUCT.md), and report vulnerabilities through the [security policy](SECURITY.md).

The repository publishes the skill, references, tests, and maintenance files. Local comparison apps, dependencies, browser output, and machine-specific files are intentionally excluded.

## Sources and license

Original Frontend Craft material is [MIT-licensed](LICENSE). Third-party material retains its own terms; the MIT license does not relicense upstream work.

The writing guidance draws on [Humanizer](https://github.com/blader/humanizer), [Marketing Skills](https://github.com/coreyhaines31/marketingskills), [Jakub Krehel's skills](https://github.com/jakubkrehel/skills), and [Impeccable](https://github.com/pbakaus/impeccable). Motion references retain their transitions.dev attribution, and GSAP guidance identifies its upstream sources.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for license texts, modifications, and redistribution boundaries.
