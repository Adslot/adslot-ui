import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ListPicker from '../ListPicker';
import Avatar from '../Avatar';
import './styles.scss';

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
  const labelFormatter = user => (
    <div className="userlistpicker-component-user-label">
      <Avatar image={user.avatar} color={avatarColor(user)} givenName={user.givenName} surname={user.surname} />
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
      itemType="user"
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

UserListPickerComponent.displayName = 'ListPickerComponent';

const userType = PropTypes.shape({
  avatar: PropTypes.string,
  givenName: PropTypes.string,
  id: PropTypes.number.isRequired,
  surname: PropTypes.string,
});

UserListPickerComponent.propTypes = {
  allowEmptySelection: PropTypes.bool,
  /**
   * avatarColor({ avatar, givenName, id, surname })
   */
  avatarColor: PropTypes.func,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  /**
   *  Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  initialSelection: PropTypes.arrayOf(userType),
  modalApply: PropTypes.func,
  modalDescription: PropTypes.string,
  modalClose: PropTypes.func,
  modalTitle: PropTypes.string,
  show: PropTypes.bool,
  /**
   *  Shape of { label: PropTypes.string, toggle: PropTypes.string }
   */
  userHeaders: PropTypes.shape({
    label: PropTypes.string,
    toggle: PropTypes.string,
  }),
  /**
   * Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  users: PropTypes.arrayOf(userType),
};

UserListPickerComponent.defaultProps = {
  allowEmptySelection: false,
  avatarColor: _.noop,
  emptyMessage: 'No users.',
  initialSelection: [],
  modalApply: () => {
    throw new Error('AdslotUi UserListPicker needs a modalApply handler');
  },

  modalClose: () => {
    throw new Error('AdslotUi UserListPicker needs a modalClose handler');
  },

  modalDescription: 'Select users.',
  modalTitle: 'Select Users',
  show: false,
  userHeaders: { label: 'Team', toggle: 'Member' },
  users: [],
};

export default UserListPickerComponent;
