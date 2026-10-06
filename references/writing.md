# Interface and marketing writing

Writing is part of the interface. First decide what kind of writing the surface needs:

- **Product copy** helps someone understand state, make a decision, complete an action, or recover from a problem.
- **Marketing copy** makes a truthful argument for why a specific audience should care and act.
- **Humanizing** is a final editing pass that removes mechanical, inflated, or recognizably AI-shaped prose without changing the claims.

Do not apply conversion tactics to settings, errors, permissions, or destructive actions. Do not flatten a marketing page into neutral product microcopy. In every register, preserve facts, established terminology, and the product's actual voice.

## Start from evidence

Before writing, inspect nearby copy, the product vocabulary, localization conventions, and any content or voice guide. For marketing work, also establish:

- the page's one primary action;
- the audience, their situation, and the problem in their own language;
- the promised outcome and what makes this offer different;
- objections or hesitation that the page must resolve;
- real proof: product behavior, examples, numbers, testimonials, or case studies;
- what the visitor already knows from the traffic source.

Use language from interviews, support tickets, reviews, sales calls, and search terms when available. Never invent customer language, statistics, testimonials, urgency, scarcity, guarantees, or causal claims. If evidence is missing, write the honest general version or ask for it.

## Product copy

### Keep one vocabulary

Use the same noun and verb for the same concept across navigation, controls, dialogs, and feedback. Do not vary words for literary effect. Multi-step flows choose one progression vocabulary, such as `Continue` or `Next`, and keep it.

Sentence case is the safe default. Follow the established product convention when one exists.

### Name actions and consequences

Buttons start with a verb and name the result when it is not obvious:

- `Save draft`, not `Submit`
- `Create project`, not `Let's go`
- `Delete project`, not `Yes` or `OK`

A destructive confirmation names the object and consequence in both the prompt and the confirming action. Prefer undo when recovery is safe.

Links describe their destination out of context. Avoid bare `Learn more` and `Click here`; use `Learn more about exports` or `Read the billing guide`.

Label a toggle by its enabled state: `Send read receipts`, not `Don't hide read receipts`.

### Write states as instructions

Every consequential state answers the relevant subset of:

1. What happened?
2. Why, when the system actually knows?
3. What can the person do next?
4. What consequence or timing changes their decision?

Put errors next to the failing action or field. Be calm and direct; do not joke, blame, apologize reflexively, expose an internal code as the main message, or promise a cause the system cannot know.

| Weak | Better |
|---|---|
| Invalid password | Use at least 8 characters |
| Oops! Something went wrong | Unable to save. Check your connection and try again. |
| No results | No results for “quarterly.” Clear filters |

An empty state identifies the kind of absence. First use, no results, no connected data, permissions, completion, and failure need different copy. Orient the person and provide one useful next action. Do not put essential persistent guidance in an empty state that disappears after the first item exists.

Placeholders show format or an example; they never replace a visible label. Helper text answers a likely question rather than restating the control.

### Write for localization and access

- Use complete translatable messages rather than concatenating fragments around variables.
- Support pluralization and allow translators to reorder variables.
- Leave room for longer strings; do not abbreviate preemptively.
- Keep visible labels aligned with accessible names.
- Do not rely on punctuation, iconography, or color to carry meaning.
- Prefer device-neutral `select` unless the interaction is genuinely device-specific.

## Marketing copy

Marketing copy is an argument, not decoration. It should move from the audience's problem to a credible outcome and a proportionate action.

### Build the argument

Above the fold, communicate one primary value proposition:

- **Headline:** the most important outcome, audience, or differentiation.
- **Supporting copy:** enough specificity to make the claim understandable and credible.
- **Primary action:** what the visitor gets or does next.

The rest of the page should resolve the questions created by that promise. Common roles include proof, problem context, benefits, how it works, objection handling, plan choice, and a final action. Use only the sections needed for this offer; do not force every page into a stock template.

