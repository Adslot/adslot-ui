import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import HelpIconPopover from '.';

afterEach(cleanup);

describe('<HelpIconPopover />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(
      <HelpIconPopover id="tired-help">Have some coffee.</HelpIconPopover>
    );
    expect(getByTestId('help-icon-popover-wrapper')).toHaveAttribute('data-test-selector', 'tired-help');
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

    fireEvent.mouseEnter(getByTestId('help-icon-popover-trigger'));
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
    expect(getByTestId('popover-content')).toHaveTextContent('Have some coffee.');
  });

  it('should allow custom placement positions', () => {
    const { getByTestId } = render(
      <HelpIconPopover id="tired-help" placement="bottom">
        Have some coffee.
      </HelpIconPopover>
    );
    fireEvent.mouseEnter(getByTestId('help-icon-popover-trigger'));
    expect(getByTestId('popover-wrapper')).toHaveAttribute('placement', 'bottom');
  });
});
