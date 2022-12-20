import React from 'react';
import { render, cleanup, fireEvent, act, createEvent } from '@testing-library/react';
import Popover from '.';
import { renderArrowStyles } from './Popper';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
  jest.useRealTimers();
});

afterEach(cleanup);

describe('<Popover />', () => {
  describe('onClick()', () => {
    it('should trigger popover open', () => {
      const { getByTestId, queryByTestId } = render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['click']}>
          Test message
        </Popover>
      );
      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      act(() => {
        fireEvent.click(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.click(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  describe('onPointerOver() and onPointerLeave()', () => {
    it('should trigger popover open or close', () => {
      const { getByTestId, queryByTestId } = render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="hover">
          Test message
        </Popover>
      );

      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      act(() => {
        fireEvent.pointerOver(getByTestId('popover-element'));
        jest.runAllTimers();
        fireEvent.pointerOver(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      });
      act(() => {
        fireEvent.pointerLeave(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  describe('onFocus() and onBlur()', () => {
    it('should trigger popover open or close', () => {
      const { getByTestId, queryByTestId } = render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="focus">
          Test message
        </Popover>
      );

      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      act(() => {
        fireEvent.focus(getByTestId('popover-element'));
        jest.runAllTimers();

        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.blur(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  it('should work with contentHoverable, keeping content open when hovered, and re-hovered within the delay hide time', () => {
    const { getByTestId, queryByTestId } = render(
      <div>
        <Popover
          contentHoverable
          delayHide={500}
          delayShow={100}
          className="test-class"
          popoverContent={<div data-testid="content"></div>}
          title="Some title"
          isOpen
        >
          <label className="message">Test message</label>
        </Popover>
      </div>
    );
    act(() => {
      expect(queryByTestId('popover-element')).toBeInTheDocument();
      fireEvent.pointerOver(getByTestId('popover-element'));
      jest.runAllTimers();
      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      fireEvent.pointerLeave(getByTestId('popover-element'));

      fireEvent.pointerEnter(getByTestId('popover-wrapper'));
      jest.runAllTimers();
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      fireEvent.pointerLeave(getByTestId('popover-wrapper'));
      jest.advanceTimersByTime(250);
      fireEvent.pointerEnter(getByTestId('popover-wrapper'));
      fireEvent.pointerLeave(getByTestId('popover-wrapper'));
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      jest.advanceTimersByTime(501);
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    act(() => {
      fireEvent.pointerOver(getByTestId('popover-element'));
      jest.runAllTimers();
      fireEvent.pointerOver(getByTestId('content'));

      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      fireEvent.pointerEnter(getByTestId('popover-wrapper'));
      jest.runAllTimers();
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
    });
  });
  describe('isMenu', () => {
    it('should be able to work as a menu', () => {
      const onClickOutside = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <div data-testid="outisde">
          <Popover
            isMenu
            triggers="click"
            className="test-class"
            popoverContent={<div data-testid="content"></div>}
            onClickOutside={onClickOutside}
            title="Some title"
          >
            <label className="message">Test message</label>
          </Popover>
        </div>
      );
      act(() => {
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        fireEvent.click(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
        fireEvent.mouseDown(queryByTestId('outisde'));
        jest.runAllTimers();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
        expect(onClickOutside).toBeCalledTimes(1);
      });
    });

    it('click outside should be preventable', () => {
      const onClickOutside = jest.fn();

      const { getByTestId } = render(
        <div data-testid="outisde">
          <Popover
            isMenu
            triggers="click"
            className="test-class"
            popoverContent={<div data-testid="content"></div>}
            onClickOutside={(e) => e.preventDefault()}
            title="Some title"
          >
            <label className="message">Test message</label>
          </Popover>
        </div>
      );
      act(() => {
        expect(getByTestId('popover-element')).toBeInTheDocument();
        fireEvent.click(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(getByTestId('popover-wrapper')).toBeInTheDocument();
        fireEvent.mouseDown(getByTestId('outisde'));
        jest.runAllTimers();
        expect(getByTestId('popover-wrapper')).toBeInTheDocument();
        expect(onClickOutside).toBeCalledTimes(0);
      });
    });

    it('should be able to work as a menu with render function content', () => {
      const { getByTestId, queryByTestId } = render(
        <div data-testid="outisde">
          <Popover
            isMenu
            triggers="click"
            className="test-class"
            popoverContent={() => <div data-testid="content"></div>}
            title="Some title"
          >
            <label className="message">Test message</label>
          </Popover>
        </div>
      );
      act(() => {
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        fireEvent.click(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
        fireEvent.keyDown(queryByTestId('focus-trap'), { key: 'Escape' });
        jest.runAllTimers();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  it('should call onOpenChange', () => {
    const onOpenChange = jest.fn();
    const { getByTestId, queryByTestId, rerender } = render(
      <div>
        <Popover
          onOpenChange={onOpenChange}
          className="test-class"
          popoverContent={<div data-testid="content"></div>}
          title="Some title"
        >
          <label className="message">Test message</label>
        </Popover>
      </div>
    );
    act(() => {
      expect(queryByTestId('popover-element')).toBeInTheDocument();
      fireEvent.pointerOver(getByTestId('popover-element'), {});
      jest.runAllTimers();
      const evt = createEvent.pointerOver(getByTestId('popover-element'));

      expect(onOpenChange).toBeCalledWith(true, evt, 'pointerover');
    });

    act(() => {
      rerender(
        <div>
          <Popover
            onOpenChange={onOpenChange}
            isOpen={false}
            className="test-class"
            popoverContent={<div data-testid="content"></div>}
            title="Some title"
          >
            <label className="message">Test message</label>
          </Popover>
        </div>
      );

      jest.runAllTimers();

      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    act(() => {
      rerender(
        <div>
          <Popover
            onOpenChange={onOpenChange}
            isOpen={true}
            className="test-class"
            popoverContent={<div data-testid="content"></div>}
            title="Some title"
          >
            <label className="message">Test message</label>
          </Popover>
        </div>
      );

      jest.runAllTimers();

      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
    });
  });

  it('should render without error', () => {
    console.error = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <div>
        <Popover className="test-class" popoverContent={<div />} title="Some title" isOpen>
          <label className="message">Test message</label>
        </Popover>
      </div>
    );
    act(() => {
      expect(queryByTestId('popover-element')).toBeInTheDocument(); //Manager
      expect(getByTestId('popover-element')).toHaveTextContent('Test message');
      expect(getByTestId('popover-wrapper')).toHaveTextContent('Some title'); //Popper

      expect(console.error).toHaveBeenCalledTimes(0);
    });
  });

  it('should be able to set theme', () => {
    const { getByTestId, rerender } = render(
      <div>
        <Popover popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-light');

    rerender(
      <div>
        <Popover id="popover-example" theme="dark" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-light');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-dark');

    rerender(
      <div>
        <Popover id="popover-example" theme="warn" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-dark');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-warn');

    rerender(
      <div>
        <Popover id="popover-example" theme="error" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-warn');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-error');

    rerender(
      <div>
        <Popover id="popover-example" theme="info" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-error');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-info');

    rerender(
      <div>
        <Popover id="popover-example" theme="success" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-info');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-success');
  });

  it('should default to light theme on invalid theme prop', () => {
    const { getByTestId } = render(
      <div>
        <Popover id="popover-example" theme="some-random-theme" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-some-random-theme');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-light');
  });

  it('should render popover when content is function', () => {
    const { getByTestId } = render(
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
    expect(getByTestId('popover-test-content')).toHaveTextContent('test');
  });

  it('should set up modifiers for a popover', () => {
    const { getByTestId } = render(
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
    expect(getByTestId('popover-test-content')).toHaveTextContent('test');
  });

  describe('triggers', () => {
    it('should register event handlers for multiple triggers', () => {
      const { getByTestId, queryByTestId } = render(
        <Popover
          id="popover-example"
          popoverContent={() => <div>test</div>}
          placement="bottom-end"
          triggers={['focus', 'hover']}
        >
          Test message
        </Popover>
      );

      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      act(() => {
        jest.runAllTimers();
        fireEvent.focus(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.pointerLeave(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
    });

    it('should not include any event handler if trigger is disabled', () => {
      const { getByTestId, queryByTestId } = render(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="disabled">
          Test message
        </Popover>
      );
      expect(queryByTestId('popover-element')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      act(() => {
        fireEvent.click(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

        fireEvent.blur(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

        fireEvent.focus(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

        fireEvent.pointerOver(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

        fireEvent.pointerLeave(getByTestId('popover-element'));
        jest.runAllTimers();
        expect(queryByTestId('popover-element')).toBeInTheDocument();
        expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  it('should work with an external trigger via triggerRef', () => {
    const TestRef = ({ children }) => {
      const ref = React.useRef();
      return children(ref);
    };

    const { getByTestId, queryByTestId } = render(
      <TestRef>
        {(ref) => (
          <>
            <button ref={ref} data-testid="trigger" />
            <Popover triggerRef={ref} popoverContent={<div />}>
              Test message
            </Popover>
          </>
        )}
      </TestRef>
    );

    act(() => {
      expect(queryByTestId('popover-element')).not.toBeInTheDocument();
      fireEvent.pointerOver(getByTestId('trigger'));
      jest.runAllTimers();
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
    });
  });

  it('should call getContainer to get boundary element if it is provided', () => {
    const getContainer = jest.fn(() => document.body);
    render(
      <Popover popoverContent={<div />} getContainer={getContainer} isOpen>
        Test message
      </Popover>
    );

    expect(getContainer).toHaveBeenCalled();
  });
});

describe('<Popover.WithRef />', () => {
  let virtualReferenceElement;

  beforeEach(() => {
    virtualReferenceElement = document.createElement('div');
    virtualReferenceElement.style.height = '100px';
    virtualReferenceElement.style.width = '100px';
    document.body.appendChild(virtualReferenceElement);
  });

  afterEach(() => {
    document.body.removeChild(virtualReferenceElement);
  });

  it('should render without error', () => {
    const { queryByTestId } = render(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />
    );
    expect(queryByTestId('popover-wrapper')).toBeInTheDocument();
  });

  it('should not render if isOpen is false', () => {
    const { queryByTestId } = render(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} />);
    expect(queryByTestId('popover-element')).not.toBeInTheDocument();
    expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
  });

  it('should render with default props', () => {
    const { getByTestId } = render(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />
    );
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-light');
    expect(getByTestId('popover-wrapper')).toHaveStyle('position: absolute; top: 0px; left: 0px;');
  });

  it('should render with given props', () => {
    const arrowStyles = {
      color: 'red',
    };
    const wrapperStyles = {
      color: 'red',
    };

    const { getByTestId } = render(
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

    expect(getByTestId('popover-wrapper')).toHaveClass('popover-dark');
    expect(getByTestId('popover-wrapper')).toHaveClass('extra-class');
    expect(getByTestId('popover-wrapper')).toHaveAttribute('data-test-selector', 'popover-example');
    expect(getByTestId('popover-title')).toHaveTextContent('Big Bang');
    expect(getByTestId('popover-arrow')).toHaveStyle('color: red;');
    expect(getByTestId('popover-wrapper')).toHaveStyle('position: absolute; top: 0px; left: 0px; color: red;');
  });

  it('should default to light theme on invalid theme prop', () => {
    const { getByTestId } = render(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} theme="some-theme" isOpen />
    );

    expect(getByTestId('popover-wrapper')).not.toHaveClass('popover-some-random-theme');
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-light');
  });

  it('should render popover when content is function', () => {
    const { getByTestId } = render(
      <Popover.WithRef popoverContent={() => <div>test</div>} refElement={virtualReferenceElement} isOpen />
    );
    expect(getByTestId('popover-content')).toHaveTextContent('test');
  });

  it('should call getContainer to get boundary element if it is provided', () => {
    const getContainer = jest.fn(() => document.body);
    render(
      <Popover.WithRef
        popoverContent={<div />}
        getContainer={getContainer}
        refElement={virtualReferenceElement}
        isOpen
      />
    );

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
