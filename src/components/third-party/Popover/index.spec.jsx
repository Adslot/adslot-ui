import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Manager, Popper } from 'react-popper';
import { Popover } from 'third-party';

describe('Popover Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['click']}>
        Test message
      </Popover>
    );
  });

  describe('getDerivedStateFromProps()', () => {
    it('should return the new state', () => {
      expect(
        Popover.getDerivedStateFromProps({ triggers: ['disabled'], isOpen: true }, { isPopoverOpen: false })
      ).to.eql({ isPopoverOpen: true });
    });
  });

  describe('onClick()', () => {
    it('should toggle `isPopoverOpen` state', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onClick();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });
  });

  describe('onMouseOver()', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="hover">
          Test message
        </Popover>
      );
    });

    it('should set `isPopoverOpen` state to true', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onMouseOver();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });
  });

  describe('onMouseOut()', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="hover">
          Test message
        </Popover>
      );

      wrapper.setState({ isPopoverOpen: true });
    });

    it('should set `isPopoverOpen` state to false', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().onMouseOut();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  describe('onFocus()', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="focus">
          Test message
        </Popover>
      );
    });

    it('should set `isPopoverOpen` state to true', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onFocus();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });
  });

  describe('onBlur()', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers="focus">
          Test message
        </Popover>
      );

      wrapper.setState({ isPopoverOpen: true });
    });

    it('should set `isPopoverOpen` state to false', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().onBlur();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  describe('closePopover()', () => {
    beforeEach(() => {
      wrapper.setState({ isPopoverOpen: true });
    });

    it('should set `isPopoverOpen` state to false', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().closePopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  describe('openPopover()', () => {
    it('should set `isPopoverOpen` state to true', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().openPopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });
  });

  describe('togglePopover()', () => {
    it('should toggle `isPopoverOpen` state', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().togglePopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().togglePopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  it('should render without error', () => {
    wrapper = mount(
      <div>
        <Popover className="test-class" popoverContent={<div />} title="Some title" isOpen>
          <label className="message">Test message</label>
        </Popover>
      </div>
    );

    expect(wrapper.find(Manager)).to.have.length(1);
    expect(wrapper.find('.popover-title').text()).to.equal('Some title');
    expect(wrapper.find(Popper)).to.have.length(1);
  });

  it('should be able to set theme', () => {
    wrapper = mount(
      <div>
        <Popover popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-light')).to.equal(true);

    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="dark" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-dark')).to.equal(true);

    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="warn" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-warn')).to.equal(true);

    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="error" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-error')).to.equal(true);
  });

  it('should default to light theme on invalid theme prop', () => {
    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="some-random-theme" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );

    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-light')).to.equal(true);
  });

  it('should render custom arrow styles if placement is `bottom-start` or `top-start`', () => {
    wrapper = mount(
      <div>
        <Popover
          id="popover-example"
          theme="some-random-theme"
          popoverContent={<div />}
          placement="bottom-start"
          isOpen
        >
          Test message
        </Popover>
      </div>
    );

    expect(wrapper.find('.aui--popover-arrow').prop('style')).to.eql({ left: 12 });
  });

  it('should render custom arrow styles if placement is `bottom-end` or `top-end`', () => {
    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="some-random-theme" popoverContent={<div />} placement="bottom-end" isOpen>
          Test message
        </Popover>
      </div>
    );

    expect(wrapper.find('.aui--popover-arrow').prop('style')).to.eql({ left: 'auto', right: 12 });
  });

  it('should render popover when content is function', () => {
    wrapper = mount(
      <div>
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.popover-content').text()).to.eql('test');
  });

  describe('triggers', () => {
    it('should register event handlers only for click trigger', () => {
      wrapper = mount(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="click">
          Test message
        </Popover>
      );
      expect(wrapper.find('.aui--popover-element').prop('onClick')).to.be.a('function');
    });

    it('should register event handlers only for hover trigger', () => {
      wrapper = mount(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="hover">
          Test message
        </Popover>
      );
      expect(wrapper.find('.aui--popover-element').prop('onMouseOver')).to.be.a('function');
      expect(wrapper.find('.aui--popover-element').prop('onMouseOut')).to.be.a('function');
    });

    it('should register event handlers only for focus trigger', () => {
      wrapper = mount(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="focus">
          Test message
        </Popover>
      );
      expect(wrapper.find('.aui--popover-element').prop('onFocus')).to.be.a('function');
      expect(wrapper.find('.aui--popover-element').prop('onBlur')).to.be.a('function');
    });

    it('should register event handlers for multiple triggers', () => {
      wrapper = mount(
        <Popover
          id="popover-example"
          popoverContent={() => <div>test</div>}
          placement="bottom-end"
          triggers={['focus', 'click']}
        >
          Test message
        </Popover>
      );
      expect(wrapper.find('.aui--popover-element').prop('onClick')).to.be.a('function');
      expect(wrapper.find('.aui--popover-element').prop('onFocus')).to.be.a('function');
      expect(wrapper.find('.aui--popover-element').prop('onBlur')).to.be.a('function');
    });

    it('should not include any event handler if trigger is disabled', () => {
      wrapper = mount(
        <Popover id="popover-example" popoverContent={() => <div>test</div>} placement="bottom-end" triggers="disabled">
          Test message
        </Popover>
      );
      expect(wrapper.find('.aui--popover-element').prop('onClick')).to.equal(undefined);
      expect(wrapper.find('.aui--popover-element').prop('onMouseOver')).to.equal(undefined);
      expect(wrapper.find('.aui--popover-element').prop('onFocus')).to.equal(undefined);
      expect(wrapper.find('.aui--popover-element').prop('onMouseOut')).to.equal(undefined);
      expect(wrapper.find('.aui--popover-element').prop('onBlur')).to.equal(undefined);
    });
  });

  it('should call getContainer to get boundary element if it is provided', () => {
    const getContainer = sinon.spy(() => document.body);
    mount(
      <Popover popoverContent={<div />} getContainer={getContainer} isOpen>
        Test message
      </Popover>
    );

    expect(getContainer.called).to.equal(true);
  });
});

describe('Popover.WithRef component', () => {
  const virtualReferenceElement = React.createElement('div');

  it('should render without error', () => {
    const wrapper = mount(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />);
    expect(wrapper.find(Popper)).to.have.length(1);
  });

  it('should not render if isOpen is false', () => {
    const wrapper = shallow(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} />);
    expect(wrapper.type()).to.equal(null);
  });

  it('should render with default props', () => {
    const wrapper = mount(<Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} isOpen />);
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-light')).to.equal(true);
    expect(wrapper.find(Popper).props().placement).to.equal('auto');
  });

  it('should render with given props', () => {
    const arrowStyles = {
      color: 'red',
    };
    const wrapperStyles = {
      color: 'red',
    };

    const wrapper = mount(
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

    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-dark')).to.equal(true);
    expect(wrapper.find('.aui--popover-wrapper').hasClass('extra-class')).to.equal(true);
    expect(wrapper.find('.aui--popover-wrapper').prop('data-test-selector')).to.equal('popover-example');
    expect(wrapper.find('.popover-title').text()).to.equal('Big Bang');
    expect(wrapper.find('.aui--popover-arrow').prop('style')).to.eql(arrowStyles);
    expect(wrapper.find(Popper).prop('placement')).to.eql('bottom-end');
    _.forOwn(wrapperStyles, (value, key) => {
      expect(wrapper.find('.aui--popover-wrapper').prop('style')).to.have.property(key, value);
    });
  });

  it('should default to light theme on invalid theme prop', () => {
    const wrapper = mount(
      <Popover.WithRef popoverContent={<div />} refElement={virtualReferenceElement} theme="some-theme" isOpen />
    );

    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-light')).to.equal(true);
  });

  it('should render popover when content is function', () => {
    const wrapper = mount(
      <Popover.WithRef popoverContent={() => <div>test</div>} refElement={virtualReferenceElement} isOpen />
    );
    expect(wrapper.find('.popover-content').text()).to.eql('test');
  });

  it('should call getContainer to get boundary element if it is provided', () => {
    const getContainer = sinon.spy(() => document.body);
    mount(
      <Popover.WithRef
        popoverContent={<div />}
        getContainer={getContainer}
        refElement={virtualReferenceElement}
        isOpen
      />
    );

    expect(getContainer.calledOnce).to.equal(true);
  });
});
