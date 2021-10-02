import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import HelpIconPopover from '.';

afterEach(cleanup);

describe('<HelpIconPopover />', () => {
  it('should render with defaults', async () => {
    const { getByTestId, queryByTestId } = render(<HelpIconPopover id="tired-help">Have some coffee.</HelpIconPopover>);
    expect(getByTestId('help-icon-popover-wrapper')).toHaveAttribute('data-test-selector', 'tired-help');
    expect(queryByTestId('popover-element')).toBeInTheDocument();
    expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.mouseEnter(getByTestId('help-icon-popover-trigger'));
    });

    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
    expect(getByTestId('popover-content')).toHaveTextContent('Have some coffee.');
  });

  it('should allow custom placement positions', async () => {
    const { getByTestId } = render(
      <HelpIconPopover id="tired-help" placement="bottom">
        Have some coffee.
      </HelpIconPopover>
    );

    await act(async () => {
      await fireEvent.mouseEnter(getByTestId('help-icon-popover-trigger'));
    });

    expect(getByTestId('popover-wrapper')).toHaveAttribute('placement', 'bottom');
  });
});
