import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ListPicker from '../ListPicker';
import Avatar from '../Avatar';

var UserListPicker = function UserListPicker(_ref) {
  var allowEmptySelection = _ref.allowEmptySelection,
      avatarColor = _ref.avatarColor,
      emptyIcon = _ref.emptyIcon,
      emptyMessage = _ref.emptyMessage,
      emptySvgSymbol = _ref.emptySvgSymbol,
      initialSelection = _ref.initialSelection,
      modalApply = _ref.modalApply,
      modalClose = _ref.modalClose,
      modalDescription = _ref.modalDescription,
      modalTitle = _ref.modalTitle,
      show = _ref.show,
      userHeaders = _ref.userHeaders,
      users = _ref.users;

  var labelFormatter = function labelFormatter(user) {
    return /*#__PURE__*/React.createElement("div", {
      className: "userlistpicker-component-user-label"
    }, /*#__PURE__*/React.createElement(Avatar, {
      image: user.avatar,
      color: avatarColor(user),
      givenName: user.givenName,
      surname: user.surname
    }), /*#__PURE__*/React.createElement("span", null, "".concat(user.givenName, " ").concat(user.surname)));
  };

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

var userType = PropTypes.shape({
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
  modalApply: function modalApply() {
    throw new Error('AdslotUi UserListPicker needs a modalApply handler');
  },
  modalClose: function modalClose() {
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