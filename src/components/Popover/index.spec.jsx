import React from 'react';
import { render, screen, waitFor, user } from 'testing';
import Popover from '.';
import { renderArrowStyles } from './Popper';

describe('<Popover />', () => {
  describe('onClick()', () => {
    it('should trigger popover open', async () => {
      render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['click']}>
          Test message
        </Popover>
      );
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();

      await user.click(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('onMouseOver() and onMouseOut()', () => {
    it('should trigger popover open or close', async () => {
      render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="hover">
          Test message
        </Popover>
      );

      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.hover(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();

      await user.unhover(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('onFocus() and onBlur()', () => {
    it('should trigger popover open or close', async () => {
      render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['focus']}>
          Test message
        </Popover>
      );

      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await waitFor(() => {
        screen.getByTestId('popover-element').focus();
        expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();
      });
      expect(screen.getByTestId('popover-element')).toHaveFocus();

      await waitFor(() => {
        screen.getByTestId('popover-element').blur();
        expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
      expect(screen.getByTestId('popover-element')).not.toHaveFocus();
    });
  });

  it('should render without error', async () => {
    render(
      <Popover className="test-class" popoverContent={<div />} title="Some title" isOpen>
        <label className="message">Test message</label>
      </Popover>
    );

    const wrapper = await screen.findByTestId('popover-wrapper');
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument();
    });
    expect(screen.getByTestId('popover-element')).toBeInTheDocument(); //Manager
    expect(screen.getByTestId('popover-element')).toHaveTextContent('Test message');
    expect(screen.getByTestId('popover-wrapper')).toHaveTextContent('Some title'); //Popper
  });

  it('should be able to set theme', async () => {
    const view = render(
      <div>
        <Popover popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    const wrapper = await screen.findByTestId('popover-wrapper');
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument();
    });

    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-light');

    view.rerender(
      <div>
        <Popover id="popover-example" theme="dark" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-light');
    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-dark');

    view.rerender(
      <div>
        <Popover id="popover-example" theme="warn" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-dark');
    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-warn');

    view.rerender(
      <div>
        <Popover id="popover-example" theme="error" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-warn');
    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-error');

    view.rerender(
      <div>
        <Popover id="popover-example" theme="info" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-error');
    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-info');

    view.rerender(
      <div>
        <Popover id="popover-example" theme="success" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-info');
    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-success');
  });

  it('should default to light theme on invalid theme prop', async () => {
    render(
      <div>
        <Popover id="popover-example" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    const wrapper = await screen.findByTestId('popover-wrapper');
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument();
    });

    expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-some-random-theme');
    expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-light');
  });

  it('should render popover when content is function', async () => {
    render(
      <div>
        <Popover
          id="popover-example"
          popoverContent={() => <div data-testid="popover-test-content">test</div>}
          placement="bottom-end"
          isOpen
        >
          Test message
        </Popover>
      </div>
    );
    const wrapper = await screen.findByTestId('popover-wrapper');
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument();
    });
    expect(screen.getByTestId('popover-test-content')).toHaveTextContent('test');
  });

  it('should set up modifiers for a popover', async () => {
    render(
      <div>
        <Popover
          id="popover-example"
          popoverContent={() => <div data-testid="popover-test-content">test</div>}
          placement="bottom"
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
            {
              name: 'flip',
              options: {
                altBoundary: false,
              },
            },
          ]}
          isOpen
        >
          Test message
        </Popover>
      </div>
    );
    const wrapper = await screen.findByTestId('popover-wrapper');
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument();
    });
    expect(screen.getByTestId('popover-test-content')).toHaveTextContent('test');
  });

  describe('triggers', () => {
    it('should register event handlers for multiple triggers', async () => {
      render(
        <Popover
          id="popover-example"
          popoverContent={() => <div>test</div>}
          placement="bottom-end"
          triggers={['hover', 'click']}
        >
          Test message
        </Popover>
      );
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.hover(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();

      await user.click(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();
    });

    it('should not include any event handler if trigger is disabled', async () => {
      render(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="disabled">
          Test message
        </Popover>
      );
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.hover(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('popover-element'));
      expect(screen.getByTestId('popover-element')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('<Popover.WithRef />', () => {
    let virtualReferenceElement;

    beforeEach(() => {
      virtualReferenceElement = document.createElement('div');
      virtualReferenceElement.style.height = '100px';
      virtualReferenceElement.style.width = '100px';
      virtualReferenceElement.setAttribute('data-testid', 'target');
      document.body.appendChild(virtualReferenceElement);
    });

    afterEach(() => {
      document.body.removeChild(virtualReferenceElement);
    });

    it('should render without error', async () => {
      render(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />);
      const wrapper = await screen.findByTestId('popover-wrapper');
      await waitFor(() => {
        expect(wrapper).toBeInTheDocument();
      });
    });

    it('should not render if isOpen is false', () => {
      render(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} />);
      expect(screen.queryByTestId('popover-element')).not.toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    it('should render with default props', async () => {
      render(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />);
      const wrapper = await screen.findByTestId('popover-wrapper');
      await waitFor(() => {
        expect(wrapper).toBeInTheDocument();
      });
      expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-light');
      expect(screen.getByTestId('popover-wrapper')).toHaveStyle('position: absolute; top: 0px; left: 0px;');
    });

    it('should render with given props', async () => {
      const arrowStyles = {
        color: 'red',
      };
      const wrapperStyles = {
        color: 'red',
      };

      render(
        <Popover.WithRef
          dts="popover-example"
          title="Big Bang"
          theme="dark"
          popoverClassNames="extra-class"
          popoverContent={<div />}
          refElement={virtualReferenceElement}
          arrowStyles={arrowStyles}
          wrapperStyles={wrapperStyles}
          placement="bottom-end"
          isOpen
        />
      );
      const wrapper = await screen.findByTestId('popover-wrapper');
      await waitFor(() => {
        expect(wrapper).toBeInTheDocument();
      });

      expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-dark');
      expect(screen.getByTestId('popover-wrapper')).toHaveClass('extra-class');
      expect(screen.getByTestId('popover-wrapper')).toHaveAttribute('data-test-selector', 'popover-example');
      expect(screen.getByTestId('popover-title')).toHaveTextContent('Big Bang');
      expect(screen.getByTestId('popover-arrow')).toHaveStyle('color: red;');
      expect(screen.getByTestId('popover-wrapper')).toHaveStyle('position: absolute; top: 0px; left: 0px; color: red;');
    });

    it('should default to light theme prop', async () => {
      render(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />);
      const wrapper = await screen.findByTestId('popover-wrapper');
      await waitFor(() => {
        expect(wrapper).toBeInTheDocument();
      });

      expect(screen.getByTestId('popover-wrapper')).not.toHaveClass('popover-some-random-theme');
      expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-light');
    });

    it('should render popover when content is function', async () => {
      render(<Popover.WithRef popoverContent={() => <div>test</div>} refElement={virtualReferenceElement} isOpen />);
      const wrapper = await screen.findByTestId('popover-wrapper');
      await waitFor(() => {
        expect(wrapper).toBeInTheDocument();
      });
      expect(screen.getByTestId('popover-content')).toHaveTextContent('test');
    });

    it('should call getContainer to get boundary element if it is provided', async () => {
      const getContainer = jest.fn(() => document.body);
      render(
        <Popover.WithRef
          popoverContent={<div />}
          getContainer={getContainer}
          refElement={virtualReferenceElement}
          isOpen
        />
      );
      const wrapper = await screen.findByTestId('popover-wrapper');
      await waitFor(() => {
        expect(wrapper).toBeInTheDocument();
      });

      expect(getContainer).toHaveBeenCalledTimes(1);
    });
  });

  describe('<Popper />', () => {
    describe('renderArrowStyles()', () => {
      const defaultArrowStyles = { color: 'red' };
      let anchorEl;

      beforeEach(() => {
        anchorEl = document.createElement('div');
        Object.defineProperty(anchorEl, 'clientWidth', { configurable: true, value: 100 });
        Object.defineProperty(anchorEl, 'clientHeight', { configurable: true, value: 100 });
        document.body.appendChild(anchorEl);
      });

      afterEach(() => {
        document.body.removeChild(anchorEl);
      });

      it('should add styles for `bottom-start` and `top-start` placements', () => {
        expect(renderArrowStyles('bottom-start', defaultArrowStyles, anchorEl)).toEqual({
          left: 12,
          ...defaultArrowStyles,
        });
        expect(renderArrowStyles('top-start', defaultArrowStyles, anchorEl)).toEqual({
          left: 12,
          ...defaultArrowStyles,
        });
      });

      it('should add styles for `bottom-end` and `top-end` placements', () => {
        expect(renderArrowStyles('bottom-end', defaultArrowStyles, anchorEl)).toEqual({
          left: 'auto',
          right: 12,
          ...defaultArrowStyles,
        });
        expect(renderArrowStyles('top-end', defaultArrowStyles, anchorEl)).toEqual({
          left: 'auto',
          right: 12,
          ...defaultArrowStyles,
        });
      });

      it('should add styles for `left-start` and `right-start` placements', () => {
        expect(renderArrowStyles('left-start', defaultArrowStyles, anchorEl)).toEqual({
          top: 12,
          ...defaultArrowStyles,
        });
        expect(renderArrowStyles('right-start', defaultArrowStyles, anchorEl)).toEqual({
          top: 12,
          ...defaultArrowStyles,
        });

        // do nothing if container does not exist
        expect(renderArrowStyles('left-start', defaultArrowStyles)).toEqual(defaultArrowStyles);
      });

      it('should add styles for `left-end` and `right-end` placements', () => {
        expect(renderArrowStyles('left-end', defaultArrowStyles, anchorEl)).toEqual({
          top: 'auto',
          bottom: 12,
          ...defaultArrowStyles,
        });
        expect(renderArrowStyles('right-end', defaultArrowStyles, anchorEl)).toEqual({
          top: 'auto',
          bottom: 12,
          ...defaultArrowStyles,
        });

        // do nothing if container does not exist
        expect(renderArrowStyles('left-end', defaultArrowStyles)).toEqual(defaultArrowStyles);
      });
    });
  });
});
