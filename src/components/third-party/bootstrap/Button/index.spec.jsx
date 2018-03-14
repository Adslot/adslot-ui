import React from 'react';
import { shallow } from 'enzyme';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import BootstrapButton from 'react-bootstrap/lib/Button';
import { Button } from 'third-party';
import Spinner from 'alexandria/Spinner';

describe('ButtonComponent', () => {
  it('should render Bootstrap Button', () => {
    const element = shallow(<Button>Test</Button>);
    expect(element.type()).to.equal(BootstrapButton);
  });

  it('should pass through Bootstrap Button props', () => {
    const element = shallow(<Button bsStyle="link">Test</Button>);
    expect(element.prop('bsStyle')).to.equal('link');
  });

  it('should support legacy classname btn-inverse for non-breaking change', () => {
    const element = shallow(<Button className="btn-inverse">Test</Button>);
    expect(element.prop('className')).to.equal('button-component btn-inverse');
  });

  it('should support className prop', () => {
    const element = shallow(<Button className="all the-classes">Test</Button>);
    expect(element.prop('className')).to.equal('button-component all the-classes');
  });

  it('should support valid html attributes', () => {
    const element = shallow(
      <Button id="button-id" data-item-name="someDataValue">
        Test
      </Button>
    );
    expect(element.prop('id')).to.equal('button-id');
    expect(element.prop('data-item-name')).to.equal('someDataValue');
  });

  it('should not duplicate btn-inverse class if both legacy and new are used', () => {
    const element = shallow(
      <Button inverse className="btn-inverse">
        Test
      </Button>
    );
    expect(element.prop('className')).to.equal('button-component btn-inverse');
  });

  it('should render inverse button with btn-inverse class', () => {
    const element = shallow(<Button inverse>Test</Button>);
    expect(element.prop('className')).to.equal('button-component btn-inverse');
  });

  it('should support data-test-selectors', () => {
    const element = shallow(<Button dts="test-button">Test</Button>);
    expect(element.prop('data-test-selector')).to.equal('test-button');
  });

  it('should render disabled button without a reason popover if no reason given', () => {
    const element = shallow(<Button disabled>Test</Button>);
    expect(element.find(OverlayTrigger)).to.have.length(0);
  });

  it('should render disabled button with a reason popover', () => {
    const element = shallow(
      <Button disabled reason="Because">
        Test
      </Button>
    );
    const overlay = element.find(OverlayTrigger);
    expect(overlay).to.have.length(1);
    expect(shallow(overlay.prop('overlay')).text()).to.eql('Because');
  });

  it('should render Spinner if isLoading is true', () => {
    const element = shallow(<Button isLoading>Spinner</Button>);
    expect(element.find(Spinner)).to.have.length(1);
  });

  it('should only allow bsSize medium or small on Spinner', () => {
    const element = shallow(
      <Button isLoading bsSize="lg">
        Spinner
      </Button>
    );
    const spinnerEl = element.find(Spinner);
    expect(spinnerEl.prop('size')).to.equal('medium');
  });
});
