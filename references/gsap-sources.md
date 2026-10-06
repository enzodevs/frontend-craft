# GSAP source map and attribution

The GSAP guidance in this skill is adapted and condensed from GreenSock’s official [greensock/gsap-skills](https://github.com/greensock/gsap-skills) repository, fetched from its `main` branch on 2026-07-30. Frontend Craft adds its own adoption gate, accessibility requirements, dependency discipline, progressive-enhancement rules, and design judgment rather than reproducing the upstream skills wholesale.

## Upstream skills used

- [`gsap-core`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-core/SKILL.md) — core tweens, transform aliases, easing, staggering, playback, `matchMedia`, and reduced motion.
- [`gsap-timeline`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-timeline/SKILL.md) — timelines, positions, labels, nesting, and playback.
- [`gsap-scrolltrigger`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-scrolltrigger/SKILL.md) — triggers, scrub, pinning, refresh, responsive geometry, and cleanup.
- [`gsap-plugins`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-plugins/SKILL.md) — registration, Flip, Draggable, SplitText, SVG, scroll, and development plugins.
- [`gsap-utils`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-utils/SKILL.md) — utility selection including clamp, mapRange, interpolate, snap, toArray, wrap, and pipe.
- [`gsap-react`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-react/SKILL.md) — `useGSAP`, refs, contexts, SSR, `contextSafe`, and cleanup.
- [`gsap-performance`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-performance/SKILL.md) — compositable properties, batching, `quickTo`, and cleanup.
- [`gsap-frameworks`](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-frameworks/SKILL.md) — Vue, Nuxt, Svelte, lifecycle, selector scoping, and cleanup.

Upstream index: [`skills/llms.txt`](https://github.com/greensock/gsap-skills/blob/main/skills/llms.txt).

## License boundary

The following MIT license covers the upstream **GSAP skill documentation repository**. It must not be described as the license for the GSAP software package itself. Verify GSAP product and commercial terms through [GreenSock’s official site](https://gsap.com/licensing/).

> MIT License
>
> Copyright (c) 2026 GreenSock
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

## Maintenance

When updating these references:

1. Compare against the current upstream `main` branch and installed GSAP version.
2. Preserve Frontend Craft’s smallest-capable-runtime rule.
3. Keep content visible without JavaScript and retain deliberate reduced-motion behavior.
4. Prefer scoped cleanup over page-global teardown.
5. Update the fetch date above when upstream material is re-reviewed.
