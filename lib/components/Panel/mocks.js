"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var panel1 = {
  id: '1',
  title: 'Panel 1',
  dts: 'panel-1',
  onClick: _lodash.default.noop
};
var panel2 = {
  id: '2',
  title: 'Panel 2',
  isCollapsed: true,
  onClick: _lodash.default.noop,
  content: 'Panel 2 content',
  dts: 'panel-2'
};
var panel3 = {
  id: '3',
  title: 'Panel 3',
  isCollapsed: true,
  className: 'test-class-1 test-class-2',
  onClick: _lodash.default.noop,
  content: 'Panel 3 content',
  dts: 'panel-3'
};
var PanelMocks = (0, _seamlessImmutable.default)({
  panel1: panel1,
  panel2: panel2,
  panel3: panel3
});
var _default = PanelMocks;
exports.default = _default;