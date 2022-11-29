import React from 'react';
import { render, screen } from 'testing';
import PrettyDiff from '.';

describe('<PrettyDiff />', () => {
  const diffStrings = ['<the quick fox>', '<the slow fox jumped>'];

  it('should render with spans having different classes', () => {
    render(<PrettyDiff newText={diffStrings[1]} oldText={diffStrings[0]} />);
    expect(screen.getByTestId('pretty-diff-wrapper')).toHaveClass('pretty-diff-component');

    expect(screen.queryAllByTestId('pretty-diff-component-equal')).toHaveLength(3);

    screen
      .queryAllByTestId('pretty-diff-component-equal')
      .forEach((span) => expect(span).toHaveClass('pretty-diff-component-equal'));
    expect(screen.queryAllByTestId('pretty-diff-component-equal')[0]).toHaveTextContent('<the ', {
      normalizeSpaces: false,
    });
    expect(screen.queryAllByTestId('pretty-diff-component-equal')[1]).toHaveTextContent(' fox', {
      normalizeSpaces: false,
    });
    expect(screen.queryAllByTestId('pretty-diff-component-equal')[2]).toHaveTextContent('>');

    expect(screen.getByTestId('pretty-diff-component-delete')).toBeInTheDocument();
    expect(screen.queryAllByTestId('pretty-diff-component-delete')[0]).toHaveClass('pretty-diff-component-delete');
    expect(screen.queryAllByTestId('pretty-diff-component-delete')[0]).toHaveTextContent('quick');

    expect(screen.queryAllByTestId('pretty-diff-component-insert')).toHaveLength(2);
    expect(screen.queryAllByTestId('pretty-diff-component-insert')[0]).toHaveClass('pretty-diff-component-insert');
    screen
      .queryAllByTestId('pretty-diff-component-insert')
      .forEach((span) => expect(span).toHaveClass('pretty-diff-component-insert'));
    expect(screen.queryAllByTestId('pretty-diff-component-insert')[0]).toHaveTextContent('slow');
    expect(screen.queryAllByTestId('pretty-diff-component-insert')[1]).toHaveTextContent(' jumped', {
      normalizeSpaces: false,
    });
  });
});
