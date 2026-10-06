# Motion recipe checks

```sh
cd tests
npm ci --ignore-scripts
npx playwright install chromium  # if not already installed
npm test
```

Tests extract the actual HTML/CSS/JavaScript fences from bundled recipes 05, 06, 20, 21, 22, and 23. No copied implementation fixture or application server is needed. Chromium checks desktop and 320px layouts, semantics, keyboard/focus, reversal, reduced motion (including changes mid-transition), and controller teardown. These are regression checks, not a screen-reader, cross-browser, or perceptual-quality certification.

Markdown structure checks cover the skill, references, repository documentation, and pull request template's local links; portable paths; skills CLI metadata; catalog/README count; and JavaScript syntax in the adapted controller samples. The public repository does not include the local lab apps.
