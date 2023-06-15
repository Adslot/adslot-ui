import React from 'react';
import { screen, render, fireEvent, act } from 'testing';
import Paragraph from '.';

beforeEach(() => {
  jest.useFakeTimers();
});

let resizeListener;

beforeEach(() => {
  global.ResizeObserver = class ResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    constructor(ls) {
      resizeListener = ls;
    }
  };
});

const plainText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

const htmlText = `
    <details>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </details>
  `;

it('should render with plain content', () => {
  render(<Paragraph children={plainText} />);
  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent(plainText);

  expect(screen.getByTestId('paragraph-read-more-button')).toBeInTheDocument();
});

it('should not have read more button if hideReadMore is true', () => {
  render(
    <Paragraph hideReadMore>
      <Paragraph.HTML briefCharCount={11} content={plainText} />
    </Paragraph>
  );
  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent('Lorem ipsum...');

  expect(screen.queryByTestId('paragraph-read-more-button')).not.toBeInTheDocument();
});

it('should not have read more button if text is less than briefCharCount', () => {
  render(
    <Paragraph>
      <Paragraph.HTML briefCharCount={500} content={plainText} />
    </Paragraph>
  );

  act(() => {
    resizeListener([
      {
        contentRect: {
          height: 200,
        },
      },
    ]);
    jest.runAllTimers();
  });

  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent(plainText);

  expect(screen.queryByTestId('paragraph-read-more-button')).not.toBeInTheDocument();
});

it("should not show ellipsis if briefCharCount isn't reached", () => {
  render(
    <Paragraph children={'Lorem ipsum'}>
      <Paragraph.HTML briefCharCount={11} content={plainText} />
    </Paragraph>
  );
  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent('Lorem ipsum');
});

it('should be able to customize the truncate string', () => {
  render(
    <Paragraph children={'Lorem ipsum Dolor'}>
      <Paragraph.HTML briefCharCount={11} truncateString=" [...]" content={plainText} />
    </Paragraph>
  );
  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent('Lorem ipsum [...]');
});

it('should not exceed briefMaxHeight', () => {
  render(
    <Paragraph briefMaxHeight={50}>
      <Paragraph.HTML
        briefCharCount={100}
        content={`<p>Lorum<p/><p>Lorum<p/><p>Lorum</p><p> <p/><p> <p/><p> <p/><p>Lorum</p>`}
      />
    </Paragraph>
  );

  act(() => {
    resizeListener([
      {
        contentRect: {
          height: 100,
        },
      },
    ]);
    jest.runAllTimers();
  });

  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('expandable-content')).toHaveStyle(`height: 50px`);
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent(`Lorum Lorum`);
  expect(screen.getByTestId('expandable-content')).toHaveClass('paragraph-fade-bottom');
});

it('should allow no briefMaxHeight', () => {
  render(
    <Paragraph briefMaxHeight={null}>
      <Paragraph.HTML
        briefCharCount={100}
        content={`<p>Lorum<p/><p>Lorum<p/><p>Lorum</p><p> <p/><p> <p/><p> <p/><p>Lorum</p>`}
      />
    </Paragraph>
  );

  act(() => {
    resizeListener([
      {
        contentRect: {
          height: 100,
        },
      },
    ]);
    jest.runAllTimers();
  });

  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();

  expect(screen.getByTestId('expandable-content')).toHaveStyle(`height: 100px`);
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent(`Lorum Lorum`);
});

it('should render expected heights', async () => {
  render(<Paragraph children={plainText} />);

  act(() => {
    resizeListener([
      {
        contentRect: {
          height: 50,
        },
      },
    ]);
    jest.runAllTimers();
  });

  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('expandable-content')).toHaveStyle(`height: 50px`);

  fireEvent.click(screen.getByTestId('paragraph-read-more-button'));
  act(() => {
    resizeListener([
      {
        contentRect: {
          height: 200,
        },
      },
    ]);
    jest.runAllTimers();
  });
  expect(screen.getByTestId('expandable-content')).toHaveStyle(`height: 200px`);
});

it('should be able to click read more button to expand paragraph', async () => {
  render(
    <Paragraph>
      <Paragraph.HTML briefCharCount={11} content={htmlText} />
    </Paragraph>
  );
  expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();

  expect(screen.getByTestId('paragraph-content')).toBeInTheDocument();

  expect(screen.getByTestId('paragraph-read-more-button')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('paragraph-read-more-button'));

  expect(screen.getByTestId('paragraph-content')).toHaveTextContent(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );
  fireEvent.click(screen.getByTestId('paragraph-read-more-button'));
  expect(screen.getByTestId('paragraph-content')).toHaveTextContent(`Lorem ipsum...`);
});

it('should be usable without ReadMore', () => {
  render(<Paragraph.HTML truncated briefCharCount={20} content={plainText} />);
  expect(screen.getByTestId('paragraph-html-content')).toHaveTextContent(`Lorem ipsum dolor si...`);
  expect(screen.queryByTestId('paragraph-read-more-button')).not.toBeInTheDocument();
});
