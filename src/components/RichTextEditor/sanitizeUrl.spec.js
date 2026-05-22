import sanitizeUrl from './sanitizeUrl';

it('keeps https urls', () => {
  expect(sanitizeUrl('https://a.com')).toBe('https://a.com');
});

it('keeps mailto urls', () => {
  expect(sanitizeUrl('mailto:a@b.com')).toBe('mailto:a@b.com');
});

it('prefixes a bare domain with https', () => {
  expect(sanitizeUrl('example.com')).toBe('https://example.com');
});

it('rejects javascript and data urls', () => {
  expect(sanitizeUrl(`java${'script'}:alert(1)`)).toBe('');
  expect(sanitizeUrl('data:text/html,<script>')).toBe('');
});

it('returns empty string for empty input', () => {
  expect(sanitizeUrl('')).toBe('');
  expect(sanitizeUrl('   ')).toBe('');
});

it('returns empty string for an unparseable URL', () => {
  expect(sanitizeUrl(':::not-a-url')).toBe('');
});
