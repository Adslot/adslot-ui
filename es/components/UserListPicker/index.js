import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ListPicker from '../ListPicker';
import Avatar from '../Avatar';
const UserListPicker = _ref => {
  let {
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
    users
  } = _ref;
  const labelFormatter = user => /*#__PURE__*/React.createElement("div", {
    className: "userlistpicker-component-user-label"
  }, /*#__PURE__*/React.createElement(Avatar, {
    image: user.avatar,
    color: avatarColor(user),
    givenName: user.givenName,
    surname: user.surname
  }), /*#__PURE__*/React.createElement("span", null, `${user.givenName} ${user.surname}`));
  return /*#__PURE__*/React.createElement(ListPicker, {
    allowEmptySelection: allowEmptySelection,
    emptyIcon: emptyIcon,
    emptyMessage: emptyMessage,
    emptySvgSymbol: emptySvgSymbol,
    initialSelection: initialSelection,
    itemHeaders: userHeaders,
    items: users,
    itemType: "user",
    labelFormatter: labelFormatter,
    modalApply: modalApply,
    modalClassName: "userlistpicker-component",
    modalClose: modalClose,
    modalDescription: modalDescription,
    modalTitle: modalTitle,
    show: show
  });
};
const userType = PropTypes.shape({
  avatar: PropTypes.string,
  givenName: PropTypes.string,
  id: PropTypes.number.isRequired,
  surname: PropTypes.string
});
UserListPicker.propTypes = {
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
    toggle: PropTypes.string
  }),
  /**
   * Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  users: PropTypes.arrayOf(userType)
};
UserListPicker.defaultProps = {
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
  userHeaders: {
    label: 'Team',
    toggle: 'Member'
  },
  users: []
};
export default UserListPicker;