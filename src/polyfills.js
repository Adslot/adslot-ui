// jsdom polyfills @lexical/* needs. Skipped outside a DOM environment (SSR / non-browser bundlers).

if (
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined' &&
  typeof globalThis.Event !== 'undefined'
) {
  if (typeof globalThis.DragEvent === 'undefined') {
    globalThis.DragEvent = class DragEvent extends Event {};
  }
  if (typeof globalThis.ClipboardEvent === 'undefined') {
    globalThis.ClipboardEvent = class ClipboardEvent extends Event {};
  }
  if (typeof globalThis.Range !== 'undefined') {
    if (typeof Range.prototype.getBoundingClientRect !== 'function') {
      Range.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });
    }
    if (typeof Range.prototype.getClientRects !== 'function') {
      Range.prototype.getClientRects = () => ({ length: 0, item: () => null, [Symbol.iterator]: function* () {} });
    }
  }
}
