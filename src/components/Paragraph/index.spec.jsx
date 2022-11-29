import React from 'react';
import { render, screen, user } from 'testing';
import Paragraph from '.';

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
    render(<Paragraph content={plainText} briefWordCount={15} />);
    expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-brief')).toHaveTextContent('Lorem ipsum...');

    expect(screen.getByTestId('paragraph-expandable-content')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-read-more-button')).toBeInTheDocument();
  });

  it('should render with isHtml', () => {
    render(<Paragraph content={htmlText} briefWordCount={15} isHtml />);
    expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-brief')).toHaveTextContent('Lorem ipsum...');

    expect(screen.getByTestId('paragraph-expandable-content')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-read-more-button')).toBeInTheDocument();
  });

  it('should be able to click read more button to expand paragraph', async () => {
    render(<Paragraph content={htmlText} briefWordCount={15} isHtml />);

    expect(screen.getByTestId('paragraph-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-brief')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-expandable-content')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-expandable-content')).toHaveClass('expandable-content collapsed');
    expect(screen.getByTestId('paragraph-read-more-button')).toBeInTheDocument();

    await user.click(screen.getByTestId('paragraph-read-more-button'));
    expect(screen.queryByTestId('paragraph-brief')).not.toBeInTheDocument();
    expect(screen.getByTestId('paragraph-expandable-content')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-expandable-content')).toHaveClass('expandable-content expanded');
  });
});
