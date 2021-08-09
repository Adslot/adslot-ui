import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PrettyDiff from '.';

afterEach(cleanup);

describe('<PrettyDiff />', () => {
  const diffStrings = ['<the quick fox>', '<the slow fox jumped>'];

  it('should render with spans having different classes', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <PrettyDiff newText={diffStrings[1]} oldText={diffStrings[0]} />
    );
    expect(getByTestId('pretty-diff-wrapper')).toHaveClass('pretty-diff-component');

    expect(queryAllByTestId('pretty-diff-component-equal')).toHaveLength(3);

    queryAllByTestId('pretty-diff-component-equal').forEach(span =>
      expect(span).toHaveClass('pretty-diff-component-equal')
    );
    expect(queryAllByTestId('pretty-diff-component-equal')[0]).toHaveTextContent('<the ', { normalizeSpaces: false });
    expect(queryAllByTestId('pretty-diff-component-equal')[1]).toHaveTextContent(' fox', { normalizeSpaces: false });
    expect(queryAllByTestId('pretty-diff-component-equal')[2]).toHaveTextContent('>');

    expect(queryByTestId('pretty-diff-component-delete')).toBeInTheDocument();
    expect(queryAllByTestId('pretty-diff-component-delete')[0]).toHaveClass('pretty-diff-component-delete');
    expect(queryAllByTestId('pretty-diff-component-delete')[0]).toHaveTextContent('quick');

    expect(queryAllByTestId('pretty-diff-component-insert')).toHaveLength(2);
    expect(queryAllByTestId('pretty-diff-component-insert')[0]).toHaveClass('pretty-diff-component-insert');
    queryAllByTestId('pretty-diff-component-insert').forEach(span =>
      expect(span).toHaveClass('pretty-diff-component-insert')
    );
    expect(queryAllByTestId('pretty-diff-component-insert')[0]).toHaveTextContent('slow');
    expect(queryAllByTestId('pretty-diff-component-insert')[1]).toHaveTextContent(' jumped', {
      normalizeSpaces: false,
    });
  });
});
