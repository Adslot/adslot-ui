"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _diffMatchPatch = _interopRequireDefault(require("diff-match-patch"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
const PrettyDiff = _ref => {
  let {
    newText,
    oldText
  } = _ref;
  const dmp = new _diffMatchPatch.default();
  const diffs = dmp.diff_main(oldText, newText);
  const getTextClass = diffType => {
    switch (diffType) {
      case _diffMatchPatch.default.DIFF_DELETE:
        return 'pretty-diff-component-delete';
      case _diffMatchPatch.default.DIFF_INSERT:
        return 'pretty-diff-component-insert';
      default:
        return 'pretty-diff-component-equal';
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "pretty-diff-component"
  }, _lodash.default.map(diffs, (diff, index) => /*#__PURE__*/_react.default.createElement("span", {
    key: index,
    className: getTextClass(diff[0])
  }, diff[1])));
};
PrettyDiff.propTypes = {
  newText: _propTypes.default.string,
  oldText: _propTypes.default.string
};
PrettyDiff.defaultProps = {
  newText: '',
  oldText: ''
};
var _default = PrettyDiff;
exports.default = _default;