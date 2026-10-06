# Contributing to Frontend Craft

Keep changes focused on helping an agent make and verify better interface decisions. Useful contributions include clearer guidance, reproducible recipe bugs, accessibility fixes, and corrections backed by primary sources.

## Before you start

- Search existing issues and inspect the relevant reference.
- Open an issue before a large restructure, new dependency, or substantial new topic.
- Report vulnerabilities privately through [SECURITY.md](SECURITY.md), not an issue.
- Follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Local setup

```sh
git clone https://github.com/enzodevs/frontend-craft.git
cd frontend-craft
git switch -c fix/describe-the-change
cd tests
npm ci --ignore-scripts
npx playwright install chromium
npm test
```

The skill is Markdown; npm is for the checks, not the skill itself. No API key or environment file is needed.

## Editing guidance

- Keep `SKILL.md` as the routing spine. Put detailed rules and examples in the relevant reference.
- Explain when a rule applies, its limits, and how to verify it. Avoid unsupported universal claims.
- Preserve the project's reuse-first, smallest-capable-runtime, accessibility, and user-agency rules.
- Treat libraries and local tooling as optional unless a capability truly requires them.
- Keep paths portable and local links valid.
- Cite primary sources for imported or adapted guidance. Preserve required copyright and license notices.
- Do not submit paid, proprietary, or ambiguously licensed material without explicit redistribution rights.
- Use plain, factual copy. Do not invent testimonials, performance improvements, or benchmark results.

## Recipes and tests

Edit the Markdown recipe itself. Tests extract its actual code fences, so a separately copied test implementation would not validate the shipped sample.

For interaction changes, cover the relevant states: opening, closing, rapid reversal, keyboard/focus, hidden controls, reduced motion, and cleanup. Check 320px layouts. If a new numbered recipe changes the bundled count, update the catalog, README, and count assertion together.

For documentation-only changes, run the link/structure check:

```sh
cd tests
npm test -- --grep 'reference links'
```

Run the full suite for recipes, controllers, styles, test changes, or CI changes. State checks you could not run; do not claim cross-browser or screen-reader verification from Chromium tests alone.

Optionally scan locally with [Gitleaks](https://github.com/gitleaks/gitleaks):

```sh
gitleaks git --redact --no-banner .
```

## Pull requests

- Explain the problem, intended behavior, and scope.
- List the exact checks run and any remaining limits.
- Add source and license details for third-party changes.
- Do not commit `lab/`, credentials, dependency folders, generated browser output, or personal paths.
- Use short, descriptive commits. Never force-push shared branches; use a feature branch and a pull request.
- Keep unrelated cleanup out of the change.

Original contributions are accepted under [MIT](LICENSE); third-party material must retain its applicable terms as documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
