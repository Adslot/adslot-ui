import './polyfills';

it('shims DragEvent under jsdom', () => {
  expect(typeof globalThis.DragEvent).toBe('function');
  expect(new globalThis.DragEvent('drag')).toBeInstanceOf(Event);
});

it('shims ClipboardEvent under jsdom', () => {
  expect(typeof globalThis.ClipboardEvent).toBe('function');
  expect(new globalThis.ClipboardEvent('paste')).toBeInstanceOf(Event);
});

it('provides Range.prototype.getBoundingClientRect returning a zero rect', () => {
  const range = document.createRange();
  const rect = range.getBoundingClientRect();
  expect(rect).toEqual({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: expect.any(Function),
  });
  expect(rect.toJSON()).toEqual({});
});

it('provides Range.prototype.getClientRects returning an empty list', () => {
  const range = document.createRange();
  const rects = range.getClientRects();
  expect(rects.length).toBe(0);
  expect(Array.from(rects)).toEqual([]);
});
