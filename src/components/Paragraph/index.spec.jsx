import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Paragraph from '.';

afterEach(cleanup);

describe('<Paragraph />', () => {
  const plainText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

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
    const { getByTestId, queryAllByTestId } = render(<Paragraph content={plainText} briefWordCount={15} />);
    expect(queryAllByTestId('paragraph-wrapper')).toHaveLength(1);
    expect(getByTestId('paragraph-brief')).toHaveTextContent('Lorem ipsum...');

    expect(queryAllByTestId('paragraph-expandable-content')).toHaveLength(1);
    expect(queryAllByTestId('paragraph-read-more-button')).toHaveLength(1);
  });

  it('should render with isHtml', () => {
    const { getByTestId, queryAllByTestId } = render(<Paragraph content={htmlText} briefWordCount={15} isHtml />);
    expect(queryAllByTestId('paragraph-wrapper')).toHaveLength(1);
    expect(getByTestId('paragraph-brief')).toHaveTextContent('Lorem ipsum...');

    expect(queryAllByTestId('paragraph-expandable-content')).toHaveLength(1);
    expect(queryAllByTestId('paragraph-read-more-button')).toHaveLength(1);
  });

  it('should be able to click read more button to expand paragraph', () => {
    const { getByTestId, queryAllByTestId } = render(<Paragraph content={htmlText} briefWordCount={15} isHtml />);
    expect(queryAllByTestId('paragraph-wrapper')).toHaveLength(1);

    expect(queryAllByTestId('paragraph-brief')).toHaveLength(1);
    expect(queryAllByTestId('paragraph-expandable-content')).toHaveLength(1);
    expect(getByTestId('paragraph-expandable-content')).toHaveClass('expandable-content collapsed');

    expect(queryAllByTestId('paragraph-read-more-button')).toHaveLength(1);
    fireEvent.click(getByTestId('paragraph-read-more-button'));

    expect(queryAllByTestId('paragraph-brief')).toHaveLength(0);
    expect(queryAllByTestId('paragraph-expandable-content')).toHaveLength(1);
    expect(getByTestId('paragraph-expandable-content')).toHaveClass('expandable-content expanded');
  });
});
