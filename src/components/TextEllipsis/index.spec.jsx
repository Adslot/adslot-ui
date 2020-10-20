import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TextEllipsis from '.';

afterEach(cleanup);

describe('<TextEllipsis />', () => {
  let divContainer = null;

  beforeEach(() => {
    divContainer = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(divContainer);
  });

  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<TextEllipsis>Sample text</TextEllipsis>);
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(getByTestId('popover-element')).toHaveClass('aui--text-ellipsis-wrapper');

    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);
    expect(getByTestId('text-ellipsis')).toHaveClass('text-ellipsis-component');
    expect(getByTestId('text-ellipsis')).toHaveTextContent('Sample text');
  });

  it('should render with no popover when text length is less than max length', () => {
    // This getter does not exist on the HTMLElement.prototype in JSDOM, so we
    // must mock it on the global.
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        get: () => 50,
        configurable: true,
      },
      scrollWidth: {
        get: () => 100,
        configurable: true,
      },
    });
    const { queryAllByTestId } = render(<TextEllipsis>this is a test</TextEllipsis>, {
      container: divContainer,
    });

    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
  });

  it('should render with popover when text length is more than max length', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        get: () => 50,
        configurable: true,
      },
      scrollWidth: {
        get: () => 20,
        configurable: true,
      },
    });

    const { queryAllByTestId } = render(<TextEllipsis>this is a test</TextEllipsis>, {
      container: divContainer,
    });

    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);
  });

  it('should generate popover if text changes from short to long', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        get: () => 50,
        configurable: true,
      },
      scrollWidth: {
        get: () => 20,
        configurable: true,
      },
    });

    const { queryAllByTestId, rerender } = render(<TextEllipsis>x</TextEllipsis>, {
      container: divContainer,
    });
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);

    Object.defineProperty(divContainer, 'scrollWidth', { configurable: true, get: () => 100 });
    rerender(<TextEllipsis>long text: The quick brown fox jumps over the lazy dog</TextEllipsis>, {
      container: divContainer,
    });
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);
  });

  it('should remove popover if text changes from long to short', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        get: () => 50,
        configurable: true,
      },
      scrollWidth: {
        get: () => 100,
        configurable: true,
      },
    });

    const { queryAllByTestId, rerender } = render(
      <TextEllipsis>long text: The quick brown fox jumps over the lazy dog</TextEllipsis>,
      {
        container: divContainer,
      }
    );
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);

    Object.defineProperty(divContainer, 'scrollWidth', { configurable: true, get: () => 20 });
    rerender(<TextEllipsis>x</TextEllipsis>, {
      container: divContainer,
    });
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('text-ellipsis')).toHaveLength(1);
  });

  describe('should also work on complex children', () => {
    it('when size is small', () => {
      Object.defineProperties(window.HTMLElement.prototype, {
        clientWidth: {
          get: () => 2000,
          configurable: true,
        },
      });
      render(
        <TextEllipsis>
          this is a text
          <span>this is another text</span>
        </TextEllipsis>,
        { container: divContainer }
      );
    });

    it('when size is big', () => {
      Object.defineProperties(window.HTMLElement.prototype, {
        clientWidth: {
          get: () => 20,
          configurable: true,
        },
      });
      render(
        <TextEllipsis>
          this is a text
          <span>this is another text</span>
        </TextEllipsis>,
        { container: divContainer }
      );
    });
  });
});
