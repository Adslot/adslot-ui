import React from 'react';
import { render, screen, user } from 'testing';
import HelpIconPopover from '.';

describe('<HelpIconPopover />', () => {
  it('should render with defaults', async () => {
    render(<HelpIconPopover id="tired-help">Have some coffee.</HelpIconPopover>);
    expect(screen.getByTestId('help-icon-popover-wrapper')).toHaveAttribute('data-test-selector', 'tired-help');
    expect(screen.getByTestId('popover-element')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

    await user.hover(screen.getByTestId('help-icon-popover-trigger'));
    expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('popover-content')).toHaveTextContent('Have some coffee.');
  });

  it('should allow custom placement positions', async () => {
    render(
      <HelpIconPopover id="tired-help" placement="bottom">
        Have some coffee.
      </HelpIconPopover>
    );

    await user.hover(screen.getByTestId('help-icon-popover-trigger'));
    expect(screen.getByTestId('popover-wrapper')).toHaveAttribute('placement', 'bottom');
  });
});
