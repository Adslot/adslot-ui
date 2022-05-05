"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idPropType = exports.TreePickerPropTypesRootType = exports.TreePickerPropTypesNode = exports.TreePickerPropTypesBreadCrumbNode = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var idPropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]);

exports.idPropType = idPropType;

var TreePickerPropTypesNode = _propTypes.default.shape({
  id: idPropType.isRequired,
  label: _propTypes.default.string.isRequired,
  isExpandable: _propTypes.default.bool,
  path: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: idPropType.isRequired,
    label: _propTypes.default.string.isRequired
  }).isRequired),
  ancestors: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: idPropType.isRequired,
    label: _propTypes.default.string.isRequired
  }).isRequired),
  type: _propTypes.default.string.isRequired,
  value: _propTypes.default.number,
  accent: _propTypes.default.oneOf(['warning', 'success', 'info', 'error'])
});

exports.TreePickerPropTypesNode = TreePickerPropTypesNode;

var TreePickerPropTypesBreadCrumbNode = _propTypes.default.shape({
  id: idPropType.isRequired,
  label: _propTypes.default.string.isRequired
});

exports.TreePickerPropTypesBreadCrumbNode = TreePickerPropTypesBreadCrumbNode;

var TreePickerPropTypesRootType = _propTypes.default.shape({
  id: idPropType.isRequired,
  label: _propTypes.default.string.isRequired,
  emptySvgSymbol: _propTypes.default.node,
  svgSymbol: _propTypes.default.node,
  hidden: _propTypes.default.bool,
  isRequired: _propTypes.default.bool.isRequired
});

exports.TreePickerPropTypesRootType = TreePickerPropTypesRootType;