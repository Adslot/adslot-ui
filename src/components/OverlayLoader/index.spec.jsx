import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import OverlayLoader from '.';

afterEach(cleanup);

describe('<OverlayLoader />', () => {
  it('should render Overlay Loader', () => {
    const { getByTestId, queryByTestId } = render(<OverlayLoader text="foo" />);
    expect(getByTestId('overlay-loader-wrapper')).toHaveClass('aui--overlay-loader');
    expect(queryByTestId('overlay-loader-wrapper')).toBeInTheDocument();

    expect(getByTestId('overlay-loader-heading')).toHaveClass('loader-heading');
    expect(getByTestId('overlay-loader-heading')).toHaveTextContent('Loading');
  });

  it('should stop event propogation when disabled background', () => {
    const onClick = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <div data-testid="overlay-loader-test-wrapper" onClick={() => onClick} className="my-div">
        <OverlayLoader text="foo" disableBackground />
      </div>
    );
    expect(queryByTestId('overlay-loader-wrapper')).toBeInTheDocument();
    expect(getByTestId('overlay-loader-heading')).toHaveClass('loader-heading');
    expect(getByTestId('overlay-loader-heading')).toHaveTextContent('Loading');

    fireEvent.click(getByTestId('overlay-loader-test-wrapper'));
    fireEvent.click(getByTestId('overlay-loader-wrapper'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
