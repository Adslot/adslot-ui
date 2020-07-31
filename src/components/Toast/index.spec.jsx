import React from 'react';
import sinon from 'sinon';
import { toast } from 'react-toastify';
import { shallow, mount } from 'enzyme';
import Toast from '.';
import { ToastMessage } from './ToastNotification';

describe('Toast.notify', () => {
  it('should render notification as expected', () => {
    const toastSpy = sinon.spy(toast, 'info');

    mount(<Toast.Container />);
    Toast.notify({
      title: 'test',
      theme: 'test',
      message: 'Tested Toast',
    });

    expect(toastSpy.callCount).to.equal(1);
    toastSpy.restore();
  });
});

describe('<ToastMessage />', () => {
  it('should render toast message as expected', () => {
    const component = mount(
      <ToastMessage toastClass="aui--toast-title aui--toast-title-info" title="Test" message="Test Message" />
    );

    expect(component.find('.aui--toast-title.aui--toast-title-info')).to.have.length(1);
    expect(component.find('.aui--toast-body-message')).to.have.length(1);
    expect(component.prop('title')).to.equal('Test');
    expect(component.prop('message')).to.equal('Test Message');
  });
});

describe('<Toast.Container />', () => {
  it('should render Toast.Container without error', () => {
    const component = mount(<Toast.Container />);

    expect(component.find('.aui--toast-container')).to.have.length(1);
    expect(component.find('.aui--toast-container').prop('position')).to.equal('bottom-left');
  });
});

describe('<Toast.Notification />', () => {
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
