import _ from 'lodash';
import ListPicker from 'components/adslotUi/ListPickerComponent';
import React, { PropTypes } from 'react';
import { Avatar, SvgSymbol } from 'alexandria-adslot';

require('styles/adslotUi/UserListPicker.scss');

const UserListPickerComponent = ({
  allowEmptySelection,
  avatarColor,
  emptyIcon,
  emptyMessage,
  emptySvgSymbol,
  initialSelection,
  modalApply,
  modalClose,
  modalDescription,
  modalTitle,
  show,
  userHeaders,
  users,
}) => {
  const labelFormatter = (user) => (
    <div className="userlistpicker-component-user-label">
      <Avatar
        image={user.avatar}
        color={avatarColor(user)}
        givenName={user.givenName}
        surname={user.surname}
      />
      <span>{`${user.givenName} ${user.surname}`}</span>
    </div>
  );

  return (
    <ListPicker
      allowEmptySelection={allowEmptySelection}
      emptyIcon={emptyIcon}
      emptyMessage={emptyMessage}
      emptySvgSymbol={emptySvgSymbol}
      initialSelection={initialSelection}
      itemHeaders={userHeaders}
      items={users}
      labelFormatter={labelFormatter}
      modalApply={modalApply}
      modalClassName="userlistpicker-component"
      modalClose={modalClose}
      modalDescription={modalDescription}
      modalTitle={modalTitle}
      show={show}
    />
  );
};

UserListPickerComponent.displayName = 'AdslotUiListPickerComponent';

const userType = PropTypes.shape({
  avatar: PropTypes.string,
  givenName: PropTypes.string,
  id: PropTypes.number.isRequired,
  surname: PropTypes.string,
});

UserListPickerComponent.propTypes = {
  allowEmptySelection: PropTypes.bool.isRequired,
  avatarColor: PropTypes.func.isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string.isRequired,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  initialSelection: PropTypes.arrayOf(userType).isRequired,
  modalApply: PropTypes.func.isRequired,
  modalDescription: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  userHeaders: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }).isRequired,
  users: PropTypes.arrayOf(userType).isRequired,
};

UserListPickerComponent.defaultProps = {
  allowEmptySelection: false,
  avatarColor: _.noop,
  emptyMessage: 'No users.',
  initialSelection: [],
  modalApply: () => { throw new Error('AdslotUi UserListPicker needs a modalApply handler'); },

  modalClose: () => { throw new Error('AdslotUi UserListPicker needs a modalClose handler'); },

  modalDescription: 'Select users.',
  modalTitle: 'Select Users',
  show: false,
  userHeaders: { left: 'Team', right: 'Member' },
  users: [],
};

export default UserListPickerComponent;
