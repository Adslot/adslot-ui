"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var _react = _interopRequireDefault(require("react"));

var labelFormatter = function labelFormatter(item) {
  return "".concat(item.givenName, " ").concat(item.surname);
};

var teamMember1 = {
  givenName: 'John',
  id: 1,
  surname: 'Smith'
};
var teamMember2 = {
  givenName: 'Jane',
  id: 2,
  surname: 'Doe'
};
var teamMember3 = {
  givenName: 'Jack',
  id: 3,
  surname: 'White'
};
var teamMember4 = {
  givenName: 'Jones',
  id: 'bdf9e9a6-22df-11e6-b67b-9e71128cae77',
  surname: 'Cheng'
};
var teamMember5 = {
  givenName: 'Joe',
  id: 'bdf9e9a6-22df-11e6-b67b-9e71128cae88',
  surname: 'Huang'
};
var userHeaders = {
  label: 'Team',
  toggle: 'Member'
};
var nodeUserHeaders = {
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "label-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "left-sub-label"
  }, "Group"), /*#__PURE__*/_react.default.createElement("div", {
    className: "right-sub-label"
  }, "Team")),
  toggle: 'Member'
};
var users = [teamMember1, teamMember2, teamMember3];
var usersWithUuid = [teamMember4, teamMember5];

var getInitialSelection = function getInitialSelection() {
  return [teamMember2];
};

var ListPickerMocks = (0, _seamlessImmutable.default)({
  getInitialSelection: getInitialSelection,
  labelFormatter: labelFormatter,
  teamMember1: teamMember1,
  teamMember2: teamMember2,
  teamMember4: teamMember4,
  userHeaders: userHeaders,
  nodeUserHeaders: nodeUserHeaders,
  users: users,
  usersWithUuid: usersWithUuid
});
var _default = ListPickerMocks;
exports.default = _default;