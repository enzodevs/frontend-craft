import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const recipes = {
  dropdown: '05-menu-dropdown.md',
  modal: '06-modal.md',
  morph: '20-plus-menu-morph.md',
  accordion: '21-accordion.md',
  compose: '22-compose-note-morph.md',
  segments: '23-elastic-segmented-control.md',
};
function fences(file, language) {
  return [...readFileSync(file, 'utf8').matchAll(new RegExp('```' + language + '\\n([\\s\\S]*?)\\n```', 'g'))]
    .map(match => match[1]).join('\n');
}
async function load(page, key, reducedMotion = 'no-preference') {
  const file = resolve(root, 'references/recipes', recipes[key]);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion });
  await page.setContent(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    body { margin: 16px; color: #202124; background: #eee; font: 16px system-ui; }
    #outside { display: block; margin-top: 240px; }
    ${fences(file, 'css')}
    </style></head><body>${fences(file, 'html')}<button id="outside">Outside action</button></body></html>`);
  const js = fences(file, 'js');
  if (js) await page.addScriptTag({ content: js });
  return errors;
}
async function settled(page) {
  await page.evaluate(async () => {
    await Promise.allSettled(document.getAnimations().map(animation => animation.finished));
  });
}
async function expectAbsentFromAccessibilityTree(page, name) {
  const cdp = await page.context().newCDPSession(page);
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  expect(nodes.filter(node => !node.ignored && node.name?.value === name)).toHaveLength(0);
  await cdp.detach();
}
async function noOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('reference links, bundled count, and adapted controller syntax', () => {
  const refs = resolve(root, 'references');
  const markdown = [
    ...['SKILL.md', 'README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md',
      'THIRD_PARTY_NOTICES.md', 'tests/README.md', '.github/pull_request_template.md']
      .map(file => resolve(root, file)),
    ...readdirSync(refs, { recursive: true })
      .filter(file => file.endsWith('.md')).map(file => resolve(refs, file)),
  ];
  const skill = readFileSync(resolve(root, 'SKILL.md'), 'utf8');
  expect(skill).toMatch(/^---\nname: frontend-craft\ndescription: [^\n]+\n---\n/);
  expect(readFileSync(resolve(root, 'README.md'), 'utf8')).toContain('**23 bundled motion recipes**');
  for (const file of markdown) {
    const content = readFileSync(file, 'utf8');
    expect(content, `${file}: machine-specific home path`).not.toMatch(/\/(?:home|Users)\/[\w.-]+\//);
    for (const [, link] of content.matchAll(/\]\(([^)]+)\)/g)) {
      if (!link.includes('://') && !link.startsWith('#')) {
        expect(existsSync(resolve(dirname(file), link.split('#')[0])), `${file}: ${link}`).toBe(true);
      }
    }
  }
  expect(readdirSync(resolve(refs, 'recipes')).filter(file => /^\d+.*\.md$/.test(file))).toHaveLength(23);
  for (const file of Object.values(recipes)) new Script(fences(resolve(refs, 'recipes', file), 'js'));
});

test('dropdown: keyboard entry/exit, Escape, outside dismissal, rapid reversal, cleanup', async ({ page }) => {
  const errors = await load(page, 'dropdown');
  const trigger = page.getByRole('button', { name: 'Quick actions' });
  await trigger.focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#outside')).toBeFocused();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'View details' })).toBeFocused();
  await expect(page.locator('.t-dropdown')).toHaveCSS('opacity', '1');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.evaluate(() => { dropdownController.setOpen(true); dropdownController.setOpen(false); dropdownController.setOpen(true); });
  await settled(page);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#outside').click();
  await expect(page.locator('.t-dropdown')).toHaveAttribute('inert', '');
  await noOverflow(page);
  await page.evaluate(() => dropdownController.destroy());
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(errors).toEqual([]);
});

test('modal: isolation, focus return, reversal, native close, teardown/remount', async ({ page }) => {
  const errors = await load(page, 'modal');
  const trigger = page.getByRole('button', { name: 'Open options' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#options-title')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Keep editing' })).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  // Native dialogs may cycle through browser chrome; background document controls stay inert.
  await page.locator('#outside').evaluate(el => el.focus());
  await expect(page.locator('#outside')).not.toBeFocused();
  await expectAbsentFromAccessibilityTree(page, 'Outside action');
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.evaluate(() => { modalController.open(); modalController.close(); modalController.open(); });
  await settled(page);
  await expect(page.locator('dialog')).toHaveAttribute('open', '');
  await expect(page.locator('.t-modal-surface')).not.toHaveAttribute('inert');
  await expect(page.locator('.t-modal-surface')).toHaveCSS('opacity', '1');
  await noOverflow(page);
  await page.evaluate(() => document.querySelector('dialog').close());
  await expect(trigger).toBeFocused();
  await page.evaluate(() => { modalController.open(); modalController.destroy(); });
  await expect(page.locator('dialog')).not.toHaveAttribute('open');
  await trigger.click();
  await expect(page.locator('dialog')).not.toHaveAttribute('open');
  // Remount twice: no lingering listeners or modal top-layer lock.
  await page.evaluate(() => {
    const dialog = document.querySelector('dialog');
    const trigger = document.querySelector('#open-options');
    const first = mountModal(dialog, trigger); first.open(); first.destroy();
    window.remounted = mountModal(dialog, trigger);
  });
  await trigger.click();
  await expect(page.locator('dialog')).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.locator('dialog')).not.toHaveAttribute('open');
  await page.evaluate(() => window.remounted.destroy());
  expect(errors).toEqual([]);
});

test('morph: hidden actions isolated, focus visible on early entry, return, teardown', async ({ page }) => {
  const errors = await load(page, 'morph');
  const trigger = page.getByRole('button', { name: 'Open actions' });
  await expectAbsentFromAccessibilityTree(page, 'Cancel');
  await page.locator('[data-close]').first().evaluate(el => el.focus());
  await expect(page.locator('[data-close]').first()).not.toBeFocused();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await expect(page.locator('.t-morph-menu')).toHaveCSS('opacity', '1');
  await expect(page.locator('.t-morph-plus')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('.t-morph-menu')).toHaveAttribute('inert', '');
  await page.evaluate(() => { morphController.setOpen(true); morphController.setOpen(false); morphController.setOpen(true); });
  await settled(page);
  await expect(page.locator('.t-morph')).toHaveAttribute('data-open', 'true');
  await page.locator('#outside').click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await noOverflow(page);
  await page.evaluate(() => morphController.destroy());
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(errors).toEqual([]);
});

test('accordion: zero collapsed height, inert content, focus return, cleanup', async ({ page }) => {
  const errors = await load(page, 'accordion');
  const trigger = page.getByRole('button', { name: 'Title' });
  expect(await page.locator('.t-acc-panel').evaluate(el => el.getBoundingClientRect().height)).toBe(0);
  await expectAbsentFromAccessibilityTree(page, 'details');
  await page.locator('.t-acc-content a').evaluate(el => el.focus());
  await expect(page.locator('.t-acc-content a')).not.toBeFocused();
  await trigger.click();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'details' })).toBeFocused();
  await expect(page.locator('.t-acc-panel-inner')).toHaveCSS('opacity', '1');
  await page.evaluate(() => accordionController.setOpen(false));
  await expect(trigger).toBeFocused();
  await settled(page);
  expect(await page.locator('.t-acc-panel').evaluate(el => el.getBoundingClientRect().height)).toBe(0);
  await noOverflow(page);
  await page.evaluate(() => accordionController.destroy());
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(errors).toEqual([]);
});

test('compose: input focus, preserved draft, cancel/submit, reversal, cleanup', async ({ page }) => {
  const errors = await load(page, 'compose');
  await page.getByRole('button', { name: 'Open quick note' }).focus();
  await page.keyboard.press('Enter');
  const field = page.getByRole('textbox', { name: 'Quick note' });
  await expect(field).toBeFocused();
  await expect(page.locator('.css-compose__content')).toHaveCSS('opacity', '1');
  await field.fill('A local draft');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('button', { name: 'Open quick note' })).toBeFocused();
  await page.getByRole('button', { name: 'Open quick note' }).click();
  await expect(field).toHaveValue('A local draft');
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.locator('output')).toHaveText('Note captured · demo only, not saved');
  await page.evaluate(() => { composeController.setOpen(true); composeController.setOpen(false); composeController.setOpen(true); });
  await settled(page);
  await expect(page.locator('.css-compose')).toHaveAttribute('data-open', 'true');
  await noOverflow(page);
  await page.evaluate(() => composeController.destroy());
  await page.getByRole('button', { name: 'Open quick note' }).click();
  await expect(page.locator('.css-compose')).toHaveAttribute('data-open', 'false');
  expect(errors).toEqual([]);
});

test('segments: native arrow selection, forced colors, reduced motion, targets', async ({ page }) => {
  const errors = await load(page, 'segments');
  await page.getByRole('radio', { name: 'Day', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Week' })).toBeChecked();
  await settled(page);
  await expect(page.locator('.css-segments__track')).toHaveCSS('--index', '1');
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Month' })).toBeChecked();
  await expect(page.locator('.css-segments__pill')).toHaveCSS('display', 'none');
  await expect(page.locator('input:checked + span')).toHaveCSS('text-decoration-line', 'underline');
  expect(await page.locator('label').first().evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  await noOverflow(page);
  expect(errors).toEqual([]);
});

for (const [key, trigger, surface] of [
  ['dropdown', '.t-dropdown-trigger', '.t-dropdown'],
  ['modal', '#open-options', '.t-modal-surface'],
  ['morph', '.t-morph-plus', '.t-morph'],
  ['compose', '.css-compose__trigger', '.css-compose__surface'],
]) {
  test(`${key}: pointer arrival uses a shaped transition rather than snapping`, async ({ page }) => {
    await load(page, key);
    // Establish the closed state, then inspect synchronously after the actual pointer click.
    await page.locator(surface).evaluate(el => getComputedStyle(el).opacity);
    await page.evaluate(({ trigger, surface }) => {
      document.querySelector(trigger).addEventListener('click', () => {
        window.arrival = document.querySelector(surface).getAnimations().map(animation => ({
          duration: animation.effect.getTiming().duration,
          easing: animation.effect.getTiming().easing,
        }));
      });
    }, { trigger, surface });
    await page.locator(trigger).click();
    const arrival = await page.evaluate(() => window.arrival);
    expect(arrival.length).toBeGreaterThan(0);
    expect(arrival.some(animation => animation.duration > 0 && animation.easing !== 'linear')).toBe(true);
  });
}

for (const key of ['dropdown', 'modal', 'morph', 'accordion', 'compose']) {
  test(`${key}: reduced motion before and during motion leaves no active animation`, async ({ page }) => {
    const errors = await load(page, key, 'reduce');
    const controller = `${key}Controller`;
    await page.evaluate(({ key, controller }) => {
      const instance = window.eval(controller);
      if (key === 'modal') instance.open(); else instance.setOpen(true);
    }, { key, controller });
    await settled(page);
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(({ key, controller }) => {
      const instance = window.eval(controller);
      if (key === 'modal') { instance.close(); instance.open(); instance.close(); }
      else { instance.setOpen(false); instance.setOpen(true); }
    }, { key, controller });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await settled(page);
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    if (key === 'modal') await expect(page.locator('dialog')).not.toHaveAttribute('open');
    await page.evaluate(controller => window.eval(controller).destroy(), controller);
    expect(errors).toEqual([]);
  });
}
