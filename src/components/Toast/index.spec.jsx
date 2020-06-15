import React from 'react';
import { shallow, mount } from 'enzyme';
import Toast from '.';

describe('Toast', () => {
  it('should render default info type', () => {
    const component = mount(
      <div>
        <Toast.Container />
        <Toast.Notification message="<span>Default toast</span>" />
      </div>
    );
    expect(
      component
        .children()
        .last()
        .prop('theme')
    ).to.equal('info');
    expect(
      component
        .children()
        .last()
        .prop('title')
    ).to.equal('');
    expect(
      component
        .children()
        .last()
        .prop('message')
    ).to.equal('<span>Default toast</span>');
  });

  it('should render success type', () => {
    const component = shallow(
      <div>
        <Toast.Container />
        <Toast.Notification theme="success" message="<span>Success toast</span>" title="SUCCESS" />
      </div>
    );
    expect(
      component
        .children()
        .last()
        .prop('theme')
    ).to.equal('success');
    expect(
      component
        .children()
        .last()
        .prop('title')
    ).to.equal('SUCCESS');
    expect(
      component
        .children()
        .last()
        .prop('message')
    ).to.equal('<span>Success toast</span>');
  });

  it('should render alert type', () => {
    const component = shallow(
      <div>
        <Toast.Container />
        <Toast.Notification theme="alert" message="<span>Alert toast</span>" title="ALERT" />
      </div>
    );
    expect(
      component
        .children()
        .last()
        .prop('theme')
    ).to.equal('alert');
    expect(
      component
        .children()
        .last()
        .prop('title')
    ).to.equal('ALERT');
    expect(
      component
        .children()
        .last()
        .prop('message')
    ).to.equal('<span>Alert toast</span>');
  });

  it('should render attention type', () => {
    const component = shallow(
      <div>
        <Toast.Container />
        <Toast.Notification theme="attention" message="<span>Attention toast</span>" title="ATTENTION" />
      </div>
    );
    expect(
      component
        .children()
        .last()
        .prop('theme')
    ).to.equal('attention');
    expect(
      component
        .children()
        .last()
        .prop('title')
    ).to.equal('ATTENTION');
    expect(
      component
        .children()
        .last()
        .prop('message')
    ).to.equal('<span>Attention toast</span>');
  });

  it('should render info type', () => {
    const component = shallow(
      <div>
        <Toast.Container />
        <Toast.Notification theme="info" message="<span>Info toast</span>" title="INFO" />
      </div>
    );
    expect(
      component
        .children()
        .last()
        .prop('theme')
    ).to.equal('info');
    expect(
      component
        .children()
        .last()
        .prop('title')
    ).to.equal('INFO');
    expect(
      component
        .children()
        .last()
        .prop('message')
    ).to.equal('<span>Info toast</span>');
  });
});
