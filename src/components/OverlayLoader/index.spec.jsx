import React from 'react';
import { render, screen, user } from 'testing';
import OverlayLoader from '.';

describe('<OverlayLoader />', () => {
  it('should render Overlay Loader', () => {
    render(<OverlayLoader text="foo" />);
    expect(screen.getByTestId('overlay-loader-wrapper')).toHaveClass('aui--overlay-loader');
    expect(screen.getByTestId('overlay-loader-wrapper')).toBeInTheDocument();

    expect(screen.getByTestId('overlay-loader-heading')).toHaveClass('loader-heading');
    expect(screen.getByTestId('overlay-loader-heading')).toHaveTextContent('Loading');
  });

  it('should stop event propogation when disabled background', async () => {
    const onClick = jest.fn();
    render(
      <div data-testid="overlay-loader-test-wrapper" onClick={() => onClick} className="my-div">
        <OverlayLoader text="foo" disableBackground />
      </div>
    );
    expect(screen.getByTestId('overlay-loader-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('overlay-loader-heading')).toHaveClass('loader-heading');
    expect(screen.getByTestId('overlay-loader-heading')).toHaveTextContent('Loading');

    await user.click(screen.getByTestId('overlay-loader-test-wrapper'));
    await user.click(screen.getByTestId('overlay-loader-wrapper'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
