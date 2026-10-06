# Direction — giving a screen a point of view

The deep version of dimension 1. Read this when the look is undecided, when you're starting fresh, or when the user wants something distinctive rather than functional-but-generic. The job here is the opposite of executing craft well: it is *deciding what to execute*. A page with flawless craft and no point of view still reads as templated.

Work like the design lead at a small studio known for giving every client an identity that couldn't be mistaken for anyone else's. This client has already rejected proposals that felt templated. They are paying for a distinctive, opinionated point of view: deliberate choices about palette, type, and layout specific to *this* brief, plus one real aesthetic risk you can justify.

## Ground it in the subject

If the brief doesn't pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice out loud. If you have any context about the user's preferences or what they're building, use it as a hint.

The distinctive material is in the subject's own world — its instruments, artifacts, materials, vernacular. A page for a film-scoring tool should feel like a scoring stage, not like "a SaaS landing page that happens to mention music". Build with the brief's real content and subject matter throughout, not lorem-ipsum-shaped placeholders that you swap later.

### Name a real reference, not adjectives

Unnamed ambition becomes beige. Before committing to a direction, name **2–3 concrete real-world references** — products, brands, physical objects — rather than words like "modern" or "clean": "Klim's `#ff4500` orange drench", "Stripe's purple-on-white restraint", "Vercel's pure-black monochrome". Naming anchors also catches lane-drift (reaching for an editorial-magazine look on a non-editorial brief).

### Decide the surface with a scene sentence

Light vs dark is never a default ("dark because tools look cool", "light to be safe"). Before choosing, write **one sentence describing the physical scene**: *who* uses this, *where*, under what *ambient light*, in what *mood*. If the sentence doesn't force the light/dark answer, it isn't concrete enough — add detail until it does.

### Color strategy

Decide *how much* color commitment before picking hues: Restrained, Committed, Full palette, or Drenched. A product page usually wants Restrained (one accent ≤10%); a brand surface has permission to commit. Full taxonomy and the palette system are in `color.md`.

## The hero is a thesis

Open with the most characteristic thing in the subject's world, in whatever form makes sense: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate. *A big number with a small label, supporting stats, and a gradient accent is the template answer* — only use it if it's truly the best option for this brief. The hero is where you state the page's argument; make it argue something specific.

## Typography carries the personality

- Pair the display and body faces deliberately — **not** the same families you'd reach for on any other project.
- Set a clear type scale with intentional weights, widths, and spacing.
- Use the display face with restraint; let it be characterful. Add a utility/mono face for captions or data if the content needs it.
- Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content. Tracking, optical sizing, a distinctive numeral style, a deliberate measure — these are design decisions, not defaults.

**Choosing the faces** — a procedure to escape training-data defaults, every project:

1. Write three brand-voice words as *physical-object* words ("warm and mechanical and opinionated"), not "modern/elegant".
2. List the fonts you'd reach for by reflex — and reject any on the reflex-reject list below.
3. Browse a real catalog imagining the brand as a physical object (a museum caption, a 1970s terminal manual, a concert poster); reject the first thing that "looks designy".
4. Cross-check: "elegant" ≠ serif, "technical" ≠ sans, "warm" ≠ the trendy expressive serif. If the final pick equals the reflex pick, start over.

**Reflex-reject fonts** (greenfield only — they create monoculture): Fraunces, Newsreader, Lora, Crimson, Playfair Display, Cormorant, Syne, IBM Plex, Space Mono, Space Grotesk, Inter, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans/Serif. One tier deeper, the **editorial-typographic lane** itself (display serif + small mono labels + ruled separators + monochrome + three ruled columns) is saturated — avoiding a banned font but rebuilding that look is the same trap.

You often don't need a second font at all — one family in several weights beats two competing faces. Type *system* mechanics — scale, measure, leading, web-font loading — live in `type.md`.

## Structure is information

Structural devices — numbering, eyebrows, dividers, labels — should encode something true about the content, not decorate it. Many generic designs sprinkle numbered markers (`01 / 02 / 03`); that's only appropriate if the content actually is a sequence — a real process, a ranked list, a typed timeline where order carries information the reader needs. Before adding any structural device, ask whether it's telling the truth about the content. If it isn't, it's noise.

