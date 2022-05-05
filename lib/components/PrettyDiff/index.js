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

var PrettyDiff = function PrettyDiff(_ref) {
  var newText = _ref.newText,
      oldText = _ref.oldText;
  var dmp = new _diffMatchPatch.default();
  var diffs = dmp.diff_main(oldText, newText);

  var getTextClass = function getTextClass(diffType) {
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
  }, _lodash.default.map(diffs, function (diff, index) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index,
      className: getTextClass(diff[0])
    }, diff[1]);
  }));
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