# Elastic segmented control — CSS only

Adapted from the local transitions catalog's `controls/elastic-segmented-control.md`; see [provenance](../motion-catalog.md#provenance-and-maintenance). Local changes strengthen text contrast, provide 44px targets, and retain visible selection in forced colors.

## When to use

A native radio group with a sliding selection pill that overshoots and settles. This is the small, spring-like bounce of a CSS timing curve, not a physical spring. No JavaScript or animation library is needed—even for keyboard interaction.

## HTML usage

```html
<fieldset class="css-segments">
  <legend>Activity range</legend>
  <div class="css-segments__track">
    <span class="css-segments__pill" aria-hidden="true"></span>
    <label><input type="radio" name="activity-range" value="day" checked><span>Day</span></label>
    <label><input type="radio" name="activity-range" value="week"><span>Week</span></label>
    <label><input type="radio" name="activity-range" value="month"><span>Month</span></label>
  </div>
  <p>Try clicking across the whole track.</p>
</fieldset>
```

Give each radio group its own `name` when rendering multiple instances. Native radios provide Tab/arrow-key behavior and checked-state announcements; a framework can listen to their normal `change` events.

## CSS

```css
.css-segments { border: 0; margin: 0; padding: 0; width: 270px; max-width: 100%; color: #554d6c; font: 13px/1.4 system-ui; }
.css-segments legend { width: 100%; text-align: center; margin-bottom: 18px; font-weight: 600; }
.css-segments__track { --index: 0; position: relative; display: grid; grid-template-columns: repeat(3,1fr); border-radius: 18px; padding: 4px; background: #f0edf5; isolation: isolate; }
.css-segments__track:has(input[value="week"]:checked) { --index: 1; }
.css-segments__track:has(input[value="month"]:checked) { --index: 2; }
.css-segments__pill { position: absolute; left: 4px; top: 4px; width: calc((100% - 8px) / 3); height: 44px; border-radius: 14px; background: #fff; box-shadow: 0 2px 5px #51426412, 0 0 0 1px #51426405; transform: translateX(calc(var(--index) * 100%)); transition: transform .35s cubic-bezier(.34,1.56,.64,1); pointer-events: none; }
.css-segments label { position: relative; height: 44px; display: grid; place-items: center; border-radius: 14px; cursor: pointer; }
.css-segments input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.css-segments label span { pointer-events: none; color: #716477; transition: color .2s ease, transform .35s cubic-bezier(.34,1.56,.64,1); }
.css-segments input:checked + span { color: #554d6c; transform: translateY(-1px); }
.css-segments label:has(input:focus-visible) { outline: 2px solid #8e7ca9; outline-offset: -2px; }
.css-segments p { margin: 18px 0 0; text-align: center; font-size: 12px; color: #716477; }
/* Older browsers still get a usable selected state without the moving pill. */
@supports not selector(:has(*)) {
  .css-segments__pill { display: none; }
  .css-segments input:checked + span { text-decoration: underline; }
}
@media (forced-colors: active) {
  .css-segments__track { border: 1px solid CanvasText; }
  .css-segments__pill { display: none; }
  .css-segments input:checked + span { text-decoration: underline; font-weight: bold; }
  .css-segments label:has(input:focus-visible) { outline-color: Highlight; }
}
@media (prefers-reduced-motion: reduce) { .css-segments * { transition: none !important; } }
```

Unlike the gooey rail, this has no SVG filter and animates only transforms and text color. The primary moving surface is a good candidate for compositor animation, though actual performance still depends on the browser and surrounding page.