Each section advances one idea. Match the headline and promise to what the visitor was told before arriving, especially from an ad or campaign. A landing page normally has one message and one primary action. A homepage may serve multiple intents but must provide clear paths rather than one vague claim for everyone.

### Translate features into outcomes

A feature states what the product does. A benefit explains what that changes for the customer. Connect them without overstating causality:

> Automatic report generation means the weekly report is ready before the Monday meeting.

Specificity beats claims such as “streamline your workflow,” but only when the specific value is supported. Show the mechanism, example, or proof behind strong claims.

Use customer language over internal company language. Address real objections instead of adding generic social-proof strips. CTAs should describe the next step or value (`See Acme in action`, `Create your first report`) rather than relying on vague labels (`Get started`). Preserve familiar wording when a more elaborate CTA would reduce comprehension.

### Match voice to stakes

Establish formality and personality from the existing brand. Headlines may carry more character; body copy must remain easy to understand; actions must remain clear. Humor, analogy, and rhetorical questions are optional tools, not defaults. Remove them when they obscure the product, age badly, translate poorly, or trivialize risk.

## Humanize the final draft

Humanizing is not adding slang or random personality. Preserve every claim while removing the structures that make prose feel generated or inflated.

Check for:

- unsupported significance, notability, or vague expert attribution;
- promotional adjectives standing in for evidence;
- abstract AI vocabulary such as `delve`, `landscape`, `pivotal`, `seamless`, `elevate`, or `showcase`;
- participial tails that add fake analysis (`ensuring`, `highlighting`, `reflecting`);
- repeated “not just X, but Y,” forced groups of three, false ranges, and synonym cycling;
- elaborate substitutes for `is`, `has`, `use`, or `help`;
- excessive headings, bold labels, signposting, filler, hedging, and generic conclusions;
- title case everywhere, exclamation marks, canned enthusiasm, and pasted chatbot framing.

Prefer concrete nouns and verbs. Use active voice when the actor matters, but do not mechanically rewrite every passive construction. Sentence rhythm should vary naturally. If the user supplies a writing sample, match its vocabulary, sentence length, and quirks instead of imposing a generic “human” voice.

**Avoid em and en dashes in generated interface and marketing copy.** Rewrite with a period, comma, colon, parentheses, or a clearer sentence structure. Before returning copy, scan for `—` and `–`. An established brand guide or user-supplied writing sample that intentionally uses these marks may override this default; match its frequency rather than introducing more.

## Verification

Read the complete flow or page, not isolated strings. Check:

- one clear primary action and consistent terminology;
- factual support for promises and proof;
- actionability of errors, empty states, and decision points;
- voice appropriate to the audience and consequence;
- headings and CTAs that remain clear out of context;
- variable interpolation, pluralization, and localization expansion;
- wrapping at narrow widths and 200% zoom;
- accessible names and announced state changes;
- a final read aloud for awkward rhythm, repetition, and inflated language.

When reviewing existing copy, quote the exact current text and provide a complete replacement. Explain the comprehension, trust, or conversion consequence, not merely that the rewrite “sounds better.”

## Sources

Distilled and adapted for Frontend Craft from the following skills. The writing guidance has been reorganized and extended with product-state, localization, evidence, and verification rules. The first three sources are MIT-licensed; Impeccable is Apache-2.0. Copyright notices and full license texts are retained in [third-party notices](../THIRD_PARTY_NOTICES.md).

- [`coreyhaines31/marketingskills` — `copywriting`](https://github.com/coreyhaines31/marketingskills/blob/main/skills/copywriting/SKILL.md)
- [`blader/humanizer`](https://github.com/blader/humanizer/blob/main/SKILL.md)
- [`jakubkrehel/skills` — `better-writing`](https://github.com/jakubkrehel/skills/blob/main/skills/better-writing/SKILL.md)
- [`pbakaus/impeccable` — `clarify`](https://github.com/pbakaus/impeccable/blob/main/plugin/skills/impeccable/reference/clarify.md)
