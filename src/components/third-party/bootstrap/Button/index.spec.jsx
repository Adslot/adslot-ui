import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'third-party';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import BootstrapButton from 'react-bootstrap/lib/Button';

describe('ButtonComponent', () => {
  it('should render Bootstrap Button', () => {
    const element = shallow(<Button>Test</Button>);
    expect(element.type()).to.equal(BootstrapButton);
  });

  it('should support legacy classname btn-inverse for non-breaking change', () => {
    const element = shallow(<Button className="btn-inverse">Test</Button>);
    expect(element.prop('className')).to.equal('btn-inverse');
  });

  it('should support className prop', () => {
    const element = shallow(<Button className="all the-classes">Test</Button>);
    expect(element.prop('className')).to.equal('all the-classes');
  });

  it('should not duplicate btn-inverse class if both legacy and new are used', () => {
    const element = shallow(<Button inverse className="btn-inverse">Test</Button>);
    expect(element.prop('className')).to.equal('btn-inverse');
  });

  it('should render inverse button with btn-inverse class', () => {
    const element = shallow(<Button inverse>Test</Button>);
    expect(element.prop('className')).to.equal('btn-inverse');
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
    const element = shallow(<Button disabled reason="Because">Test</Button>);
    const overlay = element.find(OverlayTrigger);
    expect(overlay).to.have.length(1);
    expect(shallow(overlay.prop('overlay')).text()).to.eql('Because');
  });
});
