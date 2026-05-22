import MATCHERS from './autoLinkMatchers';

it('exports at least one matcher', () => {
  expect(MATCHERS.length).toBeGreaterThan(0);
});

it('matches a bare URL', () => {
  const match = MATCHERS.map((m) => m('see https://example.com now')).find(Boolean);
  expect(match).toMatchObject({ url: 'https://example.com' });
});

it('matches an email as a mailto link', () => {
  const match = MATCHERS.map((m) => m('mail me at a@b.com please')).find(Boolean);
  expect(match).toMatchObject({ url: 'mailto:a@b.com' });
});

it('returns null when there is no link', () => {
  expect(MATCHERS.every((m) => m('just plain words') === null)).toBe(true);
});

it('prefixes www URLs with https', () => {
  const match = MATCHERS.map((m) => m('visit www.example.com today')).find(Boolean);
  expect(match).toMatchObject({ url: 'https://www.example.com' });
});
