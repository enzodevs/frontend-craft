# Resilience

The deep version of "handles reality". A design that only works with perfect data, a fast network, and English isn't done — it's a demo. This file is about the states and inputs the happy path ignores.

## Design every data/system state

Each data view needs its non-default states designed, each with a next action:

- **Empty** — use the taxonomy below. Never render a blank panel or one generic “nothing here” message for every cause.
- **Loading** — name what's loading ("Loading your projects…"), give a time estimate for long operations, and distinguish initial load from pagination from refresh. Prefer skeletons (see `interaction.md`).
- **Large datasets** — paginate or virtualize; never render 10k rows into the DOM.
- **Concurrent** — disable the submit button to block double-submit, handle races, and use optimistic-update + rollback where appropriate.
- **Permission** — show a read-only mode and explain *why* an action is unavailable, don't just hide it.
- **Browser support** — feature-detect (`@supports`, capability checks), never UA-sniff.

## Empty states are different product moments

“Empty” describes appearance, not cause. Identify the cause before writing the message or CTA.

| Empty-state type | What it should do | Typical action |
|---|---|---|
| **First use** | Explain the feature, its value, and the first step | Create/start/connect |
| **No user-created content** | Show what can be added and encourage the first contribution | Add first item |
| **No search results** | State that the query matched nothing; suggest spelling, broader terms, or related results | Edit/clear search |
| **No filter results** | Keep active filters visible and explain that they exclude all items | Remove one/clear all filters |
| **No data source connected** | Explain where data comes from, what must be connected, and what will appear later | Connect source |
| **All caught up** | Confirm completion, reduce anxiety, and make any next action optional | Explore or stop |
| **No saved items** | Explain why saving is useful and return users to discovery | Browse/explore |
| **No notifications** | Reassure that nothing needs attention and, if useful, expose prior activity/settings | View history/settings |
| **No team members** | Explain the collaboration value without implying an error | Invite teammate |
| **Permission-limited empty** | Explain that content may exist but is unavailable to this role | Request access/go back |

A useful empty state combines only what the moment needs:

- **Context:** what normally appears here
- **Cause:** why it is empty now
- **Value:** why filling it matters, mainly for first use
- **Primary next action:** one clear way forward
- **Reset/recovery:** for searches, filters, missing inputs, and failures
- **Reassurance:** when no action is necessary

Do not add decorative illustration before the message and next step are clear. Do not show a creation CTA when the user lacks permission. Do not celebrate a filtered-to-zero result as “all caught up.”

Every empty state should answer:

1. What happened?
2. Why is this empty?
3. What should I do next—or am I safely done?

## Test against extreme inputs

Real users supply data your mock never did. Run each view against:

- **Inputs:** very long text, empty / single-character, emoji / RTL / accented characters, huge numbers, 1000+ items, no data at all.
- **Errors:** offline, slow, timeout; HTTP 400 / 401 / 403 / 404 / 429 / 500; validation, permission, concurrency conflicts.
- **i18n:** German runs ~30% longer than English, RTL flips the layout, CJK and emoji have different byte/character widths, dates and numbers are locale-specific.
- **Stress:** click submit 10× rapidly — does it double-fire?

## Overflow and i18n CSS mechanics

A handful of gotchas decide whether a layout survives long text and other languages:

- **`min-width: 0`** (and `min-height: 0`) on flex/grid children so they can shrink below their content size — *the* classic flex-overflow fix when text refuses to truncate.
- Multi-line truncation: `-webkit-line-clamp`. Wrapping long unbroken strings: `overflow-wrap: break-word` + `hyphens: auto`.
- Match truncation to identity: end-truncate ordinary labels, middle-truncate filenames/URLs/hashes when the suffix distinguishes them, and preserve a way to reveal or copy the complete value.
- Keep values joined to units and other semantic pairs with a non-breaking space/wrapper; format numbers and precision for the locale and task rather than by string concatenation.
- **RTL:** use logical properties (`margin-inline-start`, `padding-inline`, `border-inline-end`) instead of left/right, and flip directional icons with `[dir="rtl"] .icon { transform: scaleX(-1); }`.
- Format dates and numbers with `Intl.DateTimeFormat` / `Intl.NumberFormat`, never by hand.

## Map API status to UI

Each HTTP error class has a distinct correct response:

| Status | UI response |
|---|---|
| 400 | inline validation errors |
| 401 | redirect to login |
| 403 | permission message |
| 404 | not-found state |
| 429 | rate-limit message ("try again in…") |
| 500 | generic apology + support/alternative |

Always preserve the user's input on error, and never let one failed component blank the whole interface — wrap regions in error boundaries.

## Clean up after yourself

On unmount / teardown: remove event listeners, cancel subscriptions, clear timers and intervals, and abort pending requests — or you leak memory and fire callbacks on dead components. Debounce search input ~**300ms**; throttle scroll handlers ~**100ms**.

## Checklist

- [ ] Empty-state cause identified (first use/search/filter/no data/completion/etc.), with an appropriate message and action
- [ ] Loading / error / permission / offline / timeout / concurrent states designed, each with recovery or reassurance
- [ ] Tested against long text, emoji/RTL, huge numbers, 1000+ items, no data
- [ ] Error coverage: offline/slow/timeout + 4xx/5xx, input preserved on failure
- [ ] i18n: logical properties, `Intl` formatting, ~30% text expansion absorbed
- [ ] `min-width: 0` where flex/grid children must shrink; long strings wrap/clamp
- [ ] Truncation preserves the useful identifier segment and full values remain recoverable; units never orphan
- [ ] API statuses mapped to specific UI; component error boundaries in place
- [ ] Listeners/timers/requests cleaned up on unmount; inputs debounced/throttled
