import React from 'react';
import SpinnerButton from 'components/adslotUi/SpinnerButtonComponent';
import { Spinner } from 'alexandria-adslot';
import { shallow } from 'enzyme';

describe('SpinnerButtonComponent', () => {
  it('should render with defaults', () => {
    const element = shallow(<SpinnerButton>Test</SpinnerButton>);
    expect(element.find(Spinner)).to.have.length(0);
    const buttonElement = element.find('Button');
    expect(buttonElement.prop('disabled')).to.equal(false);
    expect(buttonElement.prop('isLoading')).to.equal(undefined);
    expect(element.children().last().text()).to.equal('Test');
  });

  it('should pass props to button', () => {
    const element = shallow(
      <SpinnerButton dts="test" bsStyle="primary" bsSize="lg" isLoading>Test</SpinnerButton>
    );
    expect(element.find(Spinner)).to.have.length(1);

    const buttonElement = element.find('Button[data-test-selector="test"]');
    expect(buttonElement.prop('bsStyle')).to.equal('primary');
    expect(buttonElement.prop('bsSize')).to.equal('lg');
    expect(buttonElement.prop('isLoading')).to.equal(undefined);
  });

  it('should be disabled in loading mode', () => {
    const element = shallow(
      <SpinnerButton isLoading>Test</SpinnerButton>
    );
    const buttonElement = element.find('Button');
    expect(buttonElement.prop('disabled')).to.equal(true);
  });

  it('should preserve disabled state even when not loading', () => {
    const element = shallow(
      <SpinnerButton disabled>Test</SpinnerButton>
    );

    const buttonElement = element.find('Button');
    expect(buttonElement.prop('isLoading')).to.equal(undefined);
    expect(buttonElement.prop('disabled')).to.equal(true);
  });
});
