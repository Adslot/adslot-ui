import React from 'react';
import { render, screen } from 'testing';
import SplitPane from '.';

describe('<SplitPane />', () => {
  it('should have its component name as default className and no data-test-selector', () => {
    render(<SplitPane />);
    expect(screen.getByTestId('split-panel-wrapper')).toHaveClass('splitpane-component');
    expect(screen.getByTestId('split-panel-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should have its component name as default className with additional classes', () => {
    const splitPaneClass = ['background-highlighted', 'test-class'];
    render(<SplitPane additionalClassNames={splitPaneClass} />);
    expect(screen.getByTestId('split-panel-wrapper')).toHaveClass(
      'splitpane-component background-highlighted test-class'
    );
    expect(screen.getByTestId('split-panel-wrapper')).not.toHaveAttribute('data-test-selector');
  });

  it('should transclude children', () => {
    render(
      <SplitPane>
        <div />
      </SplitPane>
    );
    expect(screen.getByTestId('split-panel-wrapper')).toHaveClass('splitpane-component');
    expect(screen.getByTestId('split-panel-wrapper').firstChild).toMatchInlineSnapshot(`<div />`);
  });

  it('should set data-test-selector', () => {
    render(<SplitPane dts="please-select-me" />);
    expect(screen.getByTestId('split-panel-wrapper')).toHaveAttribute('data-test-selector', 'please-select-me');
  });
});
