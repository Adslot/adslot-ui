import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console'; // https://github.com/jestjs/jest/issues/14352

// for slick-carousel, date picker
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// for RichTextEditor
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: jest.fn(),
});

// for Paragraph
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: class ResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  },
});

// for cropperjs
beforeEach(() => {
  jest.spyOn(XMLHttpRequest.prototype, 'open').mockReturnValue();
  jest.spyOn(XMLHttpRequest.prototype, 'send').mockReturnValue();
});

failOnConsole();
