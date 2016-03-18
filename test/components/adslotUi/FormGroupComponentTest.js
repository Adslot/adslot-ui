import FormGroupComponent from 'components/adslotUi/FormGroupComponent.js';
import React from 'react';
import { shallow } from 'enzyme';

describe('FormGroupComponent', () => {
  const helpText = "Help me if you can I'm feeling down.";
  const label = 'Sweet Caroline';
  it('should render with required props', () => {
    const component = shallow(<FormGroupComponent
      helpText={helpText}
      label={label}
      placeholder="baz"
    />);
    expect(component.prop('className')).to.equal('form-group');

    const labelElement = component.find('label');
    expect(labelElement).to.have.length(1);
    expect(labelElement.prop('htmlFor')).to.equal('sweet-caroline');
    expect(labelElement.prop('className')).to.equal('control-label col-xs-3');
    expect(labelElement.text()).to.equal('Sweet Caroline');

    const columnElement = component.find('.col-xs-9');
    expect(columnElement).to.have.length(1);

    const inputGroupElement = columnElement.find('.input-group');
    expect(inputGroupElement).to.have.length(1);
    expect(inputGroupElement.prop('className')).to.equal('input-group col-xs-6');

    const inputElement = inputGroupElement.find('input');
    expect(inputElement).to.have.length(1);
    expect(inputElement.prop('type')).to.equal('text');
    expect(inputElement.prop('className')).to.equal('form-control');
    expect(inputElement.prop('id')).to.equal('sweet-caroline');
    expect(inputElement.prop('placeholder')).to.equal('baz');
    expect(inputElement.prop('value')).to.equal('');

    const helpBlockElement = component.find('.help-block');
    expect(helpBlockElement.is('p')).to.equal(true);
    expect(helpBlockElement).to.have.length(1);
    expect(helpBlockElement.text()).to.equal(helpText);
  });

  it('should render with an addon and a value', () => {
    const component = shallow(<FormGroupComponent
      addon="$"
      helpText={helpText}
      label={label}
      placeholder="5.00"
      value="10.00"
    />);
    expect(component.prop('className')).to.equal('form-group');

    const inputGroupElement = component.find('.input-group');

    const inputElement = inputGroupElement.find('input');
    expect(inputElement).to.have.length(1);
    expect(inputElement.prop('type')).to.equal('text');
    expect(inputElement.prop('className')).to.equal('form-control');
    expect(inputElement.prop('id')).to.equal('sweet-caroline');
    expect(inputElement.prop('placeholder')).to.equal('5.00');
    expect(inputElement.prop('value')).to.equal('10.00');
  });
});
