import { Avatar, ListPicker, UserListPicker } from 'adslot-ui';
import { shallow } from 'enzyme';
import React from 'react';
import ListPickerMocks from '../ListPicker/mocks';

describe('UserListPickerComponent', () => {
  const { getInitialSelection, userHeaders, users } = ListPickerMocks;

  it('should render with defaults', () => {
    const component = shallow(<UserListPicker />);
    expect(component.type()).to.equal(ListPicker);
    expect(component.prop('emptyMessage')).to.equal('No users.');
    expect(component.prop('initialSelection')).to.deep.equal([]);
    expect(component.prop('itemHeaders')).to.deep.equal(userHeaders);
    expect(component.prop('itemType')).to.equal('user');
    expect(component.prop('items')).to.deep.equal([]);
    expect(component.prop('modalClassName')).to.equal('userlistpicker-component');
    expect(component.prop('modalDescription')).to.equal('Select users.');
    expect(component.prop('modalTitle')).to.equal('Select Users');
    expect(component.prop('show')).to.equal(false);
    expect(component.prop('allowEmptySelection')).to.equal(false);
  });

  it('should render with props', () => {
    const svgSymbol = <div />;
    const props = {
      allowEmptySelection: true,
      emptySvgSymbol: svgSymbol,
      initialSelection: getInitialSelection(),
      userHeaders,
      users,
      modalDescription: 'Select team members that you want.',
      modalTitle: 'Select Team Members',
    };
    const component = shallow(<UserListPicker {...props} />);
    expect(component.type()).to.equal(ListPicker);

    expect(component.prop('emptySvgSymbol')).to.equal(svgSymbol);
    expect(component.prop('initialSelection')).to.deep.equal(getInitialSelection());
    expect(component.prop('itemHeaders')).to.deep.equal(userHeaders);
    expect(component.prop('itemType')).to.equal('user');
    expect(component.prop('items')).to.deep.equal(users);
    expect(component.prop('modalClassName')).to.equal('userlistpicker-component');
    expect(component.prop('modalDescription')).to.equal('Select team members that you want.');
    expect(component.prop('modalTitle')).to.equal('Select Team Members');
    expect(component.prop('show')).to.equal(false);
    expect(component.prop('allowEmptySelection')).to.equal(true);
  });

  it('should format user labels with avatar', () => {
    const component = shallow(<UserListPicker />);

    const userElement = shallow(component.prop('labelFormatter')(users[0]));
    expect(userElement.prop('className')).to.equal('userlistpicker-component-user-label');

    const avatarElement = userElement.find(Avatar);
    expect(avatarElement.prop('givenName')).to.equal('John');
    expect(avatarElement.prop('surname')).to.equal('Smith');

    const labelElement = userElement.find('span');
    expect(labelElement.prop('children')).to.equal('John Smith');
  });

  it('should throw when we do not supply apply handler', () => {
    const component = shallow(<UserListPicker />);
    expect(component.prop('modalApply')).to.throw('AdslotUi UserListPicker needs a modalApply handler');
  });

  it('should throw when we do not supply close handler', () => {
    const component = shallow(<UserListPicker />);
    expect(component.prop('modalClose')).to.throw('AdslotUi UserListPicker needs a modalClose handler');
  });
});
