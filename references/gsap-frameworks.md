# GSAP in frameworks — scope, lifecycle, cleanup

Read this when using GSAP in React, Next.js, Vue, Nuxt, Svelte, or another component framework. The invariant is simple: create after the DOM exists, scope selectors to the component root, and revert on teardown. Adapted from GreenSock’s official `gsap-react` and `gsap-frameworks` skills; see [sources](gsap-sources.md).

## Framework-independent contract

- Run animation setup only on the client and after target nodes mount.
- Keep a root element/ref and scope selector text to it.
- Create tweens, timelines, plugins, and ScrollTriggers inside one context where possible.
- Revert that context when dependencies change or the component unmounts.
- Wrap callbacks that create later GSAP work so those instances join the component context.
- Register plugins once at module/app initialization, not during each render.
- Refresh ScrollTrigger only after a DOM/layout update that changes trigger geometry.

Do not solve framework cleanup with `ScrollTrigger.getAll().forEach(kill)`; that can destroy instances owned by other components.

## React and Next.js

When available, prefer `useGSAP()` from `@gsap/react`; it provides isomorphic lifecycle behavior, scoped cleanup, and `contextSafe`.

```bash
npm install gsap @gsap/react
```

```jsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Results() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.from(".result", {
      autoAlpha: 0,
      y: 8,
      stagger: 0.04,
      overwrite: "auto",
    });
  }, { scope: root });

  return <section ref={root}>{/* results */}</section>;
}
```

Use `dependencies` only for values that should rebuild the animation. Set `revertOnUpdate: true` when each dependency change must revert the old context before recreation.

GSAP work created later by event handlers is not automatically captured unless wrapped with `contextSafe`. Prefer React event props over manual listeners; if manual listeners are necessary, remove them in cleanup.

When `@gsap/react` is unavailable, use `gsap.context()` inside a client-only effect and return `ctx.revert()`. Never execute `gsap.*` or ScrollTrigger APIs during server rendering. In Next.js, keep animation code in a client component or load browser-only modules from client lifecycle where the project’s bundling requires it.

## Vue and Nuxt

Create the context in `onMounted`, pass the root element as scope, and revert it in `onUnmounted`.

```vue
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";

const root = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".item", { autoAlpha: 0, y: 8, stagger: 0.04 });
  }, root.value);
});

onUnmounted(() => ctx?.revert());
</script>

<template><section ref="root"><!-- items --></section></template>
```

For reactive layout changes, wait for `nextTick()` before refreshing geometry. In Nuxt, keep registration and use SSR-safe; lazy-load large, route-specific plugins when it materially improves the initial bundle. Do not build a universal plugin loader unless the project actually uses enough plugins to justify it.

## Svelte

Create the context in `onMount` and return cleanup from it.

```svelte
<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let root;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from(".item", { autoAlpha: 0, y: 8, stagger: 0.04 });
    }, root);

    return () => ctx.revert();
  });
</script>

<section bind:this={root}><!-- items --></section>
```

After reactive DOM changes that alter ScrollTrigger geometry, wait for Svelte’s DOM update (`tick`) and then refresh once.

## Repeated components and state changes

- Never use unscoped selectors such as `.card` from a component; multiple instances will affect each other.
- Avoid rebuilding a timeline on every render. Build from deliberate dependencies or store and control one instance.
- On state reversal, prefer reversing/retargeting an existing animation or use overwrite rather than stacking stale tweens.
- Do not let animation own application state. The framework state and final DOM remain authoritative.
- If route caching keeps a component mounted but hidden, pause nonessential animation and refresh geometry when restored.

## Review

The integration passes when SSR does not execute browser animation APIs, every selector is component-scoped, updates do not accumulate duplicate tweens/listeners/triggers, route and component teardown revert inline state correctly, and multiple component instances behave independently.
