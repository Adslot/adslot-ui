import { isValidLinkUrl, plainTextFromHTML } from './helpers';

it('isValidLinkUrl accepts https/mailto', () => {
  expect(isValidLinkUrl('https://a.com')).toBe(true);
  expect(isValidLinkUrl('mailto:a@b.com')).toBe(true);
});

it('isValidLinkUrl rejects unsafe schemes and empty input', () => {
  expect(isValidLinkUrl(`java${'script'}:alert(1)`)).toBe(false);
  expect(isValidLinkUrl('data:text/html,<script>')).toBe(false);
  expect(isValidLinkUrl('')).toBe(false);
});

it('plainTextFromHTML returns empty for nullish / empty input', () => {
  expect(plainTextFromHTML('')).toBe('');
  expect(plainTextFromHTML(null)).toBe('');
  expect(plainTextFromHTML(undefined)).toBe('');
});

it('plainTextFromHTML joins paragraphs with newlines', () => {
  expect(plainTextFromHTML('<p>one</p><p>two</p>')).toBe('one\ntwo');
});

it('plainTextFromHTML preserves headings, blockquotes, and table cells alongside paragraphs', () => {
  expect(plainTextFromHTML('<h1>Title</h1><p>Body</p>')).toBe('Title\nBody');
  expect(plainTextFromHTML('<h2>Sub</h2><p>Body</p>')).toBe('Sub\nBody');
  expect(plainTextFromHTML('<blockquote>Quote</blockquote><p>Body</p>')).toBe('Quote\nBody');
  expect(plainTextFromHTML('<table><tr><th>H</th><td>C</td></tr></table>')).toBe('H\nC');
});

it('plainTextFromHTML emits one line per list item', () => {
  expect(plainTextFromHTML('<ul><li>a</li><li>b</li></ul>')).toBe('a\nb');
  expect(plainTextFromHTML('<ol><li>a</li><li>b</li></ol>')).toBe('a\nb');
});

it('plainTextFromHTML strips inline markup inside blocks', () => {
  expect(plainTextFromHTML('<p><strong>bold</strong> and <em>italic</em></p>')).toBe('bold and italic');
});

it('plainTextFromHTML falls back to body.textContent when no block tags present', () => {
  expect(plainTextFromHTML('plain text')).toBe('plain text');
});

it('plainTextFromHTML does not double-count table cells that wrap a paragraph', () => {
  expect(plainTextFromHTML('<table><tr><td><p>a</p></td><td><p>b</p></td></tr></table>')).toBe('a\nb');
});

it('plainTextFromHTML keeps paragraph boundaries inside a blockquote', () => {
  expect(plainTextFromHTML('<blockquote><p>a</p><p>b</p></blockquote>')).toBe('a\nb');
});

it('plainTextFromHTML keeps direct table-cell text when there is no nested block', () => {
  expect(plainTextFromHTML('<table><tr><th>H</th><td>C</td></tr></table>')).toBe('H\nC');
});
