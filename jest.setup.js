import '@testing-library/jest-dom/extend-expect';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
