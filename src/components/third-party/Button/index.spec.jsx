import React from 'react';
import { shallow } from 'enzyme';
import BootstrapButton from 'react-bootstrap/lib/Button';
import { Button, Popover } from 'third-party';
import Spinner from 'alexandria/Spinner';

describe('ButtonComponent', () => {
  it('should render Bootstrap Button', () => {
    const wrapper = shallow(<Button>Test</Button>);
    expect(wrapper.find(BootstrapButton)).to.have.length(1);
  });

  it('should pass through Bootstrap Button props', () => {
    const wrapper = shallow(<Button bsStyle="link">Test</Button>);
    expect(wrapper.prop('bsStyle')).to.equal('link');
  });

  it('should support legacy classname btn-inverse for non-breaking change', () => {
    const wrapper = shallow(<Button className="btn-inverse">Test</Button>);
    expect(wrapper.prop('className')).to.equal('button-component btn-inverse');
  });

  it('should support className prop', () => {
    const wrapper = shallow(<Button className="all the-classes">Test</Button>);
    expect(wrapper.prop('className')).to.equal('button-component all the-classes');
  });

  it('should support valid html attributes', () => {
    const wrapper = shallow(
      <Button id="button-id" data-item-name="someDataValue">
        Test
      </Button>
    );
    expect(wrapper.prop('id')).to.equal('button-id');
    expect(wrapper.prop('data-item-name')).to.equal('someDataValue');
  });

  it('should not duplicate btn-inverse class if both legacy and new are used', () => {
    const wrapper = shallow(
      <Button inverse className="btn-inverse">
        Test
      </Button>
    );
    expect(wrapper.prop('className')).to.equal('button-component btn-inverse');
  });

  it('should render inverse button with btn-inverse class', () => {
    const wrapper = shallow(<Button inverse>Test</Button>);
    expect(wrapper.prop('className')).to.equal('button-component btn-inverse');
  });

  it('should support data-test-selectors', () => {
    const wrapper = shallow(<Button dts="test-button">Test</Button>);
    expect(wrapper.prop('data-test-selector')).to.equal('test-button');
  });

  it('should render disabled button without a reason popover if no reason given', () => {
    const wrapper = shallow(<Button disabled>Test</Button>);
    const popoverWrapper = wrapper.find(Popover);
    expect(popoverWrapper).to.have.length(1);
    expect(popoverWrapper.prop('isOpen')).to.eql(false);
  });

  it('should render disabled button with a reason popover', () => {
    const wrapper = shallow(
      <Button disabled reason="Because">
        Test
      </Button>
    );
    wrapper.simulate('mouseOver');
    const popoverWrapper = wrapper.find(Popover);
    expect(popoverWrapper.prop('isOpen')).to.equal(true);
    wrapper.update();
    expect(wrapper.find(Popover).prop('popoverContent')).to.eql('Because');
    wrapper.simulate('mouseOut');
    expect(wrapper.find(Popover).prop('isOpen')).to.equal(false);
  });

  it('should render Spinner if isLoading is true', () => {
    const wrapper = shallow(<Button isLoading>Spinner</Button>);
    expect(wrapper.find(Spinner)).to.have.length(1);
  });

  it('should only allow bsSize medium or small on Spinner', () => {
    const wrapper = shallow(
      <Button isLoading bsSize="lg">
        Spinner
      </Button>
    );
    const spinnerEl = wrapper.find(Spinner);
    expect(spinnerEl.prop('size')).to.equal('medium');
  });
});
