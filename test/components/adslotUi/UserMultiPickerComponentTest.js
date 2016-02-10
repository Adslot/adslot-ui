/* eslint-env node, mocha */
/* global expect */

import createComponent from 'testHelpers/shallowRenderHelper';
import MultiPickerMocks from 'mocks/MultiPickerMocks';
import React from 'react';
import UserMultiPickerComponent from 'components/adslotUi/UserMultiPickerComponent';
import { Avatar } from 'alexandria-adslot';

describe('UserMultiPickerComponent', () => {
  const {
    getInitialSelection,
    userHeaders,
    users,
  } = MultiPickerMocks;

  it('should render with defaults', () => {
    const component = createComponent(UserMultiPickerComponent);
    expect(component.type.name).to.equal('MultiPickerComponent');
    expect(component.props.initialSelection).to.deep.equal([]);
    expect(component.props.itemHeaders).to.deep.equal(userHeaders);
    expect(component.props.items).to.deep.equal([]);
    expect(component.props.modalClassName).to.equal('usermultipicker-component');
    expect(component.props.modalDescription).to.equal('Select users.');
    expect(component.props.modalTitle).to.equal('Select Users');
    expect(component.props.show).to.equal(false);
    expect(component.props.allowEmptySelection).to.equal(false);
  });

  it('should render with props', () => {
    const component = createComponent(UserMultiPickerComponent, {
      allowEmptySelection: true,
      initialSelection: getInitialSelection(),
      userHeaders,
      users,
      modalDescription: 'Select team members that you want.',
      modalTitle: 'Select Team Members',
    });
    expect(component.type.name).to.equal('MultiPickerComponent');

    expect(component.props.initialSelection).to.deep.equal(getInitialSelection());
    expect(component.props.itemHeaders).to.deep.equal(userHeaders);
    expect(component.props.items).to.deep.equal(users);
    expect(component.props.modalClassName).to.equal('usermultipicker-component');
    expect(component.props.modalDescription).to.equal('Select team members that you want.');
    expect(component.props.modalTitle).to.equal('Select Team Members');
    expect(component.props.show).to.equal(false);
    expect(component.props.allowEmptySelection).to.equal(true);
  });

  it('should format user labels with avatar', () => {
    const component = createComponent(UserMultiPickerComponent, {});
    const userElement = component.props.labelFormatter(users[0]);
    expect(userElement.props.className).to.equal('usermultipicker-component-user-label');

    const avatarElement = userElement.props.children[0];
    expect(avatarElement.type).to.equal((<Avatar />).type);
    expect(avatarElement.props.givenName).to.equal('John');
    expect(avatarElement.props.surname).to.equal('Smith');

    const labelElement = userElement.props.children[1];
    expect(labelElement.props.children).to.equal('John Smith');
  });

  it('should throw when we do not supply apply handler', () => {
    const component = createComponent(UserMultiPickerComponent);
    expect(component.props.modalApply).to.throw('AdslotUi UserMultiPicker needs a modalApply handler');
  });

  it('should throw when we do not supply close handler', () => {
    const component = createComponent(UserMultiPickerComponent);
    expect(component.props.modalClose).to.throw('AdslotUi UserMultiPicker needs a modalClose handler');
  });
});