## Leverage motion deliberately

Decide where — and *whether* — animation serves the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. One orchestrated moment usually lands harder than scattered effects. But sometimes less is more: extra animation is itself a strong "AI-generated" tell. Choose what the direction calls for, then execute it with the motion dimension (`motion.md`).

## Match complexity to the vision

Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision *well* — not adding more. A minimal page with sloppy spacing isn't minimal, it's unfinished.

## Avoid the AI defaults (slop)

Generic, "AI-made" output is the default failure mode, and avoiding it is most of what makes design feel intentional. The core tell: **the result is predictable from the category.** Post-AI-flood, this matters more than ever — the web is saturated with competent, generic pages, so *average is now invisible* and unintentional restraint reads as mediocre.

**Three saturated looks** that appear regardless of subject:

1. Warm cream background (near `#F4F1EA`) + high-contrast serif display + terracotta accent.
2. Near-black background + a single bright acid-green or vermilion accent.
3. Broadsheet layout: hairline rules, zero border-radius, dense newspaper columns.

These are legitimate for *some* briefs — the problem is the reflex. Where the brief **pins down** a direction (including asking for one of these), follow it exactly; the brief's words always win. Where it leaves an axis **free**, don't spend it on a default.

**The two-altitude category test.** First order: could someone guess the theme and palette from the *category alone*? Second order: could they guess the aesthetic family from *category plus the obvious anti-reference*? Rework until both are non-obvious. (An "AI workflow tool that's not SaaS-cream" reflexively becomes editorial-typographic — that only dodged the first reflex.)

**The warm-neutral "cream" band, precisely.** The whole warm-neutral background band reads as cream/paper no matter what you name it — and renaming the token is itself the tell. The band is OKLCH **L 0.84–0.97, C < 0.06, hue 40–100**. Giveaway token names: `--paper`, `--cream`, `--sand`, `--bone`, `--linen`, `--parchment`, `--wheat`, `--ivory`. A warm/editorial brief does **not** mean a warm-tinted near-white body — put the warmth in accent, type, and imagery, not the ground. Escapes: a saturated brand color as body, a true off-white at chroma 0, or a clearly-branded mid-tone.

**Decorative clichés to rewrite** (each has a structural fix):

- **Hero-metric template** (big number + small label + supporting stats + gradient accent) — the SaaS cliché; a prominent metric is fine only with real user data.
- **Identical card grids** (rows of same-size icon+heading+text) — vary, span, or mix with non-card content; see `layout.md`.
- **Gradient text** (`background-clip: text`) — use a solid color; emphasize with weight/size.
- **Side-stripe accents** (`border-left > 1px` as a marker) — full hairline, 4–8% wash, or leading glyph; see `color.md`.
- **Glassmorphism as a default** — rare and purposeful, or not at all.
- **Eyebrow on every section** — a tiny uppercase tracked kicker above *every* heading is AI grammar. One named kicker as a system is voice; repeating it as section scaffolding is not. Reserve tracked uppercase for short labels, never full sentences.
- **Monospace as "technical" shorthand** (costume unless the brand is actually technical), rounded icon-tiles above every heading, all-caps body copy, timid palettes / average layouts.

**Don't fake materials or imagery.** No CSS scenery, hand-drawn/sketchy SVG, `feTurbulence` "paper grain", emoji-as-content, or colored-`div` placeholders standing in for real images. Image-led briefs need real imagery — see `patterns/imagery.md`.

**AI-prose copy tells** (beyond "be specific"): avoid the vocabulary — *seamless, robust, delve, elevate, empower, tapestry, "in today's…", "gone are the days", "whether you're", "let's dive in", moreover, furthermore* — and the structural tics: the negation pivot ("it's not X, it's Y"), everything-in-threes auto-pilot, uniform paragraph rhythm. Make the claim directly.

**The slop-test battery** (run after building):

