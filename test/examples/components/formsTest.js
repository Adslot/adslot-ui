import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { Button, PageTitle, Select, Checkbox } from 'components/distributionEntry';
import { ExampleFormPure, mapStateToProps } from 'examples/components/forms';
import { shallow } from 'enzyme';

describe('ExampleForm', () => {
  it('should render with defaults', () => {
    const component = shallow(<ExampleFormPure
      formValues={{}}
      isSubmitting={false}
      updateValues={_.noop}
      validateAndSave={_.noop}
    />);

    expect(component.find(PageTitle).first().prop('title')).to.equal('Form Example');
    expect(component.find(Button)).to.have.length(4);
    component.find(Button).forEach((node) => expect(node.prop('disabled')).to.equal(false));
    component.find('input').forEach((node) => expect(node.prop('disabled')).to.equal(false));
  });

  it('should trigger change event on text input change', () => {
    const mockUpdateValues = sinon.spy();
    const mockValidateAndSave = sinon.spy();
    const component = shallow(<ExampleFormPure
      formValues={{}}
      isSubmitting={false}
      updateValues={mockUpdateValues}
      validateAndSave={mockValidateAndSave}
    />);

    let expectedTextCallCount = 0;
    component.find('input[type="text"]').forEach((textNode) => {
      textNode.simulate('change', { target: textNode });

      expect(mockUpdateValues.callCount).to.equal(++expectedTextCallCount);
      expect(mockValidateAndSave.called).to.equal(false);
    });
    expect(expectedTextCallCount).to.equal(component.find('input[type="text"]').length);
  });

  it('should trigger change event on checkbox change', () => {
    const mockUpdateValues = sinon.spy();
    const mockValidateAndSave = sinon.spy();
    const component = shallow(<ExampleFormPure
      formValues={{}}
      isSubmitting={false}
      updateValues={mockUpdateValues}
      validateAndSave={mockValidateAndSave}
    />);

    let expectedCheckboxCallCount = 0;
    component.find(Checkbox).forEach((node) => {
      node.simulate('change', { target: node });

      expect(mockUpdateValues.callCount).to.equal(++expectedCheckboxCallCount);
      expect(mockValidateAndSave.called).to.equal(false);
    });
    expect(expectedCheckboxCallCount).to.equal(component.find(Checkbox).length);
  });

  it('should trigger change event on select change', () => {
    const mockUpdateValues = sinon.spy();
    const mockValidateAndSave = sinon.spy();
    const component = shallow(<ExampleFormPure
      formValues={{}}
      isSubmitting={false}
      updateValues={mockUpdateValues}
      validateAndSave={mockValidateAndSave}
    />);

    let expectedSelectCallCount = 0;
    component.find(Select).forEach((node) => {
      node.simulate('change', { value: 'some change' });

      expect(mockUpdateValues.callCount).to.equal(++expectedSelectCallCount);
      expect(mockValidateAndSave.called).to.equal(false);
    });
    expect(expectedSelectCallCount).to.equal(component.find(Select).length);
  });

  it('should validate and save form on submit', () => {
    const mockUpdateValues = sinon.spy();
    const mockValidateAndSave = sinon.spy();
    const component = shallow(<ExampleFormPure
      formValues={{}}
      isSubmitting={false}
      updateValues={mockUpdateValues}
      validateAndSave={mockValidateAndSave}
    />);

    component.findWhere((node) =>
      node.type() === Button && node.prop('bsStyle') === 'primary'
    ).first().simulate('click');

    expect(mockValidateAndSave.calledOnce).to.equal(true);
  });

  it('should map state to props', () => {
    const state = {
      form: { foo: 'bar' },
      visibility: { isSubmitting: true },
    };
    expect(mapStateToProps(state)).to.deep.equal({
      formValues: { foo: 'bar' },
      isSubmitting: true,
    });
  });
});
