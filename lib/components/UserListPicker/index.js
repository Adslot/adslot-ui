"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ListPicker = _interopRequireDefault(require("../ListPicker"));

var _Avatar = _interopRequireDefault(require("../Avatar"));

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

  const labelFormatter = user => /*#__PURE__*/_react.default.createElement("div", {
    className: "userlistpicker-component-user-label"
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    image: user.avatar,
    color: avatarColor(user),
    givenName: user.givenName,
    surname: user.surname
  }), /*#__PURE__*/_react.default.createElement("span", null, `${user.givenName} ${user.surname}`));

  return /*#__PURE__*/_react.default.createElement(_ListPicker.default, {
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

const userType = _propTypes.default.shape({
  avatar: _propTypes.default.string,
  givenName: _propTypes.default.string,
  id: _propTypes.default.number.isRequired,
  surname: _propTypes.default.string
});

UserListPicker.propTypes = {
  allowEmptySelection: _propTypes.default.bool,

  /**
   * avatarColor({ avatar, givenName, id, surname })
   */
  avatarColor: _propTypes.default.func,
  emptyIcon: _propTypes.default.string,
  emptyMessage: _propTypes.default.string,
  emptySvgSymbol: _propTypes.default.node,

  /**
   *  Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  initialSelection: _propTypes.default.arrayOf(userType),
  modalApply: _propTypes.default.func,
  modalDescription: _propTypes.default.string,
  modalClose: _propTypes.default.func,
  modalTitle: _propTypes.default.string,
  show: _propTypes.default.bool,

  /**
   *  Shape of { label: PropTypes.string, toggle: PropTypes.string }
   */
  userHeaders: _propTypes.default.shape({
    label: _propTypes.default.string,
    toggle: _propTypes.default.string
  }),

  /**
   * Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  users: _propTypes.default.arrayOf(userType)
};
UserListPicker.defaultProps = {
  allowEmptySelection: false,
  avatarColor: _lodash.default.noop,
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
var _default = UserListPicker;
exports.default = _default;