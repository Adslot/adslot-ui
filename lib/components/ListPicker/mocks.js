"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var _react = _interopRequireDefault(require("react"));

const labelFormatter = item => `${item.givenName} ${item.surname}`;

const teamMember1 = {
  givenName: 'John',
  id: 1,
  surname: 'Smith'
};
const teamMember2 = {
  givenName: 'Jane',
  id: 2,
  surname: 'Doe'
};
const teamMember3 = {
  givenName: 'Jack',
  id: 3,
  surname: 'White'
};
const teamMember4 = {
  givenName: 'Jones',
  id: 'bdf9e9a6-22df-11e6-b67b-9e71128cae77',
  surname: 'Cheng'
};
const teamMember5 = {
  givenName: 'Joe',
  id: 'bdf9e9a6-22df-11e6-b67b-9e71128cae88',
  surname: 'Huang'
};
const userHeaders = {
  label: 'Team',
  toggle: 'Member'
};
const nodeUserHeaders = {
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "label-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "left-sub-label"
  }, "Group"), /*#__PURE__*/_react.default.createElement("div", {
    className: "right-sub-label"
  }, "Team")),
  toggle: 'Member'
};
const users = [teamMember1, teamMember2, teamMember3];
const usersWithUuid = [teamMember4, teamMember5];

const getInitialSelection = () => [teamMember2];

const ListPickerMocks = (0, _seamlessImmutable.default)({
  getInitialSelection,
  labelFormatter,
  teamMember1,
  teamMember2,
  teamMember4,
  userHeaders,
  nodeUserHeaders,
  users,
  usersWithUuid
});
var _default = ListPickerMocks;
exports.default = _default;