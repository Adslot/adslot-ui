import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Popover from '.';
import { renderArrowStyles } from './Popper';

afterEach(cleanup);

describe('<Popover />', () => {
  describe('onClick()', () => {
    it('should trigger popover open', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['click']}>
          Test message
        </Popover>
      );
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.click(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);

      fireEvent.click(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
    });
  });

  describe('onMouseOver() and onMouseOut()', () => {
    it('should trigger popover open or close', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="hover">
          Test message
        </Popover>
      );

      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.mouseOver(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);

      fireEvent.mouseOut(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
    });
  });

  describe('onFocus() and onBlur()', () => {
    it('should trigger popover open or close', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="focus">
          Test message
        </Popover>
      );

      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.focus(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);

      fireEvent.blur(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
    });
  });

  it('should render without error', () => {
    const { getByTestId, queryAllByTestId } = render(
      <div>
        <Popover className="test-class" popoverContent={<div />} title="Some title" isOpen>
          <label className="message">Test message</label>
        </Popover>
      </div>
    );

    expect(queryAllByTestId('popover-element')).toHaveLength(1); //Manager
    expect(getByTestId('popover-element')).toHaveTextContent('Test message');
    expect(getByTestId('popover-wrapper')).toHaveTextContent('Some title'); //Popper

    console.error = jest.fn();
    expect(console.error).toHaveBeenCalledTimes(0);
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

  describe('triggers', () => {
    it('should register event handlers for multiple triggers', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Popover
          id="popover-example"
          popoverContent={() => <div>test</div>}
          placement="bottom-end"
          triggers={['focus', 'click']}
        >
          Test message
        </Popover>
      );
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.click(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);

      fireEvent.blur(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.focus(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
    });

    it('should not include any event handler if trigger is disabled', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="disabled">
          Test message
        </Popover>
      );
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.click(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.blur(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.focus(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.mouseOver(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);

      fireEvent.mouseOut(getByTestId('popover-element'));
      expect(queryAllByTestId('popover-element')).toHaveLength(1);
      expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
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
    const { queryAllByTestId } = render(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />
    );
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(1);
  });

  it('should not render if isOpen is false', () => {
    const { queryAllByTestId } = render(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} />
    );
    expect(queryAllByTestId('popover-element')).toHaveLength(0);
    expect(queryAllByTestId('popover-wrapper')).toHaveLength(0);
  });

  it('should render with default props', () => {
    const { getByTestId } = render(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />
    );
    expect(getByTestId('popover-wrapper')).toHaveClass('popover-light');
    expect(getByTestId('popover-wrapper')).toHaveStyle(
      'position: absolute; top: 0px; left: 0px; opacity: 0; pointer-events: none;'
    );
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
    expect(getByTestId('popover-wrapper')).toHaveStyle(
      'position: absolute; top: 0px; left: 0px; opacity: 0; pointer-events: none; color: red;'
    );
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
