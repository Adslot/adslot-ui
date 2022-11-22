import '@testing-library/jest-dom';

// for slick-carousel
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

// for RichTextEditor
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn().mockReturnValue(),
});

// for RichTextEditor
HTMLElement.prototype.scrollIntoView = jest.fn();

// for Cropper.js
beforeEach(() => {
  jest.spyOn(XMLHttpRequest.prototype, 'open').mockReturnValue();
  jest.spyOn(XMLHttpRequest.prototype, 'send').mockReturnValue();
});

// auto mock invariant to avoid console error
jest.mock('../src/lib/utils', () => {
  const originalModule = jest.requireActual('../src/lib/utils');

  return {
    __esModule: true,
    ...originalModule,
    invariant: jest.fn(),
  };
});
