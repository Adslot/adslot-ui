import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SplitPane from '.';

afterEach(cleanup);

describe('<SplitPane />', () => {
  it('should have its component name as default className and no data-test-selector', () => {
    const { getByTestId } = render(<SplitPane />);
    expect(getByTestId('split-panel-wrapper')).toHaveClass('splitpane-component');
    expect(getByTestId('split-panel-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should have its component name as default className with additional classes', () => {
    const splitPaneClass = ['background-highlighted', 'test-class'];
    const { getByTestId } = render(<SplitPane additionalClassNames={splitPaneClass} />);
    expect(getByTestId('split-panel-wrapper')).toHaveClass('splitpane-component background-highlighted test-class');
    expect(getByTestId('split-panel-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should transclude children', () => {
    const { getByTestId } = render(
      <SplitPane>
        <div />
      </SplitPane>
    );
    expect(getByTestId('split-panel-wrapper')).toHaveClass('splitpane-component');
    expect(getByTestId('split-panel-wrapper').firstChild).toMatchInlineSnapshot(`<div />`);
  });

  it('should set data-test-selector', () => {
    const { getByTestId } = render(<SplitPane dts="please-select-me" />);
    expect(getByTestId('split-panel-wrapper')).toHaveAttribute('data-test-selector', 'please-select-me');
  });
});
