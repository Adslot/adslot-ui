import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import HelpIconPopover from '.';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
afterEach(cleanup);

describe('<HelpIconPopover />', () => {
  it('should render with defaults', () => {
    console.error = jest.fn();
    const { getByTestId, queryAllByTestId } = render(
      <HelpIconPopover id="tired-help">Have some coffee.</HelpIconPopover>
    );
    expect(getByTestId('help-icon-popover-wrapper')).toHaveAttribute('data-test-selector', 'tired-help');
    expect(queryAllByTestId('popover-element')).toHaveLength(1);
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

    act(() => {
      fireEvent.mouseEnter(getByTestId('help-icon-popover-trigger'));
      jest.runAllTimers();
    });

    expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
    expect(getByTestId('popover-content')).toHaveTextContent('Have some coffee.');
  });

  it('should allow custom placement positions', () => {
    console.error = jest.fn();
    const { getByTestId } = render(
      <HelpIconPopover id="tired-help" placement="bottom">
        Have some coffee.
      </HelpIconPopover>
    );

    act(() => {
      fireEvent.mouseEnter(getByTestId('help-icon-popover-trigger'));
      jest.runAllTimers();
    });

    expect(getByTestId('popover-wrapper')).toHaveAttribute('placement', 'bottom');
  });
});
