import React from 'react';
import { shallow } from 'enzyme';
import SpinnerButton from '../../adslot-ui/SpinnerButton';
import { Button } from '../../third-party';
import Spinner from '../../alexandria/Spinner';

describe('SpinnerButtonComponent', () => {
  it('should render with defaults', () => {
    const element = shallow(
      <SpinnerButton disabled reason="Reason 1">
        Test
      </SpinnerButton>
    );
    expect(element.find(Spinner)).to.have.length(0);

    const buttonElement = element.find(Button);
    expect(buttonElement.prop('disabled')).to.equal(true);
    expect(buttonElement.prop('reason')).to.equal('Reason 1');
    expect(buttonElement.prop('isLoading')).to.equal(undefined);
    expect(
      element
        .children()
        .last()
        .text()
    ).to.equal('Test');
  });

  it('should pass props to button', () => {
    const element = shallow(
      <SpinnerButton dts="test" bsStyle="primary" bsSize="lg" className="my-class" isLoading>
        Test
      </SpinnerButton>
    );
    expect(element.find(Spinner)).to.have.length(1);

    const buttonElement = element.find('Button[data-test-selector="test"]');
    expect(buttonElement.prop('bsStyle')).to.equal('primary');
    expect(buttonElement.prop('bsSize')).to.equal('lg');
    expect(buttonElement.prop('className')).to.equal('spinner-button-component my-class');
    expect(buttonElement.prop('isLoading')).to.equal(undefined);
  });

  it('should be disabled in loading mode', () => {
    const buttonElement = shallow(<SpinnerButton isLoading>Test</SpinnerButton>).find('Button');

    expect(buttonElement.prop('disabled')).to.equal(true);
  });

  it('should honour disabled when not loading', () => {
    const buttonElement = shallow(<SpinnerButton disabled>Test</SpinnerButton>).find('Button');

    expect(buttonElement.prop('isLoading')).to.equal(undefined);
    expect(buttonElement.prop('disabled')).to.equal(true);
  });

  it('should ignore disabled when loading', () => {
    const buttonElement = shallow(
      <SpinnerButton isLoading disabled={false}>
        Test
      </SpinnerButton>
    ).find('Button');
    expect(buttonElement.prop('disabled')).to.equal(true);
  });
});
