# Component sourcing and native control policy

A polished interface should not accidentally expose browser-default chrome that conflicts with the project's design system. But **native semantics and native appearance are different decisions**: keep semantic HTML whenever it helps accessibility, forms, keyboard behavior, and mobile input; do not accept an unstyled browser widget merely because it was quick.

## Acquisition order: verify, then add, then build

For any non-trivial control—number field, combobox, date picker, slider, tabs, dialog, menu, tooltip, switch—use this order:

1. **Inspect the repository.** Search the local component directory, imports, package manifest, lockfile, design-system docs, and existing usage. A component may exist under a different name (`NumberField`, `InputNumber`, `QuantityInput`, `Stepper`). Reuse or extend it.
2. **Identify the project's UI system and exact version.** Examples: shadcn/ui, Radix, React Aria, MUI, Chakra, Mantine, Ant Design, Headless UI. Do not infer availability from memory.
3. **Verify the official library catalog/docs.** Check whether the installed version provides the control, its required peer dependencies, accessibility behavior, and official installation command. Prefer official documentation and generators over third-party snippets.
4. **Add the official component through the project's own toolchain.** Use the detected package manager and lockfile (`pnpm`, `npm`, `yarn`, `bun`, etc.), or the library's generator (for example the project's shadcn CLI convention). Install the narrowest compatible dependency; preserve the lockfile and existing version policy.
5. **Compose or adapt it to project tokens.** Wrap it or add a supported variant rather than forking internals. Preserve keyboard behavior, ARIA, focus management, and form integration.
6. **Build a custom control only if the system truly lacks one or the product behavior is materially different.** Base it on proven accessible primitives where possible. A custom visual must reproduce the expected semantics and interactions—not only the screenshot.

Do not:

- install a second UI system for one missing control;
- add a dependency before checking local components and official docs;
- silently substitute a different control because installation is inconvenient;
- paste an unmaintained third-party snippet when the active library has an official primitive;
- hand-roll complex focus, keyboard, positioning, or selection logic when a compatible primitive exists.

If adding a dependency has meaningful bundle, licensing, maintenance, or compatibility cost, surface the trade-off. Otherwise, when the task requires the component and the official compatible path is clear, install it and complete the implementation rather than leaving setup instructions for the user.

## Native semantics, designed surface

Use native HTML as the semantic foundation where appropriate:

- real `button`, `input`, `label`, `fieldset`, `legend`, and form submission;
- correct input type or `inputmode` for the data and mobile keyboard;
- browser validation only when its behavior and copy fit the product;
- `dialog` and Popover where their platform behavior is an advantage.

**No accidental default chrome in project-owned controls.** Use verified, accessible project-styled calendars/date pickers, dropdowns/selects, sliders, number steppers, upload triggers, checkboxes, and radios. Styling a native select/date input does not style its browser-owned popup: when a custom popup is required, use a verified accessible component, not a clickable `div` imitation.

**Platform boundary:** style the upload trigger and selected-file presentation, not the operating system's file chooser. Preserve browser-owned permission prompts, autofill/password-manager surfaces, and accessibility overrides. An intentional native mobile date/select/color picker is valid when it better serves input, familiarity, or access; document and test that choice. Do not rebuild a secure platform dialog or worsen keyboard/touch behavior for visual uniformity.

Explicitly style input borders, backgrounds, shadows, placeholder text, and hover/focus/disabled/invalid/autofill states with project tokens. Remove unintended native bevels, inset shadows, and appearance only with an intentional replacement; never remove focus indication without a visible accessible replacement.

Style page and nested-container scrollbars with supported CSS (`scrollbar-color`, `scrollbar-width`, and engine-specific pseudo-elements where needed). Preserve native scrolling, usable grab areas, and wheel/touch/keyboard behavior; never hide scrollbars or replace scrolling with a JavaScript imitation for aesthetics. Browser/OS-owned overlays and forced-colors accessibility overrides may ignore custom styling: accept and document those platform limits rather than fighting them. Test the actual browser result.

## Number fields: never ship the accidental browser spinner

A quantity, percentage, currency, duration, or count deserves an intentional number-field pattern.

**Preferred:** use the current UI system's `NumberField`, `InputNumber`, `QuantityInput`, or stepper component after verifying and adding it through the official path.

A complete number field defines:

- visible label and optional unit/prefix/suffix;
- minimum, maximum, step, precision, and whether negatives are allowed;
- typing, paste, clearing, and intermediate values such as `-` or `1.`;
- increment/decrement buttons with accessible names and ≥44px touch targets when they are primary touch controls;
- Arrow Up/Down behavior, and optionally Page Up/Down for larger steps;
- disabled-button behavior at limits;
- locale-aware parsing/formatting and decimal separator;
- blur/submit normalization—not destructive formatting on every keystroke;
- inline error text connected through `aria-describedby`;
- form value and server-validation behavior.

If a custom implementation is necessary, a practical baseline is a semantic input with the browser spinner visually suppressed and explicit decrement/increment buttons. Preserve mobile keyboard intent with the appropriate `type`/`inputmode`; do not fake the field with a generic `div`. If the wrapper owns `role="spinbutton"`, it must correctly expose `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`, keyboard changes, and focus behavior. Prefer an accessible primitive over recreating that contract manually.

Do not format currency or append units by mutating the value while the user is typing. Keep the editable value stable; render adornments separately and format on blur or in a read-only presentation state.

## Installation verification

After adding a component or package:

- inspect the generated/installed files and imports;
- ensure only the expected manifest and lockfile changes occurred;
- run the narrow typecheck/build/test for the affected component;
- test keyboard, focus, touch, disabled, invalid, min/max, and reduced-motion behavior;
- verify it uses project tokens in light and dark themes;
- check bundle impact when the dependency is non-trivial.

## Checklist

- [ ] Existing local components and usages searched first
- [ ] Active UI library and installed version identified
- [ ] Official docs/catalog checked for the exact control
- [ ] Official component added with the project's package manager/generator when available
- [ ] No second UI system introduced for one control
- [ ] Native semantics retained; project-owned chrome styled; platform dialogs preserved and intentional native-picker choices tested
- [ ] Input borders and all interactive states intentionally styled; visible focus preserved
- [ ] Page and nested scrollbars styled where supported; native scrolling and accessibility overrides preserved
- [ ] Custom control used only after library/primitives were exhausted
- [ ] Keyboard, ARIA, focus, touch, form, validation, and edge-value behavior verified
- [ ] Manifest/lockfile/build impact reviewed