- **Slop test** — would a viewer say "AI made that", or ask "how was this made?"
- **Removal test** — take an effect away; is the experience diminished, or does nobody notice?
- **Competitor test** — describe what you built the way a competitor would describe theirs; if that sentence fits the modal landing page in the category, restart.
- **Wow test** — show someone fresh; do they react?

**Greenfield-only caveat:** these bans apply to *new* decisions. When an existing brand has committed to a font, color, or lane as its identity, preservation wins — don't second-guess what already ships.

## Writing — copy is design material

Words appear in a design for one reason: to make it easier to understand and therefore easier to use. Bring the same intentionality to copy as to spacing and color.

- **Write from the user's side of the screen.** Name things by what people control and recognize, never by how the system is built. A person manages *notifications*, not *webhook config*.
- **Active voice, says what happens.** "Save changes", not "Submit". An action keeps its name through the whole flow: a button that says "Publish" produces a toast that says "Published". Consistent vocabulary is how people learn their way around.
- **Failure and emptiness are direction, not mood.** Errors explain what went wrong and how to fix it, in the interface's voice — they don't apologize and they're never vague. An empty screen is an invitation to act.
- **Register:** plain verbs, sentence case, no filler, tone matched to brand and audience. Each element does exactly one job — a label labels, an example demonstrates, nothing does double duty.
- **Specific beats clever.** Describe what something does in plain terms rather than selling it. Generic copy makes a design feel as templated as generic layout does.

## Process: plan, critique, build, critique again

Two passes, with a critique gate between them.

**Pass 1 — plan.** From the brief, draft a compact token system:
- **Color:** the palette as 4–6 named hex values.
- **Type:** typefaces for 2+ roles — a characterful display face (used with restraint), a complementary body face, and a utility face for captions/data if needed.
- **Layout:** a layout concept in one-sentence prose plus ASCII wireframes to ideate and compare.
- **Signature:** the single unique element this page will be remembered by, embodying the brief.

**Critique gate.** Review the plan against the brief before building. If any part reads like the generic default you'd produce for any similar page, revise it — and say what you changed and why. Only once you've confirmed the plan's relative uniqueness do you write code, deriving every color and type decision from the plan and following it exactly.

**Pass 2 — build, then critique again.** While building:
- Watch CSS selector specificity. It's easy to generate classes that cancel each other out — a type-based selector like `.section` fighting an element-based one like `.cta`, especially on paddings/margins between sections.
- Critique as you go. Take screenshots if the environment supports it — a picture is worth a thousand tokens.
- Remember Chanel: before leaving the house, look in the mirror and take one thing off. Cut the decoration that doesn't serve the brief.

Do most of this planning and iteration in your head; only show the user ideas once you have real confidence they'll land. The exception is the most misfire-prone work — maximalist effects, big aesthetic risks: for those, **propose 2–3 directions first**, describe each one's look/feel and trade-offs (browser support, perf cost, complexity), and get the pick before writing code. Not taking a risk is itself a risk — a perfectly safe page is a forgettable one.

## Simplify: remove obstacles, not features

Simplicity isn't fewer features — it's fewer obstacles between the user and their goal. Every element justifies its existence; find the 20% that delivers 80%. Concrete reduction targets: 1–2 colors plus neutrals (not 5–7); one font family, 3–4 sizes, 2–3 weights; one spacing scale (kill arbitrary gaps); ask "does this need 12 variants, or do 3 cover 90%?"; cut every sentence in half, then again; one obvious next step, not five competing CTAs; inline editing over modal flows where possible.

Guardrails — *never* while simplifying: remove needed functionality, sacrifice accessibility, make something so minimal it's unclear (mystery ≠ minimalism), remove decision-relevant information, or flatten hierarchy entirely. Match complexity to the task; don't oversimplify a genuinely complex domain.

## Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing and keep everything around it quiet and disciplined. Build to a quality floor without announcing it: responsive to mobile, visible keyboard focus, reduced motion respected. Human designers have memory and always try something new — if you can jot quick notes on what you've tried, it helps future passes avoid repeating yourself.
